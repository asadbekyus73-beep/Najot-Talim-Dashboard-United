# Najot Ta'lim Marketing Dashboard — Qonun-Qoidalar

**Hujjat turi:** Ichki reglament
**Amal qilish doirasi:** Marketing bo'limi xodimlari, IT bo'limi, tizim administratorlari
**Tizim manzili:** https://najot-marketing-dashboard.vercel.app
**Oxirgi yangilanish:** 2026-09-08

---

## 1. Umumiy qoidalar

1.1. Ushbu hujjat Najot Ta'lim o'quv markazi Marketing bo'limining analitik dashboard tizimidan foydalanish tartibini belgilaydi.

1.2. Tizimdan foydalanish huquqi faqat Najot Ta'lim xodimlariga beriladi. Akkaunt ochish faqat administrator tomonidan amalga oshiriladi — tizimda ochiq ro'yxatdan o'tish (self-signup) mavjud emas.

1.3. Tizimga birinchi marta kirgan xodim ushbu qoidalar bilan tanishgan va ularga rioya qilishga rozi hisoblanadi.

1.4. Qoidalarga rioya qilmaslik natijasida yuzaga kelgan ma'lumot sizib chiqishi yoki zarar uchun javobgarlik qoidabuzar xodim zimmasiga yuklanadi.

---

## 2. Tizimga kirish qoidalari

2.1. Har bir xodim faqat **o'ziga berilgan shaxsiy akkaunt** orqali tizimga kiradi.

2.2. Akkauntni boshqa shaxsga berish, login va parolni ulashish **qat'iyan taqiqlanadi** — shu jumladan hamkasblarga.

2.3. Xodim ishdan bo'shaganda yoki lavozimi o'zgarganda, uning akkaunti **24 soat ichida** administrator tomonidan o'chiriladi yoki roli yangilanadi.

2.4. Umumiy foydalanuvchi (masalan `marketing@...` kabi bo'lim akkaunti) yaratish taqiqlanadi — har bir kirish aniq bir xodimga bog'langan bo'lishi shart.

2.5. Ish kompyuteridan tashqarida (shaxsiy telefon, internet-kafe, boshqa shaxs kompyuteri) tizimga kirilganda, ish yakunida albatta **"Chiqish" (Logout)** tugmasi bosilishi shart.

---

## 3. Parol siyosati

3.1. Birinchi kirishdan so'ng xodim **majburiy ravishda** boshlang'ich parolni o'zgartiradi (**Profil** → **Parolni o'zgartirish**).

3.2. Parolga qo'yiladigan minimal talablar:
- kamida **8 ta belgi**;
- katta va kichik harflar aralashmasi;
- kamida bitta raqam.

3.3. Parolni qog'ozga yozib monitor yoniga qoldirish, chat yoki emailda ochiq matnda yuborish taqiqlanadi.

3.4. Parol oshkor bo'lgani gumon qilinsa, xodim **darhol** parolni o'zgartiradi va IT bo'limiga xabar beradi.

3.5. Parol kamida **6 oyda bir marta** yangilanishi tavsiya etiladi.

---

## 4. Rollar va mas'uliyat

Tizimda 6 ta rol mavjud. Har bir xodim tizimga kirgach **faqat o'z rolining sahifasiga** yo'naltiriladi va faqat o'ziga ruxsat etilgan ma'lumotni ko'radi. Bu cheklov ma'lumotlar bazasi darajasida (Supabase RLS) o'rnatilgan — uni interfeys orqali chetlab o'tish mumkin emas.

| Rol | Kirish huquqi | Asosiy mas'uliyat |
|---|---|---|
| **Super-admin** | Barcha bo'limlar, xodimlarni boshqarish | Akkaunt ochish/o'chirish, rollarni belgilash, tizim yaxlitligi |
| **Marketing bo'lim boshlig'i** | Umumiy ko'rinish, jamoa, kampaniyalar, hisobotlar | Kampaniyalarni tasdiqlash, KPI nazorati, hisobotlarni rahbariyatga taqdim etish |
| **SMM mutaxassisi** | Statistika, kontent-reja, postlar | Post rejasini yuritish, ijtimoiy tarmoq ko'rsatkichlarini kuzatish |
| **Copywriter** | Topshiriqlar, matnlar arxivi | Matnlarni tayyorlash, tahrirga topshirish, arxivni tartibda saqlash |
| **Mobilograf** | Video-reja, videolar | Video kontentni rejalashtirish va holatini yangilab borish |
| **IT bo'lim xodimi** | Texnik holat, integratsiyalar | Integratsiyalar ishlashini nazorat qilish, texnik nosozliklarni bartaraf etish |

4.1. Xodim o'ziga tegishli bo'lmagan sahifaga kirishga urinmasligi kerak. Bunday urinishlar tizim tomonidan bloklanadi va qayd etiladi.

4.2. Rolni o'zgartirish faqat bo'lim boshlig'ining yozma (yoki rasmiy chatdagi) so'rovi asosida Super-admin tomonidan amalga oshiriladi.

---

## 5. Ma'lumotlar bilan ishlash qoidalari

5.1. **Aniqlik.** Tizimga kiritilgan har qanday ko'rsatkich haqiqiy manbaga (reklama kabineti, analitika paneli, CRM) asoslangan bo'lishi shart. Taxminiy yoki "chamalab" kiritilgan raqamlar taqiqlanadi.

5.2. **O'z vaqtida.** Kunlik ko'rsatkichlar keyingi ish kunining soat **12:00** gacha kiritiladi.

5.3. **O'zgartirish.** Allaqachon kiritilgan ma'lumotni o'zgartirish zarur bo'lsa, sabab bo'lim boshlig'iga ma'lum qilinadi.

5.4. **O'chirish.** Ma'lumotni o'chirish faqat Super-admin huquqida. Oddiy xodim yozuvni o'chirish o'rniga uning holatini o'zgartiradi.

5.5. Tizimdan yuklab olingan CSV hisobotlar **ichki hujjat** hisoblanadi va faqat ish maqsadida ishlatiladi.

---

## 6. Kontent ish jarayoni

Har bir kontent (matn, post, video) quyidagi 4 bosqichdan o'tadi:

```
Qoralama  →  Tekshiruvda  →  Tasdiqlangan  →  Chop etilgan
(draft)      (review)        (approved)       (published)
```

6.1. **Qoralama** — muallif (copywriter, SMM, mobilograf) ish boshlagan holat.

6.2. **Tekshiruvda** — muallif ishni yakunlab, tekshirishga topshirgan holat. Bu bosqichda matn/videoga o'zgartirish kiritilmaydi.

6.3. **Tasdiqlangan** — Marketing bo'lim boshlig'i tomonidan ma'qullangan. **Faqat bo'lim boshlig'i** bu holatni qo'ya oladi.

6.4. **Chop etilgan** — kontent haqiqatda e'lon qilingan. Bu holat e'lon qilingandan **keyin** qo'yiladi, oldindan emas.

6.5. Bosqichlarni chetlab o'tish (masalan, qoralamadan to'g'ridan-to'g'ri chop etilganga o'tkazish) taqiqlanadi.

---

## 7. Maxfiylik va xavfsizlik

7.1. Tizimdagi barcha ma'lumotlar (byudjet, konversiya, lid narxi, xodimlar samaradorligi) **kompaniyaning ichki tijorat siri** hisoblanadi.

7.2. Ekran suratlarini (screenshot) tashqi shaxslarga, ijtimoiy tarmoqlarga yoki shaxsiy chatlarga yuborish **taqiqlanadi**.

7.3. Tizim ma'lumotlarini raqobatchilarga, sobiq xodimlarga yoki kompaniyadan tashqaridagi hech kimga oshkor qilish mumkin emas.

7.4. **Maxfiy kalitlar** (`SUPABASE_SERVICE_ROLE_KEY`, ma'lumotlar bazasi paroli) faqat IT bo'limi va Super-adminda saqlanadi. Bu kalitlarni hujjatlarga, chatlarga yoki kod repozitoriysiga joylashtirish qat'iyan taqiqlanadi.

7.5. Har qanday shubhali holat (begona kirish, tanish bo'lmagan o'zgarishlar) darhol IT bo'limiga xabar qilinadi.

---

## 8. Taqiqlangan harakatlar

Quyidagilar tizimdan foydalanish huquqini bekor qilishga olib keladi:

- akkaunt ma'lumotlarini boshqa shaxsga berish;
- boshqa rolning sahifasiga kirishga urinish yoki himoyani chetlab o'tishga harakat qilish;
- ma'lumotlarni ataylab noto'g'ri kiritish yoki buzish;
- tizim ma'lumotlarini tashqariga chiqarish (screenshot, eksport, nusxa ko'chirish) — ish ehtiyojidan tashqari;
- maxfiy kalitlarni ochiq joyda saqlash yoki ulashish;
- tizimga avtomatlashtirilgan skript/bot orqali ruxsatsiz murojaat qilish.

---

## 9. Texnik qoidalar (dasturchilar uchun)

9.1. `.env.local` fayli va maxfiy kalitlar **hech qachon** Git repozitoriysiga yuklanmaydi. `.gitignore` faylidagi `.env*` qatori o'chirilmaydi.

9.2. Ma'lumotlar bazasi sxemasidagi har qanday o'zgarish `supabase/migrations/` papkasida alohida migratsiya fayli sifatida saqlanadi. Bazani to'g'ridan-to'g'ri panel orqali o'zgartirish (migratsiyasiz) taqiqlanadi.

9.3. Yangi jadval qo'shilganda **majburiy ravishda** RLS (Row Level Security) siyosati yoziladi. RLS yoqilmagan jadval ishlab chiqarishga chiqarilmaydi.

9.4. `service_role` kaliti faqat server tomonda (`src/lib/supabase/admin.ts`) ishlatiladi. Uni brauzer koduga (`"use client"`) olib kirish qat'iyan taqiqlanadi.

9.5. Deploy qilishdan oldin `npm run build` va `npm run lint` muvaffaqiyatli o'tishi shart.

9.6. Ishlab chiqarish (production) muhitiga o'zgartirish faqat sinovdan o'tgandan keyin chiqariladi.

---

## 10. Qoidabuzarlik va choralar

| Daraja | Misol | Chora |
|---|---|---|
| **Yengil** | Ma'lumotni kechiktirib kiritish, holatni noto'g'ri belgilash | Og'zaki ogohlantirish |
| **O'rta** | Ish yakunida chiqmaslik, parolni almashtirmaslik | Yozma ogohlantirish |
| **Og'ir** | Akkauntni ulashish, ruxsatsiz kirishga urinish | Kirish huquqini vaqtincha bekor qilish |
| **Juda og'ir** | Maxfiy ma'lumotni tashqariga oshkor qilish | Kirish huquqini butunlay bekor qilish + intizomiy javobgarlik |

---

## 11. Yordam va murojaat

- **Texnik muammolar** (kira olmadim, sahifa ochilmayapti, xato chiqdi) → IT bo'limi xodimi
- **Kirish huquqi, rol o'zgarishi, yangi akkaunt** → Super-admin
- **Ma'lumot mazmuni bo'yicha savollar** → Marketing bo'lim boshlig'i

---

## 12. Qoidalarni yangilash

12.1. Ushbu qoidalar Marketing bo'lim boshlig'i va IT bo'limi kelishuvi asosida yangilanadi.

12.2. Har qanday o'zgarish barcha xodimlarga e'lon qilinadi va hujjatning "Oxirgi yangilanish" sanasi yangilanadi.

12.3. Qoidalarning eng so'nggi versiyasi ushbu fayl (`docs/06-QONUN-QOIDALAR.md`) hisoblanadi.
