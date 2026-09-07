# HINT — Moliya (Finance)

## a) Bu bo'lim nima?

Moliya bo'limi pul harakatini kuzatadi: kim to'lagan, kim to'lamagan (qarzdor), qancha xarajat qilinyapti, oxir-oqibat markaz foyda ko'ryaptimi yoki zararmi. Moliya boshlig'i uchun eng muhim narsa — qarzdorlik va sof foyda.

## b) Qaysi ma'lumot

- `payments.csv` — `payment_id, student_id, group_id, amount, due_date, paid_date, method, status, month_for`
- `expenses.csv` — `expense_id, date, category, amount, note`

## c) KPI (4-6 ta)

1. Oylik daromad (`metrics.revenue_by_month`)
2. Jami daromad (`metrics.total_revenue`)
3. Qarzdorlik (`metrics.outstanding_debt`) — `status != 'paid'` yig'indisi
4. Jami xarajat
5. Sof foyda (P&L: daromad − xarajat, `metrics.pnl`)
6. To'lov usuli bo'yicha ulush (naqd vs karta vs o'tkazma)

## d) Grafiklar

- Oylik daromad — chiziqli grafik
- Xarajatlar kategoriya bo'yicha — donut
- Qarzdor o'quvchilar jadvali — `data_table` (muddati o'tgan to'lovlar, `status == 'overdue'`)
- Naqd vs karta vs o'tkazma — ustunli yoki donut grafik

## e) O'zingga savol ber

- Qarzdorlik oshib ketsa, markaz uchun bu nimani anglatadi?
- Qaysi xarajat kategoriyasi eng katta ulushni egallaydi — bu normalmi?
- Sof foyda manfiy bo'lsa, keyingi qadam nima bo'lishi kerak?

## f) Claude bilan ishlash qoidasi

Kod yozishdan oldin menga bu bo'lim nima uchun kerakligini tushuntir, qaysi ko'rsatkichlar muhimligini so'ra, va har qadamda nega shunday qilayotganingni ayt. Meni jarayonga jalb qil, o'rnimga ko'r-ko'rona qurma.

## g) Ishlash tartibi

1. **Razvedka** — `metrics.py`dagi `revenue_by_month`, `outstanding_debt`, `pnl` funksiyalarini oching, nima qaytarishini tushuning.
2. **ТЗ (o'zbekcha)** — KPI, grafik, CSV rejasini yozing.
3. **Tarjima (inglizcha)** — rejani ingliz tiliga o'giring.
4. **Qurish** — `_TEMPLATE.py`dan nusxa, `pages/5_Moliya.py`.
5. **Deploy** — `git push` → PR → birlashtirish.
