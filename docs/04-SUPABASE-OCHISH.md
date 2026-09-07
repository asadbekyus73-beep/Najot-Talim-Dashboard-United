# Supabase loyihasini ochish — sizning navbatingiz (5-10 daqiqa)

> Xavfsizlik siyosatimga ko'ra, men uchinchi tomon xizmatida (Supabase) sizning nomingizdan akkaunt ochib, parol kirita olmayman — bu qadamni o'zingiz bajarishingiz kerak. Qolgan hammasi (kod, jadvallar, demo xodimlar, sahifalar) allaqachon tayyor — quyidagilarni bajarib, menga 3 ta qiymatni qaytarsangiz, darhol ishga tushiraman.

## 1-qadam: Akkaunt va loyiha ochish

1. https://supabase.com ga kiring → **Start your project** → GitHub yoki email bilan ro'yxatdan o'ting.
2. Dashboard ochilgach, **New project** tugmasini bosing.
3. Quyidagilarni kiriting:
   - **Name**: `najot-marketing-dashboard`
   - **Database Password**: o'zingiz uchun kuchli parol o'ylab toping va **eslab qoling/saqlab qo'ying** (menga berish shart emas)
   - **Region**: sizga yaqinroq bo'lganini tanlang (masalan Singapore)
4. **Create new project** tugmasini bosing va ~2 daqiqa kuting (loyiha tayyorlanadi).

## 2-qadam: Baza sxemasini o'rnatish (SQL ishga tushirish)

1. Chap menyudan **SQL Editor** bo'limiga o'ting.
2. **New query** tugmasini bosing.
3. Ushbu loyihadagi `supabase/migrations/0001_init.sql` faylining **butun mazmunini** nusxalab, SQL Editor'ga joylashtiring.
4. **Run** tugmasini bosing. "Success. No rows returned" degan xabar chiqishi kerak — bu jadvallar, rollar va xavfsizlik qoidalari (RLS) muvaffaqiyatli yaratilganini bildiradi.

## 3-qadam: API kalitlarni olish

1. Chap menyudan **Project Settings** (pastda, tishli g'ildirakcha) → **API** bo'limiga o'ting.
2. Quyidagi 3 ta qiymatni toping va menga (shu suhbatda) yuboring:
   - **Project URL** (masalan `https://abcdefgh.supabase.co`)
   - **anon / public** kaliti (`anon` `public` yozuvi ostida)
   - **service_role** kaliti (`service_role` `secret` yozuvi ostida — **hech kimga, hech qayerga ulashmang**, faqat menga shu suhbatda yuboring, men uni faqat serverda, brauzerga chiqmaydigan tarzda ishlataman)

## Shundan keyin nima bo'ladi?

Siz bu 3 ta qiymatni yuborishingiz bilan men:
1. `.env.local` fayliga joylashtiraman,
2. Demo xodimlar (admin, marketing boshlig'i, SMM, copywriter, mobilograf, IT) va namunaviy statistik ma'lumotlarni avtomatik yarataman,
3. Ilovani ishga tushirib, barcha sahifalarni sizga ko'rsataman.

**Eslatma**: `service_role` kaliti — bu ma'lumotlar bazasiga to'liq (xavfsizlik qoidalarini chetlab o'tuvchi) kirish huquqi beradi. Uni faqat menga (shu suhbat orqali) yuboring, boshqa hech qayerga joylashtirmang yoki ulashmang.
