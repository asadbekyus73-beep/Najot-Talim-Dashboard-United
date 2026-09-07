# HINT — O'quv jarayoni (Education)

## a) Bu bo'lim nima?

Bu bo'lim guruhlar va o'qituvchilar bilan bog'liq: qaysi guruh faol, o'quvchilar darslarga qatnashyaptimi (davomat), o'qituvchilar qanday baholanadi, guruhlar to'lganmi yoki bo'shmi. O'quv jarayoni boshlig'i shu orqali sifatni kuzatadi.

## b) Qaysi ma'lumot

- `groups.csv` — `group_id, name, course, teacher_id, branch, schedule, capacity, start_date, status`
- `teachers.csv` — `teacher_id, full_name, direction, hired_date, rating`
- `attendance.csv` — `attendance_id, student_id, group_id, date, status`
- `students.csv` — dropout (`status == 'dropped'`) hisoblash uchun

## c) KPI (4-6 ta)

1. Faol guruhlar soni (`status == 'active'`)
2. Umumiy davomat foizi (`metrics.attendance_rate`)
3. O'qituvchilar o'rtacha reytingi
4. Dropout (tashlab ketish) foizi
5. Guruhlar to'lish darajasi (o'rtacha o'quvchi/sig'im nisbati)

## d) Grafiklar

- Guruhlar holati (active/forming/finished) — donut
- Guruh bo'yicha davomat foizi — ustunli grafik
- O'qituvchilar yuklamasi (nechta guruh) va reytingi — ustunli grafik
- Dropout trendi vaqt bo'yicha — chiziqli grafik

## e) O'zingga savol ber

- Qaysi guruhda davomat eng past — sababi nima bo'lishi mumkin?
- Qaysi o'qituvchida eng ko'p guruh bor — bu yaxshimi yomonmi?
- Dropout ko'p bo'lgan kurslar bormi?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `groups.csv` va `attendance.csv`ning `group_id` orqali qanday bog'lanishini tushuning.
2. **ТЗ (o'zbekcha)** — KPI, grafik, CSV rejasini yozing.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa, `pages/6_Oquv_jarayoni.py`.
5. **Deploy** — `git push` → PR → birlashtirish.
