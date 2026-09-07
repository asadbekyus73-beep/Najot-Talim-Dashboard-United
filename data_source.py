import pandas as pd, pathlib

DATA_DIR = pathlib.Path(__file__).parent / "data"


def load(name: str) -> pd.DataFrame:
    # BACKEND: to connect Najot's REAL data, replace this CSV read with a real query
    # (SQL / Google Sheets / API) that returns the SAME columns as data/<name>.csv.
    return pd.read_csv(DATA_DIR / f"{name}.csv")
