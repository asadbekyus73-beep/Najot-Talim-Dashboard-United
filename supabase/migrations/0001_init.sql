-- Najot Ta'lim Marketing Dashboard — boshlang'ich sxema
-- Rollar, profillar, KPI ma'lumotlari, kontent-reja, kampaniyalar, integratsiyalar
-- va har biri uchun Row Level Security (RLS) siyosatlari.

-- 1. Rollar enum turi
create type public.app_role as enum (
  'admin',
  'marketing_head',
  'smm',
  'copywriter',
  'videographer',
  'it'
);

-- 2. Xodim profillari (auth.users bilan 1:1)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Joriy foydalanuvchi rolini xavfsiz aniqlash uchun yordamchi funksiya.
-- SECURITY DEFINER — profiles jadvalidagi RLS bilan rekursiyaga tushmaslik uchun.
create function public.current_role()
returns public.app_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "profil: o'zini yoki admin/boshliq hammasini ko'radi"
  on public.profiles for select
  using (id = auth.uid() or public.current_role() in ('admin', 'marketing_head'));

create policy "profil: faqat admin qo'sha oladi"
  on public.profiles for insert
  with check (public.current_role() = 'admin');

create policy "profil: o'zini yoki admin tahrirlaydi"
  on public.profiles for update
  using (id = auth.uid() or public.current_role() = 'admin');

create policy "profil: faqat admin o'chira oladi"
  on public.profiles for delete
  using (public.current_role() = 'admin');

-- Yangi auth.users yozuvi yaratilganda avtomatik profil qo'shish
-- (email/full_name/role auth metadata orqali admin panel/seed skript tomonidan beriladi).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'smm')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Kunlik KPI ko'rsatkichlari (marketing_head umumiy ko'radi, har bir rol faqat o'zinikini)
create table public.kpi_daily (
  id bigint generated always as identity primary key,
  date date not null,
  role_scope public.app_role not null,
  metric_key text not null,
  metric_value numeric not null,
  unit text,
  created_at timestamptz not null default now(),
  unique (date, role_scope, metric_key)
);

alter table public.kpi_daily enable row level security;

create policy "kpi: o'z sohasi yoki admin/boshliq hammasini ko'radi"
  on public.kpi_daily for select
  using (role_scope = public.current_role() or public.current_role() in ('admin', 'marketing_head'));

create policy "kpi: faqat admin/boshliq kiritadi"
  on public.kpi_daily for insert
  with check (public.current_role() in ('admin', 'marketing_head'));

create policy "kpi: faqat admin/boshliq tahrirlaydi"
  on public.kpi_daily for update
  using (public.current_role() in ('admin', 'marketing_head'));

create policy "kpi: faqat admin/boshliq o'chiradi"
  on public.kpi_daily for delete
  using (public.current_role() in ('admin', 'marketing_head'));

-- 4. Kontent-reja (SMM post, Copywriter matn, Mobilograf video)
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  role_scope public.app_role not null,
  item_type text not null,
  title text not null,
  description text,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'published')),
  author_id uuid references public.profiles (id) on delete set null,
  due_date date,
  published_at timestamptz,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.content_items enable row level security;

create policy "kontent: o'z sohasi yoki admin/boshliq hammasini ko'radi"
  on public.content_items for select
  using (role_scope = public.current_role() or public.current_role() in ('admin', 'marketing_head'));

create policy "kontent: o'z sohasidagi xodim yoki admin/boshliq qo'sha oladi"
  on public.content_items for insert
  with check (
    (role_scope = public.current_role() and author_id = auth.uid())
    or public.current_role() in ('admin', 'marketing_head')
  );

create policy "kontent: muallif yoki admin/boshliq tahrirlaydi"
  on public.content_items for update
  using (author_id = auth.uid() or public.current_role() in ('admin', 'marketing_head'));

create policy "kontent: muallif yoki admin o'chiradi"
  on public.content_items for delete
  using (author_id = auth.uid() or public.current_role() = 'admin');

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger content_items_set_updated_at
  before update on public.content_items
  for each row execute function public.set_updated_at();

-- 5. Reklama kampaniyalari (faqat marketing boshlig'i / admin)
create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  channel text not null,
  budget numeric not null default 0,
  spent numeric not null default 0,
  leads integer not null default 0,
  enrollments integer not null default 0,
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

alter table public.campaigns enable row level security;

create policy "kampaniya: faqat admin/boshliq ko'radi"
  on public.campaigns for select
  using (public.current_role() in ('admin', 'marketing_head'));

create policy "kampaniya: faqat admin/boshliq yoza oladi"
  on public.campaigns for insert
  with check (public.current_role() in ('admin', 'marketing_head'));

create policy "kampaniya: faqat admin/boshliq tahrirlaydi"
  on public.campaigns for update
  using (public.current_role() in ('admin', 'marketing_head'));

create policy "kampaniya: faqat admin/boshliq o'chiradi"
  on public.campaigns for delete
  using (public.current_role() in ('admin', 'marketing_head'));

-- 6. Texnik integratsiyalar holati (IT bo'limi uchun)
create table public.integrations (
  id bigint generated always as identity primary key,
  name text not null,
  status text not null default 'disconnected' check (status in ('connected', 'disconnected', 'error')),
  last_synced_at timestamptz,
  notes text
);

alter table public.integrations enable row level security;

create policy "integratsiya: it/admin/boshliq ko'radi"
  on public.integrations for select
  using (public.current_role() in ('it', 'admin', 'marketing_head'));

create policy "integratsiya: it/admin tahrirlaydi"
  on public.integrations for update
  using (public.current_role() in ('it', 'admin'));

create policy "integratsiya: it/admin qo'shadi"
  on public.integrations for insert
  with check (public.current_role() in ('it', 'admin'));

create policy "integratsiya: faqat admin o'chiradi"
  on public.integrations for delete
  using (public.current_role() = 'admin');
