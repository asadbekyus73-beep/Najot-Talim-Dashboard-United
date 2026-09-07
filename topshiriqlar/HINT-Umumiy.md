# HINT — Umumiy / Overview (Home.py)

> Eslatma: Home.py — koordinator tomonidan to'liq namuna sifatida qurilgan. Bu HINT senga o'sha sahifa **nimaga shunday qurilganini** tushunish uchun kerak — chunki barcha boshqa bo'limlar shu sahifaga "havola qiladi".

## a) Bu bo'lim nima?

Bu — butun o'quv markazining "bosh ekrani". Direktor yoki bo'lim boshliqlari ertalab birinchi shu sahifani ochadi: umuman ishlar qalay, qayerda muammo bor. Bitta raqamga qarab hamma narsani tushunish kerak — batafsil narsalar boshqa bo'lim sahifalarida.

## b) Qaysi ma'lumot

- `students.csv` — jami va faol o'quvchilar soni, kurs bo'yicha taqsimot
- `payments.csv` — oylik daromad, qarzdorlik (`status != 'paid'`)
- `attendance.csv` — umumiy davomat foizi
- `leads.csv` — yangi lidlar, konversiya (`status == 'enrolled'` ulushi)
- `traffic.csv` — lidlar manba bo'yicha

## c) KPI (4-6 ta)

1. Faol o'quvchilar soni
2. Oylik daromad (so'mda)
3. Qarzdorlik (so'mda)
4. Davomat foizi
5. Yangi lidlar (oxirgi oy)
6. Lid → o'quvchi konversiya foizi

## d) Grafiklar

- Oylik daromad — chiziqli grafik (`line_chart`), 12 oylik trend
- O'quvchilar kurs bo'yicha — donut (`donut`)
- Lidlar manba bo'yicha — ustunli grafik (`bar_chart`)
- Bo'limlarga tezkor havolalar/kartalar (har bir bo'limning 1 ta muhim raqami)

## e) O'zingga savol ber

- Agar men direktor bo'lsam, ertalab birinchi qaysi raqamga qarayman?
- Qaysi raqam "qizil chiroq" — muammoni ko'rsatadi?
- Shu sahifadan boshqa bo'limga o'tishim uchun nima kerak?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `pages/1_Qongiroq_markazi.py` namunasini o'qib chiq, `components.py` funksiyalarini ko'r.
2. **ТЗ (o'zbekcha)** — qaysi KPI va grafiklarni qo'yishni reja qil.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'gir.
4. **Qurish** — `Home.py`ni (agar koordinator bo'lsang) yoki o'z sahifangdan havola qismini yoz.
5. **Deploy** — `git push`, PR, birlashtirish.
