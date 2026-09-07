# BAZAVIY TZ — Jamoaviy Analitik Dashboard (Najot O'quv Markazi)

Bu — barcha bo'lim egalari uchun **umumiy skelet**. O'zingning HINT faylingni o'qib, shu skeletni o'z bo'limingga moslab to'ldirasan (o'zingning `~/Desktop/md/` yoki loyihangdagi ТЗ faylida). Bu fayl — namuna, tayyor javob emas.

## 1. Repo tuzilishi (kim qayerni tegadi)

```
starter-repo/
  Home.py                  # Umumiy ko'rinish — FAQAT koordinator tegadi
  data_source.py           # ma'lumot yuklash nuqtasi — FAQAT koordinator tegadi
  data_generator.py        # sun'iy ma'lumot generatori — FAQAT koordinator tegadi
  metrics.py               # umumiy metrika funksiyalari — FAQAT koordinator tegadi
  components.py            # dizayn tizimi (kartalar, grafiklar) — FAQAT koordinator tegadi
  data/                    # generatsiya qilingan CSV fayllar — o'qish uchun, tahrirlama
  pages/
    1_Qongiroq_markazi.py  # tayyor namuna sahifa — o'qib o'rgan
    _TEMPLATE.py           # SENING boshlang'ich nuqtang — buni nusxalab, o'z faylingga aylantir
    N_<SenBolim>.py        # <<< FAQAT SHU FAYLNI YOZASAN
```

**Oltin qoida:** sen faqat `pages/` ichidagi bitta faylni yaratasan va tahrirlaysan. Boshqa hech qanday faylni o'zgartirmaysan — aks holda jamoadoshlaring bilan git-konflikt bo'ladi.

## 2. Ma'lumot kontrakti (qisqacha)

Barcha ma'lumot `data/` papkasidagi CSV fayllarda: `students, groups, teachers, attendance, payments, leads, calls, traffic, staff, expenses`.

Ma'lumotni **hech qachon** to'g'ridan-to'g'ri CSV'dan o'qima. Faqat shunday:

```python
import data_source as ds
students = ds.load("students")
payments = ds.load("payments")
```

Nega shunday? Ertaga Najot'ning haqiqiy ma'lumoti ulanganda, `data_source.py` ichidagi bitta funksiya almashtiriladi — sening sahifang bir qatorini ham o'zgartirmaydi. Bu — "swap point" (almashtirish nuqtasi) deb ataladi.

O'z bo'limingga tegishli CSV va ustunlar ro'yxatini **o'zingning HINT faylingdan** ol (`HINT-<bo'lim>.md`, bo'lim (b) qismi).

## 3. Dizayn qoidasi — bitta qoida, lekin muhim

**`components.py`dan foydalan. Qayta bo'yama.**

Har bir sahifa boshida:

```python
import components as c
c.apply_page("Bo'lim nomi", "📊")   # ikonka — mos emojini tanla
c.page_header("Bo'lim nomi", "Qisqa tavsif")
```

KPI ko'rsatish uchun:

```python
c.kpi_row([
    {"label": "Faol o'quvchilar", "value": "312", "delta": "+12", "tone": "pos"},
    {"label": "Qarzdorlik", "value": "4 200 000 so'm", "tone": "neg"},
])
```

Grafik uchun `c.line_chart(...)`, `c.bar_chart(...)`, `c.donut(...)`, `c.area_chart(...)` — bularning barchasi UzGrow yashil palitrasida, bir xil shriftda chizadi. O'zing rang, shrift, CSS yozma — hammasi `components.py` ichida tayyor. Sening vazifang — faqat to'g'ri ma'lumotni to'g'ri joyga qo'yish.

## 4. Sahifa shakli (har doim shunday)

```python
import streamlit as st
import data_source as ds
import components as c
from metrics import ...   # kerakli umumiy funksiyalarni ol

c.apply_page("Bo'lim nomi", "📊")
c.page_header("Bo'lim nomi", "Qisqa tavsif")

students = ds.load("students")
# ... o'z bo'limingga kerakli CSV'larni yukla

# metrikalarni hisobla (ba'zilari metrics.py'da tayyor, ba'zilarini o'zing yozasan)

c.kpi_row([...])          # 4-6 ta KPI
c.section("Grafik nomi")
c.bar_chart(...)          # yoki line_chart / donut / area_chart

c.section("Jadval")       # ixtiyoriy
c.data_table(...)
```

Sahifa ≤120 qator bo'lsin, o'qish oson bo'lsin, murakkab joylarni o'zbekcha izohla.

## 5. Ishlash tartibi

1. **Razvedka** — o'z bo'liming HINT faylini o'qi, real bo'lim boshlig'i nimani kuzatishini tushun.
2. **ТЗ (o'zbekcha)** — o'zingga qisqa reja yoz: qaysi KPI, qaysi grafik, qaysi CSV.
3. **Tarjima (inglizcha)** — shu rejani ingliz tiliga o'gir (Claude'ga shu tilda topshiriq berish arzonroq va aniqroq ishlaydi).
4. **Qurish** — `pages/N_<Bolim>.py` faylini yoz, `components.py`dan foydalanib.
5. **Deploy** — `git push`, PR och, koordinator birlashtiradi, umumiy ilovada ko'rinadi.

Batafsili — `JAMOA-QOIDALARI.md` faylida.
