# Najot Ta'lim — Marketing Analitika Dashboardi

Najot Ta'lim Marketing bo'limi uchun ichki, rolga asoslangan analitik dashboard. Har bir xodim (Marketing bo'lim boshlig'i, SMM, Copywriter, Mobilograf, IT, Admin) tizimga kirgach faqat o'ziga tegishli sahifaga yo'naltiriladi va faqat o'ziga ruxsat etilgan ma'lumotni ko'radi — bu Supabase Auth + Row Level Security (RLS) orqali ta'minlangan.

To'liq loyihalashtirish hujjatlari `docs/` papkasida:
- `docs/01-TADQIQOT.md` — fon tadqiqoti
- `docs/02-SAVOLLAR.md` — dastlabki savollar
- `docs/03-TZ-QORALAMA.md` — texnik topshiriq
- `docs/04-SUPABASE-OCHISH.md` — Supabase loyihasini ochish qadamlari
- `docs/05-QARORLAR.md` — qabul qilingan yakuniy qarorlar

## Texnologiyalar

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres + Auth + RLS) · Recharts

## Ishga tushirish

1. Bog'liqliklarni o'rnating (agar hali qilinmagan bo'lsa):
   ```bash
   npm install
   ```
2. `.env.local.example` faylidan nusxa olib `.env.local` yarating va Supabase loyihangizning qiymatlarini kiriting (`docs/04-SUPABASE-OCHISH.md` ga qarang):
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
3. `supabase/migrations/0001_init.sql` faylini Supabase loyihangizning SQL Editor'ida ishga tushiring (jadvallar + RLS qoidalarini yaratadi).
4. Demo xodimlar va namunaviy ma'lumotlarni yuklang:
   ```bash
   npm run seed
   ```
   Bu quyidagi demo hisoblarni yaratadi (parol: `NajotTalim2026!`):
   - `admin@najottalim.uz` — Super-admin
   - `marketing.boshligi@najottalim.uz` — Marketing bo'lim boshlig'i
   - `smm@najottalim.uz` — SMM mutaxassisi
   - `copywriter@najottalim.uz` — Copywriter
   - `mobilograf@najottalim.uz` — Mobilograf
   - `it@najottalim.uz` — IT bo'lim xodimi
5. Dasturni ishga tushiring:
   ```bash
   npm run dev
   ```
   `http://localhost:3000` manzilida oching.

## Loyiha tuzilmasi

- `src/app/(dashboard)/*` — har bir rol uchun sahifalar (marketing-boshligi, smm, copywriter, mobilograf, it, admin)
- `src/lib/supabase/` — brauzer/server/admin Supabase klientlari
- `src/middleware.ts` — sessiya va rolga asoslangan yo'naltirish
- `supabase/migrations/0001_init.sql` — baza sxemasi va RLS siyosatlari
- `scripts/seed.mjs` — demo xodimlar va ma'lumotlarni yaratuvchi skript
