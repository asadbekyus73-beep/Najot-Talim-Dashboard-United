# Qabul qilingan yakuniy qarorlar

> Bu loyiha AI kursi uy vazifasi sifatida qurilmoqda — "mukammal bo'lishi shart emas, lekin mukammal ishlashi kerak". Shu sababli `02-SAVOLLAR.md` dagi ochiq savollarning katta qismi standart (eng maqbul) yechim bilan mustaqil hal qilindi. Faqat texnik jihatdan haqiqatan ham bloklovchi ikkita savol so'raldi. Quyida har bir qaror va sababi keltirilgan.

## Bloklovchi savollar (foydalanuvchidan so'ralgan)

1. **Supabase backend**: Lokal Docker → disk to'liq to'lib qolgani (0 bayt, keyin ~2GB) sababli **hosted (bulutli) Supabase**ga o'tildi. Hisob ochish (parol kiritish) xavfsizlik siyosatiga ko'ra foydalanuvchining o'zi tomonidan bajariladi (`04-SUPABASE-OCHISH.md`).
2. **Deploy**: Faqat lokal (`localhost:3000`) — jonli havola kerak emas.

## Mustaqil qabul qilingan qarorlar

| Mavzu | Qaror | Sabab |
|---|---|---|
| Rollar | admin, marketing_head, smm, copywriter, videographer, it (6 ta) | Foydalanuvchi so'ragan ro'yxat + boshqaruv uchun admin |
| Ma'lumotlar manbai | Real API integratsiya (Meta/Google Ads) YO'Q — demo/mock ma'lumotlar + qo'lda kontent kiritish | Homework doirasida real reklama hisoblariga ulanish shart emas; RLS va rol-asoslash asosiy maqsad |
| Auth | Invite-only: faqat admin panel orqali xodim qo'shiladi, email tasdiqlash shart emas (`email_confirm: true`) | "Begona odamlar kirmasligi" talabiga mos, SMTP sozlash shart emas |
| Workflow | Kontent uchun draft → review → approved → published bosqichlari, marketing_head/admin tasdiqlaydi | TZ'dagi "tasdiqlash jarayoni" talabini qondiradi, ortiqcha murakkabliksiz |
| Til | Faqat o'zbek tili | Foydalanuvchi va Najot Ta'lim auditoriyasi o'zbek tilida |
| Dizayn | Neytral, professional palitra (dataviz skill'idagi validatsiya qilingan rang to'plami) | Najot Ta'limning rasmiy brend-buki topilmagani uchun |
| Bildirishnomalar / eksport | Email/Telegram bildirishnoma yo'q; CSV eksport bor (Hisobotlar sahifasida) | Asosiy funksionallikka e'tibor, ortiqcha integratsiyalardan qochish |
| Xavfsizlik | 2FA yo'q, IP cheklov yo'q; RLS baza darajasida barcha jadvallarda yoqilgan | Homework doirasida yetarli, RLS — asosiy talab |

## Yo'l davomida yuzaga kelgan texnik muammo

Loyihani qurish jarayonida kompyuterning **C: diskida joy 0 baytgacha tugab qoldi**, bu Docker Desktop'ning ichki fayl tizimini (`containerd`) buzilishiga va faqat-o'qish rejimiga o'tishiga sabab bo'ldi. Vaqtinchalik fayllar (Temp, npm-cache) tozalanib, keyin Supabase local Docker o'rniga hosted (bulutli) Supabase'ga o'tildi. **Tavsiya**: diskda doimiy ravishda kamida 10-15GB bo'sh joy saqlang — aks holda Windows va dasturlar (jumladan Docker) beqaror ishlashi mumkin.
