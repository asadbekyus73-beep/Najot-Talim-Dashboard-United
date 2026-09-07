# Sotuv daraxti — sotuv bo'limi dashboardi

Sotuv bo'limining oylik faoliyatini bitta ekranda ko'rsatuvchi interaktiv analitik panel.
Menejerlar **reja bajarilishi foiziga** qarab daraxt shoxlarida darajalarga ajratilgan:
yuqori shoxda rejani bajarganlar, pastda orqada qolganlar.

## Darajalar

| Belgi | Daraja | Shart |
|---|---|---|
| ▲ | Cho'qqi | reja bajarilishi ≥ 100% |
| ● | O'sish shoxi | 80–99% |
| ▼ | Past shox | < 80% |

Daraxtdagi **balandlik** — reja bajarilishi (%), **doira o'lchami** — olib kelingan daromad,
**ildizlar** — hali yopilmagan bitimlar (pipeline).

## Dashboard tarkibi

- 5 ta KPI kartochkasi (daromad, reja bajarilishi, bitimlar, o'rtacha chek, konversiya)
- Menejerlar daraxti + tanlangan menejer kartochkasi
- Reja va fakt — to'planib boruvchi trend grafigi
- Sotuv voronkasi (6 bosqich)
- Lid manbalari va yo'qotish sabablari
- Menejerlar jadvali (tartiblanadigan)

## Interaktivlik

- Menejer doirasiga hover → to'liq statistika
- Doirani yoki jadval qatorini bosish → menejerni tanlash
- Daraja chiplarini bosish → filtr
- Trend grafigida hover → har kun uchun reja/fakt farqi
- Jadval ustunini bosish → tartiblash

## Ma'lumot

⚠️ Hozirgi raqamlar **namuna (demo)** — real CRM ma'lumoti emas.

O'z raqamlaringizni qo'yish uchun `index.html` ichidagi `MANAGERS` massivini tahrirlang:

```js
{ name: "Ism Familiya", team: "A", plan: 180, fact: 214, deals: 19, leads: 92, cycle: 15.2 }
```

`plan` va `fact` — mln so'mda. Foiz, o'rtacha chek, konversiya va daraja avtomatik hisoblanadi.
`FUNNEL`, `SOURCES`, `LOST`, `DAILY`, `PIPELINE` massivlari ham shu yerda.

## Texnik

Bitta statik HTML fayl. Framework yo'q, build yo'q — brauzerda ochiladi.
Grafiklar qo'lda yozilgan SVG. Yorug' va qorong'i rejim qo'llab-quvvatlanadi.

Rang palitrasi ko'rlik (CVD) bo'yicha tekshirilgan: daraja ranglari orasidagi
farq ΔE 11.2 (CVD) / 26.0 (normal ko'rish) — har bir daraja rangdan tashqari
belgi (▲ ● ▼) va foiz raqami bilan ham ajratilgan.
