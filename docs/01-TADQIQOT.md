# Tadqiqot va fon ma'lumotlari — Najot Ta'lim Marketing Analitika Dashboardi

> Ushbu fayl loyihani boshlashdan oldin to'plangan ma'lumotlarni o'z ichiga oladi: Najot Ta'lim haqida ochiq manbalardan topilgan ma'lumotlar, marketing dashboard bo'yicha 2026-yildagi eng yaxshi amaliyotlar va Supabase orqali rol-asosidagi kirish nazoratini (RBAC) qurish bo'yicha tavsiyalar. Bu — qarorlar emas, keyingi hujjatlardagi (`02-SAVOLLAR.md`, `03-TZ-QORALAMA.md`) takliflar uchun asos.

## 1. Najot Ta'lim haqida (ochiq manbalardan)

- Rasmiy sayt: [najottalim.uz](https://najottalim.uz/)
- Toshkentda joylashgan, dasturlash, dizayn va marketing (jumladan SMM) yo'nalishlarida kurslar beruvchi nodavlat o'quv markazi. Bir nechta filiallari bor (masalan, Chilonzor tumani).
- SMM yo'nalishi bo'yicha alohida kurslar mavjud: **SMM Pro** ([kurslar.najottalim.uz/smm](https://kurslar.najottalim.uz/smm)), bu ularning o'zida ham SMM/marketing bo'yicha ichki ekspertiza borligini ko'rsatadi.
- Bolalar uchun IT/robototexnika yo'nalishi ("Robbit") ham mavjud.
- Telegram kanali orqali faol kontent yuritiladi ([t.me/najottalim](https://t.me/s/najottalim)), shuningdek Facebook va YouTube’da ham faoliyat yuritiladi.
- **Muhim eslatma**: ochiq internet manbalarida Najot Ta'limning ichki tashkiliy tuzilmasi, marketing bo'limining aniq shtati (nechta SMM-chi, copywriter, mobilograf bor) yoki ular foydalanadigan ichki tizimlar (CRM, analitika vositalari) haqida ma'lumot topilmadi. Bu ma'lumotlar faqat sizdan (loyiha egasidan) olinishi mumkin — shu sababli `02-SAVOLLAR.md` faylida bu bo'yicha savollar ko'p.

## 2. Marketing analitika dashboardlari bo'yicha 2026-yil amaliyotlari

Manbalar: [Dataslayer](https://www.dataslayer.ai/blog/marketing-dashboard-kpis-2026-playbook), [Improvado](https://improvado.io/blog/12-best-marketing-dashboard-examples-and-templates), [Saras Analytics](https://www.sarasanalytics.com/blog/marketing-analytics-dashboard), [KEO Marketing](https://keomarketing.com/marketing-analytics-attribution-guide-150191-2)

- **Ko'p dashboard emas, kam va aniq**: odatda 3–5 ta dashboard yetarli — Executive (rahbariyat uchun umumiy ko'rinish), Performance (kanal bo'yicha samaradorlik), Content (kontent-reja va natijalar), Technical/IT (sayt, integratsiyalar), va zarur bo'lsa Campaign-Specific (aniq kampaniya uchun).
- **Har bir ko'rsatkich qaror uchun bo'lishi kerak**: agar biror KPI hech qanday qarorga ta'sir qilmasa, u shunchaki "bezak" — dashboardga qo'shilmasligi kerak. Operatsion dashboardda odatda 8–12 tadan ko'p bo'lmagan asosiy KPI bo'ladi, har birida maqsad/chegara (threshold) ko'rsatilgan.
- **Muhim KPI'lar namunasi**: CAC (mijoz jalb qilish narxi), ROAS (reklama xarajati samaradorligi), konversiya darajasi, LTV, churn, engagement rate, follower o'sishi — lekin bular biznesga xos bo'lishi kerak (Najot Ta'lim uchun bu ko'proq "lidlar soni", "kursga yozilganlar soni", "bir lid narxi", "ijtimoiy tarmoqlardagi o'sish" kabi ko'rsatkichlar bo'lishi mumkin).
- **Rol-asosidagi ko'rinish (role-based views)**: yaxshi dashboardlar har bir xodimga faqat unga tegishli bo'lgan ma'lumotlarni ko'rsatadi — bu aynan sizning talabingiz (Marketing boshlig'i, SMM, Copywriter, Mobilograf va h.k. uchun alohida sahifalar) bilan mos keladi.
- **Trend va benchmark muhim**: xom raqamlar emas, balki maqsadga nisbatan (% bajarilish), tarixiy trend va davrlar taqqoslash (oy/hafta) ko'rsatilishi tavsiya etiladi.

## 3. Supabase bilan ko'p-rolli, xavfsiz dashboard qurish

Manbalar: [Supabase RLS rasmiy hujjat](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac), [Supabase RLS Features](https://supabase.com/features/row-level-security), [Makerkit RLS Best Practices](https://makerkit.dev/blog/tutorials/supabase-rls-best-practices)

- **Supabase Auth** — foydalanuvchi autentifikatsiyasi uchun (email+parol, magic link yoki OTP) tayyor xizmat. "Begona odamlar kirmasligi" talabingiz aynan shu bilan yechiladi: faqat ro'yxatdan o'tgan/tizimga qo'shilgan xodimlar kira oladi (o'z-o'zidan ro'yxatdan o'tish o'chirilgan bo'ladi — xodimlarni admin/HR qo'shadi yoki taklif linki yuboradi).
- **Row Level Security (RLS)** — PostgreSQL darajasidagi xavfsizlik: har bir jadvalda RLS yoqiladi va policy'lar orqali "kim nimani ko'rishi/o'zgartirishi mumkinligi" bazaning o'zida belgilanadi (frontend kodiga ishonib qolinmaydi — xatolik bo'lsa ham ma'lumot oqib ketmaydi).
- **Rollarni saqlash usuli**: odatda alohida `roles`/`profiles` jadvali yoki foydalanuvchi JWT tokenidagi `app_metadata` orqali rol saqlanadi (masalan `marketing_head`, `smm`, `copywriter`, `videographer`, `it`). JWT'da saqlash tezroq ishlaydi, chunki har safar bazadan so'rash shart bo'lmaydi.
- **Sahifa yo'naltirish (routing)**: foydalanuvchi tizimga kirgach, uning rolini frontend (Next.js middleware yoki shunga o'xshash) o'qib, mos sahifaga (`/marketing-boshligi`, `/smm`, `/copywriter`, `/mobilograf`, `/it` va h.k.) avtomatik yo'naltiradi; boshqa rol sahifasiga to'g'ridan-to'g'ri URL orqali kirishga urinsa ham, RLS va route-guard uni bloklaydi.
- **service_role kalit**: faqat server tomonida ishlatiladi (masalan tashqi API'lardan — Meta Ads, Google Analytics — ma'lumot tortib, bazaga yozadigan fon jarayonda); brauzerga hech qachon chiqarilmaydi.

## 4. Supabase hisob holati

- Sizda hozircha Supabase akkaunt/loyiha bor-yo'qligi ma'lum emas. Agar bo'lmasa, [supabase.com](https://supabase.com) orqali bepul (Free tier) loyiha ochib beraman — email tasdiqlash kerak bo'lgani uchun, bu bosqichda sizning ishtirokingiz (tasdiqlash email'i orqali) kerak bo'ladi. Buni keyingi bosqichda birga bajaramiz.

## Manbalar

- [Najot Ta'lim rasmiy sayt](https://najottalim.uz/)
- [Najot Ta'lim SMM Pro kursi](https://kurslar.najottalim.uz/smm)
- [Najot Ta'lim Telegram kanali](https://t.me/s/najottalim)
- [Dataslayer — Marketing Dashboard KPIs: 2026 Decision Playbook](https://www.dataslayer.ai/blog/marketing-dashboard-kpis-2026-playbook)
- [Dataslayer — Marketing Dashboard Best Practices 2026](https://www.dataslayer.ai/blog/marketing-dashboard-best-practices-2025)
- [Improvado — 12 Best Marketing Dashboard Examples & Templates for 2026](https://improvado.io/blog/12-best-marketing-dashboard-examples-and-templates)
- [Saras Analytics — Best 11 Marketing Analytics Dashboards 2026](https://www.sarasanalytics.com/blog/marketing-analytics-dashboard)
- [Supabase — Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Supabase — Row Level Security](https://supabase.com/features/row-level-security)
- [Makerkit — Supabase RLS Best Practices](https://makerkit.dev/blog/tutorials/supabase-rls-best-practices)
