import { createClient } from "@/lib/supabase/server";
import type { AppRole, Campaign, ContentItem, Integration, KpiDaily, Profile } from "@/lib/types";

export async function getKpiSeries(roleScope: AppRole, days = 30) {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data } = await supabase
    .from("kpi_daily")
    .select("*")
    .eq("role_scope", roleScope)
    .gte("date", since.toISOString().slice(0, 10))
    .order("date", { ascending: true });

  return pivotKpi((data ?? []) as KpiDaily[]);
}

function pivotKpi(rows: KpiDaily[]) {
  const byDate = new Map<string, Record<string, string | number>>();
  for (const row of rows) {
    const entry = byDate.get(row.date) ?? { date: row.date };
    entry[row.metric_key] = Number(row.metric_value);
    byDate.set(row.date, entry);
  }
  return Array.from(byDate.values());
}

export async function getAllKpiRaw(days = 30) {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data } = await supabase
    .from("kpi_daily")
    .select("*")
    .gte("date", since.toISOString().slice(0, 10))
    .order("date", { ascending: false });

  return (data ?? []) as KpiDaily[];
}

export async function getLatestKpi(roleScope: AppRole) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("kpi_daily")
    .select("*")
    .eq("role_scope", roleScope)
    .order("date", { ascending: false })
    .limit(50);

  const latest = new Map<string, KpiDaily>();
  for (const row of (data ?? []) as KpiDaily[]) {
    if (!latest.has(row.metric_key)) latest.set(row.metric_key, row);
  }
  return latest;
}

export async function getContentItems(roleScope?: AppRole) {
  const supabase = await createClient();
  let query = supabase
    .from("content_items")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false });

  if (roleScope) {
    query = query.eq("role_scope", roleScope);
  }

  const { data } = await query;
  return (data ?? []) as ContentItem[];
}

export async function getCampaigns() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("campaigns")
    .select("*")
    .order("start_date", { ascending: false });
  return (data ?? []) as Campaign[];
}

export async function getIntegrations() {
  const supabase = await createClient();
  const { data } = await supabase.from("integrations").select("*").order("name");
  return (data ?? []) as Integration[];
}

export async function getAllProfiles() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });
  return (data ?? []) as Profile[];
}
