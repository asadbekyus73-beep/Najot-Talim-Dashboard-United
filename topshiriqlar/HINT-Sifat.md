# HINT — Sifat / NPS

## a) Bu bo'lim nima?

Bu bo'lim to'g'ridan-to'g'ri "mamnunlik so'rovi" ma'lumotiga ega emas (bizda NPS CSV yo'q), shuning uchun sifatni **boshqa signallardan** hisoblaymiz: qo'ng'iroq ballari, davomat va dropout (tashlab ketish). Sifat boshlig'i shu proksi ko'rsatkichlar orqali "markazda ishlar qanday ketyapti" degan umumiy hissni kuzatadi.

## b) Qaysi ma'lumot

- `calls.csv` — `score` ustuni (mamnunlik proksi sifatida — yuqori ball = yaxshi muloqot)
- `attendance.csv` — davomat foizi (past davomat = past qoniqish belgisi bo'lishi mumkin)
- `students.csv` — dropout foizi (`status == 'dropped'`)
- `groups.csv` — filial (`branch`) bo'yicha guruhlash uchun

## c) KPI (4-6 ta)

1. O'rtacha qo'ng'iroq bali (sifat proksi)
2. Umumiy davomat foizi
3. Dropout foizi
4. "Ijobiy" qo'ng'iroqlar ulushi (`outcome in ['interested', 'enrolled']`)
5. "Salbiy" qo'ng'iroqlar ulushi (`outcome == 'refused'`) — shikoyat proksi

## d) Grafiklar

- Sifat ko'rsatkichi (ball) trendi vaqt bo'yicha — chiziqli grafik
- Ijobiy vs salbiy outcome taqsimoti — donut
- Filial bo'yicha sifat (davomat + ball o'rtachasi) — ustunli grafik
- Dropout trendi vaqt bo'yicha — chiziqli grafik

## e) O'zingga savol ber

- Ball past bo'lgan davrda dropout ham oshganmi — bu bog'liqlikni ko'rsatadimi?
- Qaysi filialda sifat eng past — nega bo'lishi mumkin?
- Haqiqiy NPS so'rovi bo'lmasa, qanday proksi ko'rsatkich eng ishonchli?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `calls.csv`dagi `score` va `outcome` ustunlarini, `attendance.csv` va `students.csv`ni ko'ring.
2. **ТЗ (o'zbekcha)** — sifatni qaysi 3 ta signaldan yig'ishni reja qiling.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa, `pages/9_Sifat.py`.
5. **Deploy** — `git push` → PR → birlashtirish.
