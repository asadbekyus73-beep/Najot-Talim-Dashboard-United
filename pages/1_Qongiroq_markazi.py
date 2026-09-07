"""
Qo'ng'iroq markazi (Call-markaz) — bo'lim sahifasi.
Bu FULLY qurilgan REFERENCE sahifa — boshqa bo'limlarni quradigan
o'quvchilar shu sahifadan namuna oladi. Faqat data_source.load() orqali
ma'lumot olamiz — CSV ni to'g'ridan-to'g'ri o'qimaymiz (BACKEND almashtirish
uchun yagona nuqta shu).
"""

import pandas as pd
import streamlit as st

import components as c
import data_source as ds
from metrics import call_score_avg, conversion_rate

c.apply_page("Qo'ng'iroq markazi", "📞")
c.page_header(
    "Qo'ng'iroq markazi",
    "Operatorlar samaradorligi, qo'ng'iroqlar sifati va lidlar konversiyasi",
)

calls = ds.load("calls")
leads = ds.load("leads")

# --- KPI hisoblash ---------------------------------------------------
jami_qongiroqlar = len(calls)
ortacha_ball = call_score_avg(calls)
ortacha_davomiylik_sek = calls["duration_sec"].mean() if jami_qongiroqlar else 0
ortacha_davomiylik_daq = ortacha_davomiylik_sek / 60

# lid -> enroll konversiya: umumiy lidlar bazasidagi konversiya
lid_enroll_konversiya = conversion_rate(leads)

javob_berilmagan_pct = (
    (calls["outcome"] == "no_answer").mean() * 100 if jami_qongiroqlar else 0
)

c.kpi_row(
    [
        {"label": "Jami qo'ng'iroqlar", "value": f"{jami_qongiroqlar:,}"},
        {"label": "O'rtacha ball", "value": f"{ortacha_ball:.1f}", "tone": "pos" if ortacha_ball >= 60 else "neg"},
        {"label": "O'rtacha davomiylik", "value": f"{ortacha_davomiylik_daq:.1f} daq"},
        {"label": "Lid → enroll konversiya", "value": f"{lid_enroll_konversiya:.1f}%", "tone": "pos"},
        {"label": "Javob berilmagan", "value": f"{javob_berilmagan_pct:.1f}%", "tone": "neg" if javob_berilmagan_pct > 15 else "neutral"},
    ]
)

# --- Kunlik qo'ng'iroqlar dinamikasi ----------------------------------
c.section("Qo'ng'iroqlar dinamikasi")
calls["date"] = pd.to_datetime(calls["date"])
kunlik = calls.groupby(calls["date"].dt.date).size().reset_index(name="soni")
kunlik.columns = ["sana", "soni"]
c.line_chart(kunlik, x="sana", y="soni", title="Kuniga qo'ng'iroqlar soni")

col1, col2 = st.columns(2)
with col1:
    outcome_taqsimoti = calls["outcome"].value_counts().reset_index()
    outcome_taqsimoti.columns = ["natija", "soni"]
    c.donut(outcome_taqsimoti, names="natija", values="soni", title="Natijalar bo'yicha taqsimot")
with col2:
    ball_trendi = calls.groupby(calls["date"].dt.date)["score"].mean().reset_index()
    ball_trendi.columns = ["sana", "ortacha_ball"]
    c.line_chart(ball_trendi, x="sana", y="ortacha_ball", title="O'rtacha ball trendi")

# --- Operatorlar reytingi ---------------------------------------------
c.section("Operatorlar reytingi")
operator_stat = (
    calls.groupby("operator")
    .agg(ortacha_ball=("score", "mean"), qongiroqlar_soni=("call_id", "count"))
    .reset_index()
    .sort_values("ortacha_ball", ascending=False)
)
c.bar_chart(operator_stat, x="operator", y="ortacha_ball", title="Operator bo'yicha o'rtacha ball")
c.bar_chart(operator_stat, x="operator", y="qongiroqlar_soni", title="Operator bo'yicha qo'ng'iroqlar soni")

# --- So'nggi qo'ng'iroqlar jadvali -------------------------------------
c.section("So'nggi qo'ng'iroqlar")
songgi = calls.sort_values("date", ascending=False).head(30).copy()


def _ball_tone(ball: float) -> str:
    if ball >= 70:
        return "pos"
    if ball >= 40:
        return "neutral"
    return "neg"


songgi["holat"] = songgi["score"].apply(
    lambda b: c.status_pill(f"{b:.0f}", _ball_tone(b))
)
c.data_table(
    songgi[["date", "operator", "direction", "duration_sec", "outcome", "stage", "holat"]]
)
