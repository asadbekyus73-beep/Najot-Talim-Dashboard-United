"""Deterministic synthetic-data generator for the Najot Ta'lim jamoaviy dashboard.

Writes every CSV listed in the data contract (section 2 of _TZ-EN.md) into data/.
SEED = 42 -> same output for every student who runs this. All entities are
internally consistent: payments/attendance point at real students+groups,
calls point at real leads, traffic volume roughly matches leads.csv counts.

Run: python data_generator.py
"""
import pathlib

import numpy as np
import pandas as pd

SEED = 42
rng = np.random.default_rng(SEED)

DATA_DIR = pathlib.Path(__file__).parent / "data"
START_DATE = pd.Timestamp("2025-09-01")
END_DATE = pd.Timestamp("2026-08-31")
MONTHS = pd.date_range(START_DATE, END_DATE, freq="MS")  # 12 month starts

# ---------------------------------------------------------------- reference lists
COURSES = ["Frontend", "Backend", "Data Science", "AI Asoslari", "Grafik Dizayn", "SMM", "Ingliz tili"]
COURSE_ABBR = {"Frontend": "FE", "Backend": "BE", "Data Science": "DS", "AI Asoslari": "AI",
               "Grafik Dizayn": "GD", "SMM": "SMM", "Ingliz tili": "ENG"}
COURSE_DURATION_MONTHS = {"Frontend": 6, "Backend": 6, "Data Science": 8, "AI Asoslari": 5,
                           "Grafik Dizayn": 5, "SMM": 4, "Ingliz tili": 7}
COURSE_PRICE_RANGE = {  # so'm / month, grounded in section 7 (770k - 2.1M)
    "Frontend": (900_000, 1_600_000),
    "Backend": (950_000, 1_700_000),
    "Data Science": (1_200_000, 2_100_000),
    "AI Asoslari": (1_100_000, 1_900_000),
    "Grafik Dizayn": (800_000, 1_400_000),
    "SMM": (770_000, 1_200_000),
    "Ingliz tili": (770_000, 1_100_000),
}
BRANCHES = ["Chilonzor", "Yunusobod", "Sergeli"]
BRANCH_ABBR = {"Chilonzor": "CHIL", "Yunusobod": "YUN", "Sergeli": "SER"}
SOURCES = ["instagram", "telegram", "referral", "hh", "walk_in", "facebook", "google"]
TRAFFIC_CHANNELS = ["instagram", "telegram", "google", "facebook", "referral", "organic"]
STUDENT_STATUSES = ["active", "graduated", "dropped", "frozen"]

FIRST_NAMES_M = ["Abdulloh", "Sardor", "Jasur", "Botir", "Sherzod", "Otabek", "Islom", "Farrux",
                  "Bekzod", "Davron", "Aziz", "Shoxrux", "Ulug'bek", "Bobur", "Anvar", "Rustam",
                  "Jamshid", "Akmal", "Nodir", "Xurshid", "Sanjar", "Diyor", "Sirojiddin",
                  "Muhammadali", "Elyor", "Ravshan", "Zafar", "Alisher", "Umid", "Shuhrat"]
FIRST_NAMES_F = ["Malika", "Nilufar", "Zarina", "Dilnoza", "Gulnora", "Feruza", "Sevara", "Madina",
                  "Shahnoza", "Kamola", "Nigora", "Zebo", "Munisa", "Lola", "Yulduz", "Gulchehra",
                  "Diyora", "Sabina", "Iroda", "Nozima", "Mehriniso", "Sitora", "Barno",
                  "Gulbahor", "Nargiza", "Aziza", "Shirin", "Ozoda", "Umida", "Rayhona"]
LAST_STEMS = ["Karim", "Yusup", "Rashid", "Toshpulat", "Nazar", "Rustam", "Ergash", "Xolmat",
              "Sattor", "Abdulla", "Yoqub", "Islom", "Qodir", "Mirza", "Tursun", "Abdurahmon",
              "Ibrohim", "Xudoyberdi", "Said", "Jo'ra", "Ahmad", "Umar", "Bolta", "Nishon",
              "G'ani", "Sobir", "Tojiboy", "Hasan", "Hoshim", "Yusuf", "Sharip", "Norqul"]
UZ_MOBILE_PREFIXES = ["90", "91", "93", "94", "95", "97", "98", "99", "33", "55", "77", "88"]


def random_name():
    gender = rng.choice(["M", "F"])
    first = rng.choice(FIRST_NAMES_M if gender == "M" else FIRST_NAMES_F)
    suffix = "ov" if gender == "M" else "ova"
    last = rng.choice(LAST_STEMS) + suffix
    return f"{first} {last}"


def random_phone():
    prefix = rng.choice(UZ_MOBILE_PREFIXES)
    number = rng.integers(1_000_000, 9_999_999)
    return f"+998{prefix}{number}"


def random_date_in(start: pd.Timestamp, end: pd.Timestamp) -> pd.Timestamp:
    if end <= start:
        return start
    days = (end - start).days
    return start + pd.Timedelta(days=int(rng.integers(0, days + 1)))


def seasonal_month_weights(n_months: int) -> np.ndarray:
    """September/January enrollment peaks, summer dip, slow overall growth."""
    seasonal = {9: 1.3, 10: 1.0, 11: 0.95, 12: 1.05, 1: 1.4, 2: 1.1, 3: 1.0,
                4: 0.9, 5: 0.85, 6: 0.7, 7: 0.6, 8: 0.75}
    weights = np.array([seasonal[m.month] * (1 + 0.02 * i) for i, m in enumerate(MONTHS[:n_months])])
    return weights / weights.sum()


def counts_per_month(total: int) -> list[int]:
    probs = seasonal_month_weights(len(MONTHS))
    return rng.multinomial(total, probs).tolist()


# ---------------------------------------------------------------- teachers
def gen_teachers(n=15) -> pd.DataFrame:
    rows = []
    for i in range(1, n + 1):
        direction = COURSES[(i - 1) % len(COURSES)]
        hired_date = random_date_in(pd.Timestamp("2022-01-01"), pd.Timestamp("2026-05-01"))
        rows.append({
            "teacher_id": f"T{i:03d}",
            "full_name": random_name(),
            "direction": direction,
            "hired_date": hired_date.date().isoformat(),
            "rating": round(float(rng.uniform(3.5, 5.0)), 1),
        })
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- groups
def gen_groups(teachers: pd.DataFrame, n=30) -> pd.DataFrame:
    rows = []
    counters = {}
    for i in range(1, n + 1):
        course = COURSES[(i - 1) % len(COURSES)]
        branch = rng.choice(BRANCHES)
        schedule = rng.choice(["standard", "bootcamp"], p=[0.8, 0.2])
        status_roll = rng.random()
        if status_roll < 0.30:
            status = "finished"
            start_date = random_date_in(START_DATE, END_DATE - pd.Timedelta(days=150))
        elif status_roll < 0.85:
            status = "active"
            start_date = random_date_in(END_DATE - pd.Timedelta(days=150), END_DATE - pd.Timedelta(days=20))
        else:
            status = "forming"
            start_date = random_date_in(END_DATE - pd.Timedelta(days=10), END_DATE + pd.Timedelta(days=20))

        candidate_teachers = teachers.loc[teachers["direction"] == course, "teacher_id"]
        teacher_id = rng.choice(candidate_teachers) if len(candidate_teachers) else rng.choice(teachers["teacher_id"])

        key = f"{COURSE_ABBR[course]}-{BRANCH_ABBR[branch]}"
        counters[key] = counters.get(key, 0) + 1
        name = f"{key}-{counters[key]:02d}"

        rows.append({
            "group_id": f"G{i:03d}",
            "name": name,
            "course": course,
            "teacher_id": teacher_id,
            "branch": branch,
            "schedule": schedule,
            "capacity": int(rng.integers(10, 19)),
            "start_date": start_date.date().isoformat(),
            "status": status,
        })
    return pd.DataFrame(rows)


def group_duration_days(course: str, schedule: str) -> int:
    months = COURSE_DURATION_MONTHS[course]
    if schedule == "bootcamp":
        months = max(2, months // 2)
    return months * 30


# ---------------------------------------------------------------- students
def gen_students(groups: pd.DataFrame, n=300) -> pd.DataFrame:
    rows = []
    groups = groups.copy()
    groups["start_ts"] = pd.to_datetime(groups["start_date"])
    groups["end_ts"] = groups.apply(
        lambda r: r["start_ts"] + pd.Timedelta(days=group_duration_days(r["course"], r["schedule"])), axis=1
    )
    # weight groups so smaller/newer groups get fewer students, capacity respected loosely
    group_weights = groups["capacity"] / groups["capacity"].sum()

    for i in range(1, n + 1):
        g = groups.iloc[rng.choice(len(groups), p=group_weights)]
        enroll_start = min(g["start_ts"], END_DATE)
        enroll_end = min(g["end_ts"], END_DATE)
        enrolled_date = random_date_in(enroll_start, max(enroll_start, enroll_end))

        if g["status"] == "finished":
            status = rng.choice(["graduated", "dropped"], p=[0.8, 0.2])
        elif g["status"] == "forming":
            status = "active"
        else:  # active group
            status = rng.choice(["active", "dropped", "frozen"], p=[0.75, 0.15, 0.10])

        rows.append({
            "student_id": f"S{i:04d}",
            "full_name": random_name(),
            "phone": random_phone(),
            "group_id": g["group_id"],
            "course": g["course"],
            "branch": g["branch"],
            "source": rng.choice(SOURCES, p=[0.28, 0.20, 0.18, 0.08, 0.12, 0.06, 0.08]),
            "enrolled_date": enrolled_date.date().isoformat(),
            "status": status,
        })
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- staff
def gen_staff(n=40) -> pd.DataFrame:
    roles = (["operator"] * 8 + ["sales"] * 8 + ["teacher"] * 15 +
             ["admin"] * 4 + ["marketer"] * 3 + ["manager"] * 2)
    role_dept = {"operator": "Qongiroq markazi", "sales": "Sotuvlar", "teacher": "O'quv",
                 "admin": "Ma'muriyat", "marketer": "Marketing", "manager": "Ma'muriyat"}
    role_salary = {"operator": (2_500_000, 4_500_000), "sales": (2_800_000, 6_000_000),
                   "teacher": (3_500_000, 8_000_000), "admin": (2_500_000, 4_000_000),
                   "marketer": (3_000_000, 5_500_000), "manager": (5_000_000, 9_000_000)}
    rows = []
    for i, role in enumerate(roles, start=1):
        lo, hi = role_salary[role]
        status = rng.choice(["active", "left"], p=[0.9, 0.1])
        rows.append({
            "staff_id": f"E{i:03d}",
            "full_name": random_name(),
            "role": role,
            "department": role_dept[role],
            "hired_date": random_date_in(pd.Timestamp("2021-06-01"), pd.Timestamp("2026-06-01")).date().isoformat(),
            "salary": int(round(rng.integers(lo, hi), -5)),
            "status": status,
        })
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- leads
def gen_leads(staff: pd.DataFrame, n=1200) -> pd.DataFrame:
    sales_names = staff.loc[staff["role"] == "sales", "full_name"].tolist()
    counts = counts_per_month(n)
    rows = []
    idx = 1
    for month, cnt in zip(MONTHS, counts):
        month_end = min(month + pd.offsets.MonthEnd(0), END_DATE)
        for _ in range(cnt):
            created = random_date_in(month, month_end)
            status = rng.choice(["new", "contacted", "trial", "enrolled", "lost"],
                                 p=[0.15, 0.25, 0.20, 0.20, 0.20])
            rows.append({
                "lead_id": f"L{idx:04d}",
                "full_name": random_name(),
                "phone": random_phone(),
                "source": rng.choice(SOURCES, p=[0.28, 0.20, 0.18, 0.08, 0.12, 0.06, 0.08]),
                "interest_course": rng.choice(COURSES),
                "branch": rng.choice(BRANCHES),
                "assigned_to": rng.choice(sales_names),
                "created_date": created.date().isoformat(),
                "status": status,
            })
            idx += 1
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- calls
def gen_calls(leads: pd.DataFrame, staff: pd.DataFrame, n=3000) -> pd.DataFrame:
    operators = staff.loc[staff["role"] == "operator", "full_name"].tolist()
    leads_dates = pd.to_datetime(leads["created_date"])
    rows = []
    for i in range(1, n + 1):
        lead_pos = rng.integers(0, len(leads))
        lead_id = leads.iloc[lead_pos]["lead_id"]
        lead_created = leads_dates.iloc[lead_pos]
        call_date = random_date_in(lead_created, min(lead_created + pd.Timedelta(days=60), END_DATE))
        outcome = rng.choice(["interested", "callback", "enrolled", "refused", "no_answer"],
                              p=[0.28, 0.22, 0.12, 0.18, 0.20])
        stage = rng.choice(["opening", "needs", "pitch", "close"], p=[0.30, 0.28, 0.24, 0.18])
        score_base = {"interested": 75, "callback": 60, "enrolled": 90, "refused": 30, "no_answer": 15}[outcome]
        score = int(np.clip(rng.normal(score_base, 10), 0, 100))
        rows.append({
            "call_id": f"C{i:05d}",
            "lead_id": lead_id,
            "operator": rng.choice(operators),
            "date": call_date.date().isoformat(),
            "direction": rng.choice(["in", "out"], p=[0.35, 0.65]),
            "duration_sec": int(rng.integers(20, 900)),
            "outcome": outcome,
            "score": score,
            "stage": stage,
        })
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- traffic
def gen_traffic(leads: pd.DataFrame) -> pd.DataFrame:
    all_days = pd.date_range(START_DATE, END_DATE, freq="D")
    leads_by_day_channel = (
        leads.assign(created_date=pd.to_datetime(leads["created_date"]))
        .groupby(["created_date", "source"]).size()
    )
    rows = []
    channel_base_sessions = {"instagram": 120, "telegram": 80, "google": 60,
                              "facebook": 40, "referral": 25, "organic": 50}
    for day in all_days:
        month_idx = (day.year - START_DATE.year) * 12 + (day.month - START_DATE.month)
        growth = 1 + 0.02 * month_idx
        for channel in TRAFFIC_CHANNELS:
            base = channel_base_sessions[channel] * growth
            sessions = max(0, int(rng.normal(base, base * 0.25)))
            unique_visitors = int(sessions * rng.uniform(0.55, 0.8))
            # leads_generated ~ matches leads.csv counts for the mapped source (hh/walk_in excluded)
            key = (day, channel) if channel != "organic" else None
            leads_generated = int(leads_by_day_channel.get((day, channel), 0)) if key else int(rng.integers(0, 2))
            if channel in ("referral", "organic"):
                cost = 0.0
            else:
                cost = round(float(sessions * rng.uniform(800, 2200)), -2)
            rows.append({
                "date": day.date().isoformat(),
                "channel": channel,
                "sessions": sessions,
                "unique_visitors": unique_visitors,
                "leads_generated": leads_generated,
                "cost": cost,
            })
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- attendance
def gen_attendance(groups: pd.DataFrame, students: pd.DataFrame) -> pd.DataFrame:
    groups = groups.copy()
    groups["start_ts"] = pd.to_datetime(groups["start_date"])
    groups["end_ts"] = groups.apply(
        lambda r: r["start_ts"] + pd.Timedelta(days=group_duration_days(r["course"], r["schedule"])), axis=1
    )
    students = students.copy()
    students["enrolled_ts"] = pd.to_datetime(students["enrolled_date"])

    rows = []
    aid = 1
    for _, g in groups.iterrows():
        if g["status"] == "forming":
            continue  # no sessions yet
        session_end = min(g["end_ts"], END_DATE)
        if session_end <= g["start_ts"]:
            continue
        freq = "D" if g["schedule"] == "bootcamp" else "2D"  # bootcamp daily-ish, standard every ~2 days
        session_dates = pd.date_range(g["start_ts"], session_end, freq=freq)
        session_dates = [d for d in session_dates if d.weekday() < 6]  # skip Sunday
        group_students = students[students["group_id"] == g["group_id"]]
        for session_date in session_dates:
            for _, s in group_students.iterrows():
                if s["enrolled_ts"] > session_date:
                    continue
                status = rng.choice(["present", "absent", "late", "excused"], p=[0.78, 0.10, 0.08, 0.04])
                rows.append({
                    "attendance_id": f"A{aid:06d}",
                    "student_id": s["student_id"],
                    "group_id": g["group_id"],
                    "date": session_date.date().isoformat(),
                    "status": status,
                })
                aid += 1
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- payments
def gen_payments(students: pd.DataFrame, groups: pd.DataFrame) -> pd.DataFrame:
    groups_idx = groups.set_index("group_id")
    rows = []
    pid = 1
    for _, s in students.iterrows():
        course = s["course"]
        lo, hi = COURSE_PRICE_RANGE[course]
        enrolled = pd.Timestamp(s["enrolled_date"])
        g = groups_idx.loc[s["group_id"]]
        group_end = pd.Timestamp(g["start_date"]) + pd.Timedelta(days=group_duration_days(course, g["schedule"]))
        if s["status"] == "dropped":
            last_month = enrolled + pd.Timedelta(days=int(rng.integers(15, 120)))
        elif s["status"] == "frozen":
            last_month = enrolled + pd.Timedelta(days=int(rng.integers(30, 150)))
        else:
            last_month = min(group_end, END_DATE)
        last_month = min(last_month, END_DATE)

        billing_months = pd.date_range(enrolled.to_period("M").to_timestamp(), last_month, freq="MS")
        if len(billing_months) == 0:
            billing_months = [enrolled.to_period("M").to_timestamp()]

        for month_start in billing_months:
            amount = int(round(rng.integers(lo, hi), -4)) if lo < hi else lo
            due_date = month_start + pd.Timedelta(days=5)
            status = rng.choice(["paid", "pending", "overdue"], p=[0.75, 0.15, 0.10])
            paid_date = ""
            if status == "paid":
                paid_date = random_date_in(due_date, due_date + pd.Timedelta(days=10)).date().isoformat()
            rows.append({
                "payment_id": f"P{pid:05d}",
                "student_id": s["student_id"],
                "group_id": s["group_id"],
                "amount": amount,
                "due_date": due_date.date().isoformat(),
                "paid_date": paid_date,
                "method": rng.choice(["cash", "card", "transfer"], p=[0.35, 0.40, 0.25]),
                "status": status,
                "month_for": month_start.strftime("%Y-%m"),
            })
            pid += 1
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- expenses
def gen_expenses() -> pd.DataFrame:
    rows = []
    eid = 1
    for month in MONTHS:
        month_end = min(month + pd.offsets.MonthEnd(0), END_DATE)
        for branch in BRANCHES:
            rows.append({
                "expense_id": f"X{eid:04d}", "date": month.date().isoformat(), "category": "rent",
                "amount": int(rng.integers(15_000_000, 28_000_000)), "note": f"{branch} filial ijarasi",
            })
            eid += 1
        rows.append({
            "expense_id": f"X{eid:04d}", "date": month.date().isoformat(), "category": "utilities",
            "amount": int(rng.integers(3_000_000, 7_000_000)), "note": "kommunal to'lovlar",
        })
        eid += 1
        rows.append({
            "expense_id": f"X{eid:04d}", "date": month.date().isoformat(), "category": "salary",
            "amount": int(rng.integers(120_000_000, 190_000_000)), "note": "oylik ish haqi fondi",
        })
        eid += 1
        n_marketing = int(rng.integers(2, 5))
        for _ in range(n_marketing):
            rows.append({
                "expense_id": f"X{eid:04d}", "date": random_date_in(month, month_end).date().isoformat(),
                "category": "marketing", "amount": int(rng.integers(1_500_000, 9_000_000)),
                "note": "reklama kampaniyasi",
            })
            eid += 1
        if rng.random() < 0.4:
            rows.append({
                "expense_id": f"X{eid:04d}", "date": random_date_in(month, month_end).date().isoformat(),
                "category": "equipment", "amount": int(rng.integers(2_000_000, 15_000_000)),
                "note": "texnika/mebel xaridi",
            })
            eid += 1
        if rng.random() < 0.3:
            rows.append({
                "expense_id": f"X{eid:04d}", "date": random_date_in(month, month_end).date().isoformat(),
                "category": "other", "amount": int(rng.integers(500_000, 3_000_000)),
                "note": "boshqa xarajatlar",
            })
            eid += 1
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- main
def main():
    DATA_DIR.mkdir(exist_ok=True)

    teachers = gen_teachers()
    groups = gen_groups(teachers)
    students = gen_students(groups)
    staff = gen_staff()
    leads = gen_leads(staff)
    calls = gen_calls(leads, staff)
    traffic = gen_traffic(leads)
    attendance = gen_attendance(groups, students)
    payments = gen_payments(students, groups)
    expenses = gen_expenses()

    tables = {
        "teachers": teachers,
        "groups": groups.drop(columns=[c for c in ("start_ts", "end_ts") if c in groups.columns]),
        "students": students.drop(columns=[c for c in ("enrolled_ts",) if c in students.columns]),
        "staff": staff,
        "leads": leads,
        "calls": calls,
        "traffic": traffic,
        "attendance": attendance,
        "payments": payments,
        "expenses": expenses,
    }
    for name, df in tables.items():
        df.to_csv(DATA_DIR / f"{name}.csv", index=False)
        print(f"data/{name}.csv -> {len(df)} rows")


if __name__ == "__main__":
    main()
