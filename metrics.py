"""Shared pure metric helpers. All take DataFrame(s) loaded via data_source.load()
and return numbers or DataFrames. Department pages add their own on top of these."""
import pandas as pd


def active_students(students: pd.DataFrame) -> int:
    return int((students["status"] == "active").sum())


def attendance_rate(attendance: pd.DataFrame) -> float:
    if attendance.empty:
        return 0.0
    present = attendance["status"].isin(["present", "late"]).sum()
    return round(100 * present / len(attendance), 1)


def revenue_by_month(payments: pd.DataFrame) -> pd.DataFrame:
    paid = payments[payments["status"] == "paid"].copy()
    out = (
        paid.groupby("month_for")["amount"]
        .sum()
        .reset_index()
        .sort_values("month_for")
    )
    out.columns = ["month", "revenue"]
    return out


def total_revenue(payments: pd.DataFrame) -> float:
    return float(payments.loc[payments["status"] == "paid", "amount"].sum())


def outstanding_debt(payments: pd.DataFrame) -> float:
    return float(payments.loc[payments["status"] != "paid", "amount"].sum())


def lead_funnel(leads: pd.DataFrame) -> pd.DataFrame:
    order = ["new", "contacted", "trial", "enrolled", "lost"]
    counts = leads["status"].value_counts().reindex(order, fill_value=0)
    return counts.rename_axis("status").reset_index(name="count")


def conversion_rate(leads: pd.DataFrame) -> float:
    if leads.empty:
        return 0.0
    enrolled = (leads["status"] == "enrolled").sum()
    return round(100 * enrolled / len(leads), 1)


def call_score_avg(calls: pd.DataFrame) -> float:
    if calls.empty:
        return 0.0
    return round(calls["score"].mean(), 1)


def leads_by_channel(source_df: pd.DataFrame) -> pd.DataFrame:
    """Works with either traffic.csv (channel, leads_generated) or leads.csv (source)."""
    if "channel" in source_df.columns and "leads_generated" in source_df.columns:
        out = source_df.groupby("channel")["leads_generated"].sum().reset_index()
        out.columns = ["channel", "leads"]
        return out.sort_values("leads", ascending=False)
    out = source_df.groupby("source").size().reset_index(name="leads")
    out.columns = ["channel", "leads"]
    return out.sort_values("leads", ascending=False)


def cac(traffic: pd.DataFrame, leads: pd.DataFrame) -> float:
    total_cost = float(traffic["cost"].sum())
    total_leads = len(leads)
    if total_leads == 0:
        return 0.0
    return round(total_cost / total_leads, 0)


def pnl(payments: pd.DataFrame, expenses: pd.DataFrame) -> pd.DataFrame:
    rev = revenue_by_month(payments).rename(columns={"revenue": "revenue"})
    exp = expenses.copy()
    exp["month"] = pd.to_datetime(exp["date"]).dt.strftime("%Y-%m")
    exp_by_month = exp.groupby("month")["amount"].sum().reset_index()
    exp_by_month.columns = ["month", "expenses"]
    out = pd.merge(rev, exp_by_month, on="month", how="outer").fillna(0)
    out = out.sort_values("month")
    out["profit"] = out["revenue"] - out["expenses"]
    return out.reset_index(drop=True)
