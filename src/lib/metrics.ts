import type { AppRole } from "./types";

export interface MetricDef {
  key: string;
  label: string;
  unit?: string;
}

export const METRICS_BY_ROLE: Record<AppRole, MetricDef[]> = {
  admin: [],
  marketing_head: [
    { key: "leads", label: "Yangi lidlar", unit: "ta" },
    { key: "cpl", label: "Bitta lid narxi (CPL)", unit: "so'm" },
    { key: "conversion_rate", label: "Konversiya", unit: "%" },
    { key: "roas", label: "Reklama samaradorligi (ROAS)", unit: "x" },
  ],
  smm: [
    { key: "followers_instagram", label: "Instagram obunachilari", unit: "ta" },
    { key: "followers_telegram", label: "Telegram obunachilari", unit: "ta" },
    { key: "followers_facebook", label: "Facebook obunachilari", unit: "ta" },
    { key: "engagement_rate", label: "Engagement", unit: "%" },
  ],
  copywriter: [
    { key: "articles_published", label: "Nashr etilgan matnlar", unit: "ta" },
    { key: "avg_turnaround_days", label: "O'rtacha bajarish muddati", unit: "kun" },
  ],
  videographer: [
    { key: "videos_published", label: "Tayyor videolar", unit: "ta" },
    { key: "total_views", label: "Umumiy ko'rishlar", unit: "ta" },
  ],
  it: [
    { key: "site_uptime_pct", label: "Sayt ishlash vaqti", unit: "%" },
    { key: "avg_page_load_ms", label: "O'rtacha yuklanish", unit: "ms" },
    { key: "monthly_visitors", label: "Oylik tashrifchilar", unit: "ta" },
  ],
};
