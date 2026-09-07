# HINT — Xodimlar / HR

## a) Bu bo'lim nima?

HR bo'limi barcha xodimlar (operator, sotuvchi, o'qituvchi, admin, marketolog, menejer) haqidagi ma'lumotni kuzatadi: nechta xodim bor, ular qaysi bo'limda ishlaydi, ish haqi qancha, kim ishdan ketgan. HR boshlig'i shu orqali jamoa hajmini va xarajatini boshqaradi.

## b) Qaysi ma'lumot

- `staff.csv` — `staff_id, full_name, role, department, hired_date, salary, status`

## c) KPI (4-6 ta)

1. Jami xodimlar soni
2. Faol xodimlar (`status == 'active'`)
3. Jami oylik ish haqi fondi (`sum(salary)` faol xodimlar bo'yicha)
4. Ishdan ketganlar soni (`status == 'left'`)
5. O'rtacha ish haqi

## d) Grafiklar

- Bo'lim (department) bo'yicha xodimlar soni — ustunli grafik
- Rol (role) bo'yicha xodimlar soni — donut
- Ish haqi taqsimoti (histogram o'rniga `bar_chart` — rol bo'yicha o'rtacha ish haqi)
- Ishga olish trendi (`hired_date` bo'yicha oylik) — chiziqli grafik

## e) O'zingga savol ber

- Qaysi bo'limda eng ko'p xodim ishlaydi — bu markaz strategiyasiga mos keladimi?
- Ishdan ketganlar ko'p bo'lsa, bu qaysi rolda ko'proq uchraydi?
- Ish haqi fondi oshib boryaptimi — bu o'sish bilan mutanosibmi?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `staff.csv`dagi `role` va `department` ustunlarining barcha qiymatlarini ko'ring.
2. **ТЗ (o'zbekcha)** — KPI, grafik, CSV rejasini yozing.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa, `pages/8_Xodimlar.py`.
5. **Deploy** — `git push` → PR → birlashtirish.
