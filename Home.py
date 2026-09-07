"""
Umumiy / Overview — Najot Jamoaviy Dashboard bosh sahifasi.

Bu sahifa — direktor yoki bo'lim boshliqlari ertalab birinchi ochadigan
ekran: umuman ishlar qalay, qayerda muammo bor. Faqat data_source.load()
orqali ma'lumot olamiz va components.py'dagi umumiy dizayn-tizimidan
foydalanamiz — CSV ni to'g'ridan-to'g'ri o'qimaymiz, o'z uslubimizni
qo'shmaymiz (BACKEND almashtirish uchun yagona nuqta shu).

Ishga tushirish: `streamlit run Home.py`
"""

import pandas as pd
import streamlit as st

import components as c
import data_source as ds
from metrics import (
    active_students,
    attendance_rate,
    conversion_rate,
    outstanding_debt,
    revenue_by_month,
)

c.apply_page("Umumiy", "🏠")
c.page_header(
    "Umumiy ko'rinish",
    "Butun o'quv markazi bir nazarda — batafsil tahlil uchun chap menyudan bo'limni tanlang",
)

students = ds.load("students")
payments = ds.load("payments")
attendance = ds.load("attendance")
leads = ds.load("leads")
staff = ds.load("staff")

# --- KPI hisoblash -----------------------------------------------------
jami_oquvchilar = active_students(students)

rev_df = revenue_by_month(payments)
oylik_daromad = rev_df["revenue"].iloc[-1] if not rev_df.empty else 0

qarzdorlik = outstanding_debt(payments)
davomat_foizi = attendance_rate(attendance)

leads["created_date"] = pd.to_datetime(leads["created_date"])
oxirgi_oy = leads["created_date"].dt.to_period("M").max()
yangi_lidlar = (
    int((leads["created_date"].dt.to_period("M") == oxirgi_oy).sum())
    if not leads.empty
    else 0
)

konversiya = conversion_rate(leads)

c.kpi_row(
    [
        {"label": "Jami o'quvchilar", "value": f"{jami_oquvchilar:,}"},
        {"label": "Oylik daromad", "value": f"{oylik_daromad:,.0f} so'm"},
        {
            "label": "Qarzdorlik",
            "value": f"{qarzdorlik:,.0f} so'm",
            "tone": "neg" if qarzdorlik > 0 else "pos",
        },
        {
            "label": "Davomat",
            "value": f"{davomat_foizi:.1f}%",
            "tone": "pos" if davomat_foizi >= 80 else "neutral",
        },
        {"label": "Yangi lidlar (oxirgi oy)", "value": f"{yangi_lidlar:,}"},
        {
            "label": "Lid → o'quvchi konversiya",
            "value": f"{konversiya:.1f}%",
            "tone": "pos" if konversiya >= 20 else "neutral",
        },
    ]
)

# --- Oylik daromad dinamikasi -------------------------------------------
c.section("Oylik daromad dinamikasi")
c.line_chart(rev_df, x="month", y="revenue", title="Oylik daromad (so'm)")

col1, col2 = st.columns(2)
with col1:
    kurs_taqsimoti = students.groupby("course").size().reset_index(name="soni")
    c.donut(kurs_taqsimoti, names="course", values="soni", title="O'quvchilar kurs bo'yicha")
with col2:
    lid_manba = leads.groupby("source").size().reset_index(name="soni")
    c.bar_chart(lid_manba, x="source", y="soni", title="Lidlar manba bo'yicha")

# --- Bo'limlar bo'yicha tezkor holat -------------------------------------
c.section("Bo'limlar bo'yicha tezkor holat")
DEPARTMENTS = ["Qongiroq markazi", "Sotuvlar", "Marketing", "Moliya", "O'quv", "Ma'muriyat"]
faol_xodimlar = staff[staff["status"] == "active"]
bolim_soni = faol_xodimlar.groupby("department").size().reindex(DEPARTMENTS, fill_value=0)

tiles = "".join(
    f'<div class="np-tile"><div class="name">{dept}</div><div class="big">{count}</div></div>'
    for dept, count in bolim_soni.items()
)
st.markdown(f'<div class="np-tiles">{tiles}</div>', unsafe_allow_html=True)
st.caption(
    "Har bir kartada — shu bo'limdagi faol xodimlar soni. "
    "Batafsil tahlil (KPI, grafiklar, jadvallar) uchun chap menyudan tegishli bo'limni oching."
)
