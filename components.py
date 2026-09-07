"""Design system for the Najot Jamoaviy Dashboard — UzGrow minimalism.

Every page imports this module and uses ONLY these functions to build UI, so
all department pages look identical no matter who wrote them.

IMPORTANT: this module only DEFINES functions/constants at import time —
it never calls st.* at module top level — so it can be imported cleanly
from any page (and from data/metric-only scripts) without side effects.
"""

import html as _html

import plotly.graph_objects as go
import streamlit as st

# ---------------------------------------------------------------------------
# Design tokens (canonical UzGrow palette — light theme)
# ---------------------------------------------------------------------------
GREEN = "#24b14b"
GREEN_D = "#1e913d"
GREEN_L = "#eaf7ee"
GREEN_BG = "#e7f6ec"
INK = "#141a15"
MUTED = "#5f6b62"
LINE = "#e3e8e4"
BG = "#f5f8f5"
CARD = "#ffffff"
SOFT = "#f0f4f1"
AMBER = "#e0a100"
AMBER_BG = "#fdf5df"
RED = "#dc4b3e"
RED_BG = "#fdecea"
RADIUS = "16px"
SHADOW = "0 1px 2px rgba(20,26,21,.04), 0 8px 24px rgba(20,26,21,.06)"
FONT = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif'

# Categorical palette for multi-series charts — green-forward, on-brand.
PALETTE = [
    GREEN,
    "#8fd4a4",
    GREEN_D,
    AMBER,
    "#5f6b62",
    "#c8e6d0",
    RED,
    "#0d6b2b",
]

# Tones used by kpi_row / kpi_card / status_pill: "pos" | "neg" | "neutral"
_TONE_COLOR = {"pos": GREEN, "neg": RED, "neutral": MUTED}
_PILL_TONE = {
    "pos": ("green", GREEN_BG, GREEN_D),
    "neg": ("red", RED_BG, RED),
    "neutral": ("amber", AMBER_BG, AMBER),
    # allow calling status_pill with the raw color name too
    "green": ("green", GREEN_BG, GREEN_D),
    "amber": ("amber", AMBER_BG, AMBER),
    "red": ("red", RED_BG, RED),
}

# ---------------------------------------------------------------------------
# Plotly theme — shared by every chart helper below
# ---------------------------------------------------------------------------
PLOTLY_TEMPLATE = go.layout.Template(
    layout=go.Layout(
        font=dict(family=FONT, size=13, color=MUTED),
        colorway=PALETTE,
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        margin=dict(l=10, r=10, t=36, b=10),
        title=dict(font=dict(size=14, color=INK, family=FONT), x=0, xanchor="left"),
        legend=dict(
            font=dict(size=12, color=MUTED),
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="left",
            x=0,
        ),
        xaxis=dict(
            gridcolor=LINE,
            zerolinecolor=LINE,
            linecolor=LINE,
            tickfont=dict(color=MUTED, size=11.5),
            title=dict(font=dict(color=MUTED, size=12)),
        ),
        yaxis=dict(
            gridcolor=LINE,
            zerolinecolor=LINE,
            linecolor=LINE,
            tickfont=dict(color=MUTED, size=11.5),
            title=dict(font=dict(color=MUTED, size=12)),
        ),
        hoverlabel=dict(
            bgcolor=CARD,
            bordercolor=LINE,
            font=dict(family=FONT, size=12, color=INK),
        ),
    )
)

_CSS = f"""
<style>
  :root {{
    --green:{GREEN}; --green-d:{GREEN_D}; --green-l:{GREEN_L}; --green-bg:{GREEN_BG};
    --ink:{INK}; --muted:{MUTED}; --line:{LINE};
    --bg:{BG}; --card:{CARD}; --soft:{SOFT};
    --amber:{AMBER}; --amber-bg:{AMBER_BG}; --red:{RED}; --red-bg:{RED_BG};
    --shadow:{SHADOW}; --radius:{RADIUS}; --font:{FONT};
  }}

  html, body, [class*="css"] {{ font-family: var(--font) !important; }}
  [data-testid="stAppViewContainer"] {{ background: var(--bg); color: var(--ink); }}
  [data-testid="stHeader"] {{ background: rgba(0,0,0,0); }}
  #MainMenu, footer {{ visibility: hidden; }}
  .block-container {{ padding-top: 1.6rem; padding-bottom: 3rem; max-width: 1180px; }}

  [data-testid="stSidebar"] {{
    background: var(--card);
    border-right: 1px solid var(--line);
  }}
  [data-testid="stSidebar"] * {{ font-family: var(--font); }}

  h1, h2, h3, h4 {{ color: var(--ink); letter-spacing: -.02em; }}
  p, span, label, div {{ color: var(--ink); }}

  /* ---- page header ------------------------------------------------- */
  .np-title {{ font-size: 22px; font-weight: 800; letter-spacing: -.02em; margin-bottom: 2px; }}
  .np-sub {{ color: var(--muted); font-size: 13.5px; margin-bottom: 22px; }}

  /* ---- kpi row ------------------------------------------------------ */
  .np-kpis {{
    display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 14px; margin-bottom: 22px;
  }}
  .np-kpi {{
    background: var(--card); border: 1px solid var(--line); border-left: 3px solid var(--line);
    border-radius: var(--radius); padding: 16px 18px; box-shadow: var(--shadow);
  }}
  .np-kpi.tone-pos {{ border-left-color: var(--green); }}
  .np-kpi.tone-neg {{ border-left-color: var(--red); }}
  .np-kpi.tone-neutral {{ border-left-color: var(--line); }}
  .np-kpi .lbl {{ color: var(--muted); font-size: 12.5px; font-weight: 600; margin-bottom: 8px; }}
  .np-kpi .val {{ font-size: 28px; font-weight: 800; letter-spacing: -.03em; line-height: 1; color: var(--ink); }}
  .np-kpi .delta {{ font-size: 12px; font-weight: 700; margin-top: 8px; }}
  .np-kpi .delta.tone-pos {{ color: var(--green-d); }}
  .np-kpi .delta.tone-neg {{ color: var(--red); }}
  .np-kpi .delta.tone-neutral {{ color: var(--muted); }}

  /* ---- section header ------------------------------------------------ */
  .np-section {{
    display: flex; align-items: center; gap: 9px;
    margin: 26px 0 12px; font-size: 15px; font-weight: 700; color: var(--ink);
  }}
  .np-section::before {{
    content: ""; display: block; width: 4px; height: 16px;
    background: var(--green); border-radius: 3px;
  }}

  /* ---- generic card wrapper (charts / tables) ------------------------ */
  .np-card {{
    background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 6px 8px 2px; box-shadow: var(--shadow); margin-bottom: 16px;
  }}

  /* ---- status pill ----------------------------------------------------- */
  .np-pill {{
    display: inline-flex; align-items: center; padding: 3px 10px;
    border-radius: 999px; font-size: 12px; font-weight: 700; line-height: 1.6;
    white-space: nowrap;
  }}
  .np-pill-green {{ background: var(--green-bg); color: var(--green-d); }}
  .np-pill-amber {{ background: var(--amber-bg); color: var(--amber); }}
  .np-pill-red {{ background: var(--red-bg); color: var(--red); }}

  /* ---- data table ------------------------------------------------------ */
  .np-table-wrap {{
    background: var(--card); border: 1px solid var(--line); border-radius: var(--radius);
    box-shadow: var(--shadow); overflow: hidden; margin-bottom: 16px;
  }}
  table.np-table {{ width: 100%; border-collapse: collapse; font-size: 13px; }}
  table.np-table th {{
    text-align: left; color: var(--muted); font-weight: 600; font-size: 12px;
    padding: 11px 14px; background: var(--soft); border-bottom: 1px solid var(--line);
    white-space: nowrap;
  }}
  table.np-table td {{
    padding: 10px 14px; border-bottom: 1px solid var(--line); color: var(--ink);
    white-space: nowrap;
  }}
  table.np-table tr:last-child td {{ border-bottom: none; }}
  table.np-table tr:hover td {{ background: var(--soft); }}

  /* ---- plotly toolbar declutter --------------------------------------- */
  .js-plotly-plot .plotly .modebar {{ display: none !important; }}

  /* ---- small info tiles (overview health grid) ------------------------ */
  .np-tiles {{
    display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px; margin-bottom: 16px;
  }}
  .np-tile {{
    background: var(--soft); border-radius: 12px; padding: 14px 16px; text-align: center;
  }}
  .np-tile .name {{ color: var(--muted); font-size: 12px; font-weight: 600; margin-bottom: 6px; }}
  .np-tile .big {{ font-size: 22px; font-weight: 800; color: var(--ink); letter-spacing: -.02em; }}
</style>
"""


def apply_page(title: str, icon: str = "📊") -> None:
    """Call at the very top of every page: sets page config + injects theme CSS."""
    st.set_page_config(page_title=f"{title} — Najot", page_icon=icon, layout="wide")
    st.markdown(_CSS, unsafe_allow_html=True)


def page_header(title: str, subtitle: str | None = None) -> None:
    sub_html = f'<div class="np-sub">{_html.escape(subtitle)}</div>' if subtitle else ""
    st.markdown(
        f'<div class="np-title">{_html.escape(title)}</div>{sub_html}',
        unsafe_allow_html=True,
    )


def kpi_card(label: str, value: str, delta: str | None = None, tone: str = "neutral") -> str:
    """Return the HTML for a single KPI card (used internally by kpi_row)."""
    tone = tone if tone in _TONE_COLOR else "neutral"
    delta_html = (
        f'<div class="delta tone-{tone}">{_html.escape(str(delta))}</div>' if delta else ""
    )
    return (
        f'<div class="np-kpi tone-{tone}">'
        f'<div class="lbl">{_html.escape(label)}</div>'
        f'<div class="val">{_html.escape(str(value))}</div>'
        f"{delta_html}"
        f"</div>"
    )


def kpi_row(items: list[dict]) -> None:
    """items: [{"label","value","delta"(opt),"tone"("pos"/"neg"/"neutral", opt)}]"""
    cards = "".join(
        kpi_card(
            item["label"],
            item["value"],
            item.get("delta"),
            item.get("tone", "neutral"),
        )
        for item in items
    )
    st.markdown(f'<div class="np-kpis">{cards}</div>', unsafe_allow_html=True)


def section(title: str) -> None:
    st.markdown(f'<div class="np-section">{_html.escape(title)}</div>', unsafe_allow_html=True)


def _themed(fig: go.Figure, title: str | None) -> go.Figure:
    fig.update_layout(template=PLOTLY_TEMPLATE)
    if title:
        fig.update_layout(title=title)
    return fig


def _render(fig: go.Figure) -> None:
    st.plotly_chart(fig, use_container_width=True, config={"displayModeBar": False})


def line_chart(df, x: str, y: str, title: str | None = None, color: str | None = None) -> None:
    fig = go.Figure()
    if color and color in df.columns:
        for i, (key, sub) in enumerate(df.groupby(color)):
            fig.add_trace(
                go.Scatter(
                    x=sub[x], y=sub[y], mode="lines", name=str(key),
                    line=dict(width=2.5, color=PALETTE[i % len(PALETTE)]),
                )
            )
    else:
        fig.add_trace(
            go.Scatter(x=df[x], y=df[y], mode="lines", line=dict(width=2.5, color=GREEN), fill="tozeroy",
                       fillcolor="rgba(36,177,75,.08)")
        )
    _render(_themed(fig, title))


def area_chart(df, x: str, y: str, title: str | None = None, color: str | None = None) -> None:
    fig = go.Figure()
    if color and color in df.columns:
        for i, (key, sub) in enumerate(df.groupby(color)):
            c = PALETTE[i % len(PALETTE)]
            fig.add_trace(
                go.Scatter(x=sub[x], y=sub[y], mode="lines", name=str(key), stackgroup="one",
                           line=dict(width=1.5, color=c))
            )
    else:
        fig.add_trace(
            go.Scatter(x=df[x], y=df[y], mode="lines", line=dict(width=2, color=GREEN),
                       fill="tozeroy", fillcolor="rgba(36,177,75,.15)")
        )
    _render(_themed(fig, title))


def bar_chart(df, x: str, y: str, color: str | None = None, title: str | None = None) -> None:
    fig = go.Figure()
    if color and color in df.columns:
        for i, (key, sub) in enumerate(df.groupby(color)):
            fig.add_trace(go.Bar(x=sub[x], y=sub[y], name=str(key), marker_color=PALETTE[i % len(PALETTE)]))
        fig.update_layout(barmode="group")
    else:
        fig.add_trace(go.Bar(x=df[x], y=df[y], marker_color=GREEN))
    _render(_themed(fig, title))


def donut(df, names: str, values: str, title: str | None = None) -> None:
    fig = go.Figure(
        data=[
            go.Pie(
                labels=df[names], values=df[values], hole=0.62,
                marker=dict(colors=PALETTE, line=dict(color=CARD, width=2)),
                textfont=dict(size=12, color=INK), textinfo="percent",
            )
        ]
    )
    _render(_themed(fig, title))


def status_pill(text: str, tone: str = "neutral") -> str:
    """Return an HTML <span> pill — green/amber/red. Embed in data_table cells."""
    color_name, _, _ = _PILL_TONE.get(tone, _PILL_TONE["neutral"])
    return f'<span class="np-pill np-pill-{color_name}">{_html.escape(str(text))}</span>'


def data_table(df) -> None:
    """Styled HTML table. Cells containing pre-built pill HTML (from status_pill)
    are rendered as-is; everything else is escaped as plain text."""
    headers = "".join(
        f"<th>{_html.escape(str(col).replace('_', ' ').strip().capitalize())}</th>" for col in df.columns
    )
    rows = []
    for _, row in df.iterrows():
        cells = []
        for value in row:
            text = "" if value is None else str(value)
            if text.startswith("<span"):
                cells.append(f"<td>{text}</td>")
            else:
                cells.append(f"<td>{_html.escape(text)}</td>")
        rows.append(f"<tr>{''.join(cells)}</tr>")
    table_html = (
        '<div class="np-table-wrap"><table class="np-table">'
        f"<thead><tr>{headers}</tr></thead><tbody>{''.join(rows)}</tbody>"
        "</table></div>"
    )
    st.markdown(table_html, unsafe_allow_html=True)
