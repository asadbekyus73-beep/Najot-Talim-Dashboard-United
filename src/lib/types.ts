export type AppRole =
  | "admin"
  | "marketing_head"
  | "smm"
  | "copywriter"
  | "videographer"
  | "it";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: AppRole;
  created_at: string;
}

export type ContentStatus = "draft" | "review" | "approved" | "published";

export interface ContentItem {
  id: string;
  role_scope: AppRole;
  item_type: string;
  title: string;
  description: string | null;
  status: ContentStatus;
  author_id: string | null;
  due_date: string | null;
  published_at: string | null;
  metrics: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export interface KpiDaily {
  id: number;
  date: string;
  role_scope: AppRole;
  metric_key: string;
  metric_value: number;
  unit: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  budget: number;
  spent: number;
  leads: number;
  enrollments: number;
  start_date: string | null;
  end_date: string | null;
}

export interface Integration {
  id: number;
  name: string;
  status: "connected" | "disconnected" | "error";
  last_synced_at: string | null;
  notes: string | null;
}
