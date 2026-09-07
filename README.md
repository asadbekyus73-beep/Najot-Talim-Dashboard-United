# Najot Jamoaviy Analitik Dashboard — tezkor boshlash

**Qisqacha:** Bu — o'quv markazi uchun jamoaviy analitik dashboard loyihasi. Har biringiz `pages/` papkasidagi **o'z faylingizni** yozasiz, qolgani (dizayn, ma'lumot) tayyor.

---

## O'rnatish va ishga tushirish (3 buyruq)

```bash
pip install -r requirements.txt
python data_generator.py
streamlit run Home.py
```

1-buyruq — kerakli kutubxonalarni o'rnatadi (`streamlit`, `pandas`, `numpy`, `plotly`).
2-buyruq — sun'iy ma'lumotlarni yaratadi (`data/*.csv`), bir marta yetarli.
3-buyruq — appni ochadi, brauzerda `localhost:8501` manzilida ko'rinadi.

---

## Sizning papkangiz: `pages/…`

Siz faqat **bitta faylni** tahrirlaysiz — o'zingizga tegishli bo'limni:

```
pages/
  1_Qongiroq_markazi.py    ← tayyor namuna, o'qing (nusxa olmang)
  _TEMPLATE.py              ← SIZ shu faylni nusxalaysiz
  2_Marketing.py            ← misol: Marketing bo'limi egasi shu faylni yozadi
  ...
```

Boshqa fayllarga (`Home.py`, `components.py`, `data_source.py`, `data_generator.py`, `metrics.py`) tegmang — ular koordinator tomonidan boshqariladi.

---

## Dizayn qoidasi

**`components.py` dagi tayyor funksiyalardan foydalaning, o'zingiz CSS/rang yozmang.**

```python
import components as c

c.apply_page("Marketing", "📈")           # sahifa boshida majburiy
c.page_header("Marketing", "Kanal va CAC ko'rsatkichlari")
c.kpi_row([{"label": "Sessiyalar", "value": 12500, "tone": "pos"}])
c.section("Kanal bo'yicha lidlar")
c.bar_chart(df, x="channel", y="leads")
```

Bu — barcha sahifalar bir xil ko'rinishda bo'lishi uchun (UzGrow minimalizm uslubi). O'zingiz rang/shrift o'zgartirsangiz, sahifangiz boshqalardan farq qilib qoladi.

---

## Bitta repo, bitta deploy

Butun jamoa **bitta GitHub repo**da, **bitta** Streamlit Cloud appda ishlaydi. Har kim faqat o'z faylini o'zgartirgani uchun git konflikt bo'lmaydi. To'liq git oqimi (branch, PR, deploy) — `../JAMOA-QOIDALARI.md` faylida.

---

## Ma'lumot qayerdan keladi?

`data_source.py` — yagona joy, undan ma'lumot olinadi:

```python
import data_source as ds
students = ds.load("students")
```

Hech qachon CSV'ni to'g'ridan-to'g'ri o'qimang (`pd.read_csv("data/students.csv")` — NOTO'G'RI). Faqat `ds.load(...)` orqali — shunda ertaga real ma'lumotga o'tganda sizning kodingiz o'zgarmaydi.

---

## Yordam

`topshiriqlar/HINT-<bolim>.md` faylingizni o'qing — u yerda qaysi KPI, qaysi ustunlar, qaysi grafiklar kerakligi yozilgan.
