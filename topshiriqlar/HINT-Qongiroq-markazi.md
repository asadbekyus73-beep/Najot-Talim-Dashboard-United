# HINT — Qo'ng'iroq markazi (Call-markaz)

> Bu bo'lim uchun sahifa **tayyor namuna** sifatida qurilgan: `pages/1_Qongiroq_markazi.py`. Sen alohida qurmaysan — lekin bu HINT senga o'sha kodni o'qib tushunish va boshqa bo'lim uchun namuna sifatida ishlatish uchun kerak.

## a) Bu bo'lim nima?

Operatorlar lidlarga (potentsial o'quvchilarga) qo'ng'iroq qiladi: qiziqtiradi, savollariga javob beradi, ro'yxatdan o'tkazishga harakat qiladi. Call-markaz boshlig'i har kuni operatorlar qancha qo'ng'iroq qilganini, sifati qanday ekanini, kim yaxshi ishlayotganini kuzatadi.

## b) Qaysi ma'lumot

- `calls.csv` — `call_id, lead_id, operator, date, direction, duration_sec, outcome, score, stage`
- `leads.csv` — qo'ng'iroq qilinayotgan lidlar konteksti uchun (`status`)

## c) KPI (4-6 ta)

1. Jami qo'ng'iroqlar soni
2. O'rtacha ball (score)
3. O'rtacha davomiylik (soniyadan daqiqaga)
4. Lid → enroll konversiya (`outcome == 'enrolled'` ulushi)
5. Javob berilmagan foizi (`outcome == 'no_answer'`)

## d) Grafiklar

- Qo'ng'iroqlar/kun — chiziqli grafik
- Outcome (natija) taqsimoti — donut
- Operator leaderboard — ustunli grafik (o'rtacha ball + soni)
- Ball trendi vaqt bo'yicha — chiziqli grafik

## e) O'zingga savol ber

- Qaysi operator eng ko'p "enrolled" natija olgan?
- Ball past bo'lgan kunlar bilan nima sodir bo'lgan?
- "no_answer" ko'p bo'lsa, bu qaysi muammoni bildiradi (vaqt tanlovi? lid sifati?)

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — tayyor `pages/1_Qongiroq_markazi.py` faylini oching va har bir qatorni tushunguncha o'qing.
2. **ТЗ (o'zbekcha)** — nima uchun har bir KPI shunday hisoblanganini o'zingizga yozib chiqing.
3. **Tarjima (inglizcha)** — tushunganingizni ingliz tilida qisqa xulosa qilib yozing (bu keyingi bo'limlarga o'tishda foydali bo'ladi).
4. **Qurish** — boshqa bo'lim qurayotganingizda shu sahifani naqsh (pattern) sifatida ishlating.
5. **Deploy** — o'zgartirish kiritmaysiz, faqat o'rganasiz.
