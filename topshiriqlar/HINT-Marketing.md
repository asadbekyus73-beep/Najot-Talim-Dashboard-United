# HINT — Marketing

## a) Bu bo'lim nima?

Marketing bo'limi turli kanallar (Instagram, Telegram, Google va h.k.) orqali odamlarni jalb qiladi va lid (potentsial mijoz) sifatida beradi. Marketing boshlig'i har bir kanalga qancha pul sarflanayotgani va shundan qancha foyda kelayotganini kuzatadi.

## b) Qaysi ma'lumot

- `traffic.csv` — `date, channel, sessions, unique_visitors, leads_generated, cost`
- `leads.csv` — `lead_id, full_name, phone, source, interest_course, branch, assigned_to, created_date, status` (kanal samaradorligini `leads.csv`dagi haqiqiy natija bilan solishtirish uchun)

## c) KPI (4-6 ta)

1. Jami sessiyalar (sessions)
2. Jami lidlar (leads_generated)
3. CAC — bitta lidga sarflangan xarajat (`metrics.cac(traffic, leads)`)
4. Eng samarali kanal (eng arzon CAC)
5. Umumiy marketing xarajati

## d) Grafiklar

- Trafik kanal bo'yicha — ustunli grafik (`bar_chart`)
- Lidlar kanal bo'yicha — donut yoki ustunli grafik
- Xarajat vs lidlar — ikkita ustun yoki scatter o'rniga oddiy `bar_chart` (xarajat va lidlarni yonma-yon ko'rsating)
- CAC trendi vaqt bo'yicha — chiziqli grafik

## e) O'zingga savol ber

- Qaysi kanal eng ko'p lid beradi, lekin qaysi kanal eng arzon lid beradi — ular bir xilmi?
- Organik (bepul) kanallar qancha ulush tashkil qiladi?
- CAC oshib ketayotgan bo'lsa, bu nimani anglatadi?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `pages/1_Qongiroq_markazi.py` namunasini va `HINT-Umumiy.md`ni o'qing, `components.py` funksiyalarini ko'ring.
2. **ТЗ (o'zbekcha)** — o'zingizga: qaysi KPI, qaysi grafik, qaysi CSV kerakligini yozib qo'ying.
3. **Tarjima (inglizcha)** — shu rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa oling, `pages/3_Marketing.py` deb nomlang, to'ldiring.
5. **Deploy** — `git push` → PR → koordinator birlashtiradi.
