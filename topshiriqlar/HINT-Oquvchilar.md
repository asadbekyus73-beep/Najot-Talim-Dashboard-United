# HINT — O'quvchilar / CRM

## a) Bu bo'lim nima?

Bu bo'lim o'quvchi bazasining o'zini ko'rsatadi: nechta o'quvchi bor, ular qaysi holatda (faol, bitirgan, tashlab ketgan, muzlatilgan), qaysi kurs va filialda. CRM boshlig'i shu orqali bazani "sog'lom" saqlaydi va xavf ostidagilarni ko'radi.

## b) Qaysi ma'lumot

- `students.csv` — `student_id, full_name, phone, group_id, course, branch, source, enrolled_date, status`

## c) KPI (4-6 ta)

1. Jami o'quvchilar
2. Faol o'quvchilar (`status == 'active'`)
3. Bitirganlar (`status == 'graduated'`)
4. Tashlab ketganlar / muzlatilganlar (`status in ['dropped', 'frozen']`)
5. Yangi o'quvchilar (oxirgi oyda `enrolled_date` bo'yicha)

## d) Grafiklar

- Holat bo'yicha taqsimot (active/graduated/dropped/frozen) — donut
- Filial bo'yicha o'quvchilar soni — ustunli grafik
- Manba bo'yicha o'quvchilar (`source`) — ustunli grafik
- Yangi o'quvchilar trendi oy bo'yicha — chiziqli grafik

## e) Jadval (qo'shimcha)

"Xavf ostidagilar ro'yxati" — `status in ['dropped', 'frozen']` bo'lgan o'quvchilar jadvali (`data_table`), aloqa uchun.

## f) O'zingga savol ber

- Qaysi manbadan kelgan o'quvchilar eng ko'p tashlab ketadi?
- Qaysi filialda o'quvchilar bazasi eng tez o'sayapti?
- "Muzlatilgan" o'quvchilar bilan nima qilish kerak — ular qaytishi mumkinmi?

## g) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## Ishlash tartibi

1. **Razvedka** — `students.csv`dagi `status` ustunining barcha qiymatlarini ko'ring.
2. **ТЗ (o'zbekcha)** — KPI, grafik, CSV rejasini yozing.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa, `pages/7_Oquvchilar.py`.
5. **Deploy** — `git push` → PR → birlashtirish.
