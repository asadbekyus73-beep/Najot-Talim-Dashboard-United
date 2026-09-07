"""
NUSXA OL VA O'ZGARTIR — bu sizning bo'lim sahifangiz uchun boshlang'ich shablon.

QANDAY ISHLATISH:
1. Bu faylni nusxalang: pages/N_Bolim_nomi.py (masalan: pages/3_Marketing.py)
2. Pastdagi TODO larni o'z bo'limingiz uchun to'ldiring.
3. topshiriqlar/HINT-<bolim>.md faylini o'qing — u yerda qaysi CSV/ustunlardan
   foydalanish, qaysi KPI larni chiqarish kerakligi yozilgan.
4. Faqat SHU faylni tahrirlang. Boshqa fayllarga (Home.py, components.py,
   metrics.py, data_source.py) tegmang — ular umumiy va boshqa jamoadoshlar
   bilan konflikt keltirib chiqaradi.
"""

import streamlit as st

import components as c
import data_source as ds

# TODO 1: sahifani sozlang — o'z bo'limingiz nomi va emoji-ikonkasini yozing
c.apply_page("Bo'lim nomi", "📊")
c.page_header("Bo'lim nomi", "Qisqa tavsif — bu bo'lim nimani ko'rsatadi")

# TODO 2: kerakli ma'lumotlarni yuklang. FAQAT ds.load(...) orqali —
# CSV ni to'g'ridan-to'g'ri o'qimang! Qaysi fayl(lar) kerakligini
# HINT faylidan qarang. Masalan:
# students = ds.load("students")
# payments = ds.load("payments")

# TODO 3: o'z bo'limingiz uchun ko'rsatkichlarni hisoblang.
# Umumiy formulalar metrics.py da bor (active_students, attendance_rate,
# revenue_by_month, conversion_rate va h.k.) — import qilib ishlatsangiz bo'ladi.
# Bo'limga xos hisob-kitobni shu yerda o'zingiz yozasiz (pandas bilan).
#
# misol:
# jami_odam = len(students)

# TODO 4: 4-6 ta KPI ni kartalar qatorida ko'rsating
# c.kpi_row([
#     {"label": "KPI nomi", "value": "123", "tone": "pos"},
#     ...
# ])

# TODO 5: grafiklarni chizing (c.line_chart / c.bar_chart / c.donut / c.area_chart)
# c.section("Bo'lim nomi bo'yicha dinamika")
# c.line_chart(df, x="sana", y="qiymat", title="...")

# TODO 6 (ixtiyoriy): jadval chiqaring
# c.section("Batafsil ro'yxat")
# c.data_table(df)

st.info("Bu shablon. TODO larni to'ldirib, o'z bo'limingizni quring.")
