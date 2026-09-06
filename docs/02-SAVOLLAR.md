# Savollar — javob bering, shundan keyin loyihani qurishni boshlayman

> Har bir savolga qisqa javob yetarli. Agar aniq bilmasangiz, "hozircha bilmayman" yoki taxminiy javob yozing — loyiha davomida o'zgartirish mumkin. Javoblaringizni shu faylga to'g'ridan-to'g'ri yozib qaytarsangiz ham bo'ladi, yoki suhbatda yozing.

## A. Xodimlar va rollar (eng muhim qism)

1. Marketing bo'limida aniq qancha va qanday lavozimlar bor? Siz sanagan ro'yxatni to'liqlashtiring:
   - Marketing bo'lim boshlig'i
   - IT bo'lim xodimlari
   - Copywriter
   - SMM-chi
   - Mobilograf (videograf/montajchi)
   - ... (yana kim bor? Masalan: Dizayner/Grafik dizayner, Target/reklama mutaxassisi (targetolog), Kontent-menejer, PR-mutaxassis, Analitik?)
2. Har bir rol uchun: ular dashboardda **nimani ko'rishi** va **nimani o'zgartira olishi (kiritish/tahrirlash)** kerak? (Masalan: SMM-chi faqat o'z statistikasini ko'radimi yoki boshqalarnikini ham ko'radimi? Marketing boshlig'i hammani ko'radimi va tasdiqlay oladimi?)
3. IT bo'lim xodimlarining bu dashboarddagi vazifasi nima? (Texnik qo'llab-quvvatlashmi, alohida "texnik ko'rsatkichlar" sahifasi kerakmi — masalan sayt tezligi, xatolar, integratsiyalar holati?)
4. Xodimlar sonini taxminan ayting (masalan: 1 boshliq, 3 SMM-chi, 2 copywriter, 1 mobilograf, 2 IT — jami ~10 kishi)?
5. Yangi xodim qo'shish/o'chirish kim tomonidan amalga oshiriladi? (Faqat siz/admin, yoki bo'lim boshlig'i ham xodim qo'sha oladimi?)

## B. Ma'lumotlar manbalari (data sources)

6. Hozir marketing natijalarini qayerdan kuzatasiz? Quyidagilardan qaysilari ishlatiladi:
   - Instagram (Business/Creator akkaunt, Meta Business Suite)
   - Telegram (kanal statistikasi, bot orqali lidlar)
   - Facebook / Meta Ads
   - Google Ads
   - YouTube
   - TikTok
   - Google Analytics (sayt trafigi)
   - CRM (masalan Bitrix24, amoCRM yoki Najot Ta'limning o'z ichki tizimi bormi?)
   - Google Sheets / Excel (qo'lda yuritiladigan hisobotlar)
7. Ushbu manbalardan ma'lumotlar **avtomatik API orqali** tortib olinishi kerakmi (masalan Meta/Google API integratsiyasi), yoki boshlang'ich bosqichda xodimlar ma'lumotlarni **qo'lda dashboardga kiritishadimi** (forma orqali)? *(API integratsiyalari ko'proq vaqt va har bir xizmat uchun kalit/ruxsat talab qiladi — shuning uchun bu muhim savol.)*
8. Agar API integratsiya kerak bo'lsa: bu xizmatlarning admin/business akkauntlariga kirish huquqi (Meta Business Manager, Google Analytics va h.k.) sizda bormi va bera olasizmi?

## C. Ko'rsatkichlar (KPI'lar)

9. Marketing boshlig'i uchun eng muhim 5–8 ta ko'rsatkich qaysilar? (Masalan: yangi lidlar soni, bir lid narxi (CPL), kursga yozilganlar soni, reklama byudjeti va uning natijasi (ROAS), ijtimoiy tarmoq o'sishi, kontent-reja bajarilishi %)
10. SMM-chi uchun qaysi ko'rsatkichlar kerak? (Follower o'sishi, engagement rate, post chastotasi, eng yaxshi post reytingi va h.k.)
11. Copywriter uchun qaysi ko'rsatkichlar/ma'lumotlar kerak? (Yozilgan matnlar soni, nashr holati — qoralama/tasdiqlangan/nashr etilgan, deadline'lar)
12. Mobilograf uchun qaysi ko'rsatkichlar kerak? (Video ko'rishlar soni, tayyorlangan videolar soni, montaj holati)

## D. Ish jarayoni (workflow)

13. Kontent tasdiqlash jarayoni kerakmi? Masalan: Copywriter matn yozadi → Marketing boshlig'i ko'rib tasdiqlaydi → keyin "nashr etildi" deb belgilanadi. Shunga o'xshash tasdiqlash oqimi (approval workflow) dashboardda bo'lishi kerakmi, yoki bu faqat statistik ko'rish uchunmi?
14. Vazifalar/topshiriqlar (task) boshqaruvi kerakmi (masalan Trello/Asana kabi), yoki faqat **hisobot/statistika ko'rsatish** (analitika) yetarlimi? *(Bu ikkisi juda boshqa hajmdagi loyiha — aniqlik muhim.)*

## E. Texnik va tashkiliy savollar

15. Domen bormi (masalan `dashboard.najottalim.uz`)? Bo'lmasa, vaqtinchalik bepul domenda (masalan Vercel subdomeni) joylashtirsam bo'ladimi?
16. Supabase akkauntingiz bormi? Bo'lmasa, sizning email (`asadbekyus73@gmail.com`) bilan ochib, keyin sizga topshirsam bo'ladimi?
17. Dashboard tili: faqat o'zbek tilimi, yoki rus/ingliz tili ham kerakmi?
18. Brend elementlari bormi (logotip, asosiy ranglar)? Najot Ta'limning umumiy brend uslubiga moslashtirish kerakmi, yoki alohida ichki-tizim dizayni bo'lsa bo'ladimi?
19. Dashboard faqat kompyuterdan (desktop) ishlatiladimi, yoki telefon/planshetdan ham qulay bo'lishi shartmi (responsive)?
20. Bildirishnomalar kerakmi? (Masalan, biror KPI maqsaddan pastga tushsa yoki yangi kontent tasdiqlash kutayotganda — email yoki Telegram-bot orqali xabar berish)
21. Hisobotlarni PDF/Excel formatda yuklab olish (export) imkoniyati kerakmi?
22. Loyiha uchun taxminiy muddat bormi (masalan 2 hafta, 1 oy)? Bosqichma-bosqich (MVP birinchi, keyin qo'shimcha funksiyalar) yondashuv maqul bo'ladimi?

## F. Xavfsizlik

23. Ikki bosqichli tasdiqlash (2FA/OTP) kerakmi, yoki oddiy email+parol yetarlimi boshlang'ich bosqichda?
24. Faqat ofis/Wi-Fi tarmog'idan kirish kabi qo'shimcha cheklovlar kerakmi, yoki istalgan joydan (uydan, telefondan) kirish imkoni bo'lishi kerakmi?

---

**Javob berish shart bo'lmagan, lekin foydali bo'lgan savollar** (agar bilmasangiz, standart (eng ko'p qo'llaniladigan) yechim bilan davom etaman):
- 6, 7, 8 (integratsiyalar) — agar hozircha aniq bo'lmasa, boshlang'ich bosqichda **qo'lda ma'lumot kiritish** bilan boshlab, keyin API integratsiyalarini qo'shib boraman.
- 15–16 (domen, Supabase) — agar tayyor bo'lmasa, o'zim vaqtinchalik variant bilan boshlab beraman.
