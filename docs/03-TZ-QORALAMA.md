# Texnik Topshiriq (qoralama) — Najot Ta'lim Marketing Analitika Dashboardi

> **Holat: QORALAMA.** Bu hujjat `02-SAVOLLAR.md` dagi javoblar asosida yakunlanadi. Hozirgi shakli — taxminiy tuzilma, sizga umumiy tasavvur berish va savollarga javob berishni osonlashtirish uchun tuzilgan. Javoblardan so'ng sahifalar, rollar va ko'rsatkichlar ro'yxati aniqlanadi/o'zgaradi.

## 1. Loyihaning maqsadi

Najot Ta'lim Marketing bo'limi uchun ichki, ruxsatsiz kirishdan himoyalangan analitik dashboard veb-sayt. Har bir xodim tizimga kirgach, faqat o'z lavozimiga tegishli sahifaga (route) yo'naltiriladi va faqat unga tegishli ma'lumotlarni ko'radi/kiritadi.

## 2. Taklif etilayotgan texnologik stack

| Qism | Taklif |
|---|---|
| Frontend | Next.js (React) + TypeScript, Tailwind CSS |
| Backend / Baza | Supabase (Postgres + Auth + Row Level Security + Storage) |
| Grafiklar | Recharts yoki shunga o'xshash kutubxona |
| Hosting | Vercel (frontend), Supabase Cloud (baza/auth) |
| Autentifikatsiya | Supabase Auth — email + parol (invite-only, o'z-o'zidan ro'yxatdan o'tish YO'Q) |

*Eslatma: agar sizda boshqa texnologik afzallik (masalan Vue, boshqa hosting) bo'lsa, `02-SAVOLLAR.md` ga qo'shimcha sifatida ayting.*

## 3. Rollar (dastlabki ro'yxat — tasdiqlash kerak)

- `admin` — Super-admin (tizim egasi, barcha huquqlarga ega, xodim qo'shish/o'chirish)
- `marketing_head` — Marketing bo'lim boshlig'i
- `smm` — SMM mutaxassisi
- `copywriter` — Copywriter
- `videographer` — Mobilograf/videograf
- `it` — IT bo'lim xodimi
- *(qo'shimcha rollar `02-SAVOLLAR.md` A-bo'limiga javoblardan keyin qo'shiladi, masalan: dizayner, targetolog)*

## 4. Sahifalar tuzilmasi (dastlabki taklif)

### 4.1. Umumiy sahifalar (barcha rollar uchun)

| Sahifa | Tavsif |
|---|---|
| `/login` | Kirish sahifasi (email + parol). Muvaffaqiyatli kirishdan so'ng foydalanuvchi roliga qarab avtomatik yo'naltiriladi. |
| `/profil` | Shaxsiy profil — ism, lavozim, parol almashtirish. |
| `/404`, `/403` | Ruxsatsiz yoki mavjud bo'lmagan sahifaga urinishda ko'rsatiladigan xato sahifalari. |

### 4.2. `admin` — Super-admin paneli

- `/admin` — Umumiy tizim holati (necha xodim, oxirgi kirishlar)
- `/admin/xodimlar` — Xodimlarni qo'shish/o'chirish/tahrirlash, rol biriktirish
- `/admin/sozlamalar` — Tizim sozlamalari, integratsiyalar (API kalitlar) boshqaruvi

### 4.3. `marketing_head` — Marketing bo'lim boshlig'i

- `/marketing-boshligi` — Umumiy ko'rinish (Executive Dashboard): barcha kanallar bo'yicha asosiy KPI'lar bir sahifada (lidlar, konversiya, byudjet, ijtimoiy tarmoq o'sishi)
- `/marketing-boshligi/jamoa` — Jamoa samaradorligi: har bir xodim/rol bo'yicha bajarilgan ishlar xulosasi
- `/marketing-boshligi/kampaniyalar` — Reklama kampaniyalari va byudjet taqsimoti (agar reklama boshqaruvi kerak bo'lsa)
- `/marketing-boshligi/hisobotlar` — Davriy hisobotlar (oylik/haftalik), export imkoniyati

### 4.4. `smm` — SMM mutaxassisi

- `/smm` — Ijtimoiy tarmoqlar statistikasi: follower o'sishi, engagement, kanal/akkaunt bo'yicha taqqoslash (Instagram, Telegram, Facebook, TikTok, YouTube)
- `/smm/kontent-reja` — Kontent-kalendar: rejalashtirilgan postlar, holati (reja/tayyor/nashr etilgan)
- `/smm/postlar` — Chiqqan postlar reytingi (eng ko'p yoqtirilgan/ko'rilgan)

### 4.5. `copywriter` — Copywriter

- `/copywriter` — Shaxsiy topshiriqlar ro'yxati (yozish kerak bo'lgan matnlar, muddatlar)
- `/copywriter/matnlar` — Yozilgan matnlar arxivi va holati (qoralama / tekshiruvda / tasdiqlangan / nashr etilgan)

### 4.6. `videographer` — Mobilograf

- `/mobilograf` — Video-reja: suratga olish jadvali, montaj holati
- `/mobilograf/videolar` — Tayyor videolar ro'yxati va statistikasi (ko'rishlar, YouTube/Instagram Reels natijalari)

### 4.7. `it` — IT bo'lim xodimi

- `/it` — Texnik ko'rsatkichlar: sayt trafigi (Google Analytics), sayt ishlashi, integratsiyalar holati (qaysi API'lar ulangan/uzilgan)
- `/it/integratsiyalar` — API kalitlar va ulanishlarni boshqarish (agar admin ruxsat bersa)

## 5. Xavfsizlik talablari

- Barcha jadvallarda Supabase Row Level Security (RLS) yoqilgan bo'ladi — foydalanuvchi faqat o'z roliga ruxsat etilgan ma'lumotni ko'radi, bu baza darajasida ta'minlanadi (frontendga ishonib qolinmaydi).
- Ro'yxatdan o'tish yopiq (invite-only): faqat admin tomonidan qo'shilgan email'lar tizimga kira oladi.
- `service_role` kaliti faqat server tomonida, hech qachon brauzerga chiqarilmaydi.
- Parollar Supabase Auth orqali xavfsiz saqlanadi (hashing avtomatik).

## 6. Keyingi bosqichlar

1. Siz `02-SAVOLLAR.md` fayliga javob berasiz.
2. Javoblar asosida ushbu TZ yakunlanadi (rollar, sahifalar, KPI'lar aniqlashtiriladi).
3. Supabase loyihasi ochiladi (agar mavjud bo'lmasa) va baza sxemasi (jadvallar, RLS policy'lar) tuzilib, kod yozish boshlanadi.
