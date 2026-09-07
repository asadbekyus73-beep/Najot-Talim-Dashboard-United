// Demo ma'lumotlar bilan Supabase loyihasini to'ldiruvchi skript.
// Ishlatish: npm run seed  (avval .env.local to'ldirilgan bo'lishi kerak)
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY .env.local faylida bo'lishi shart."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_PASSWORD = "NajotTalim2026!";

const DEMO_USERS = [
  { email: "admin@najottalim.uz", full_name: "Tizim admini", role: "admin" },
  {
    email: "marketing.boshligi@najottalim.uz",
    full_name: "Dilnoza Karimova",
    role: "marketing_head",
  },
  { email: "smm@najottalim.uz", full_name: "Sardor Aliyev", role: "smm" },
  {
    email: "copywriter@najottalim.uz",
    full_name: "Madina Yusupova",
    role: "copywriter",
  },
  {
    email: "mobilograf@najottalim.uz",
    full_name: "Jasur Toshmatov",
    role: "videographer",
  },
  { email: "it@najottalim.uz", full_name: "Aziz Rahimov", role: "it" },
];

function dateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function round(n, digits = 1) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

async function upsertUsers() {
  const ids = {};
  for (const u of DEMO_USERS) {
    const { data: existing } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    const found = existing.users.find((x) => x.email === u.email);

    if (found) {
      ids[u.role] = found.id;
      console.log(`- ${u.email} allaqachon mavjud, o'tkazib yuborildi`);
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: u.full_name, role: u.role },
    });

    if (error) {
      console.error(`Xatolik (${u.email}):`, error.message);
      continue;
    }

    ids[u.role] = data.user.id;
    console.log(`+ ${u.email} yaratildi`);
  }
  return ids;
}

async function seedKpi() {
  const rows = [];
  for (let d = 29; d >= 0; d--) {
    const date = dateStr(d);
    const t = 29 - d; // 0..29, vaqt o'tishi bilan o'sish uchun

    rows.push(
      { date, role_scope: "marketing_head", metric_key: "leads", metric_value: Math.round(12 + t * 0.6 + Math.random() * 4), unit: "ta" },
      { date, role_scope: "marketing_head", metric_key: "cpl", metric_value: round(52000 - t * 300 + Math.random() * 2000), unit: "so'm" },
      { date, role_scope: "marketing_head", metric_key: "conversion_rate", metric_value: round(6 + t * 0.08 + Math.random(), 1), unit: "%" },
      { date, role_scope: "marketing_head", metric_key: "roas", metric_value: round(1.8 + t * 0.03 + Math.random() * 0.3, 2), unit: "x" },

      { date, role_scope: "smm", metric_key: "followers_instagram", metric_value: Math.round(11800 + t * 45 + Math.random() * 30), unit: "ta" },
      { date, role_scope: "smm", metric_key: "followers_telegram", metric_value: Math.round(7900 + t * 38 + Math.random() * 25), unit: "ta" },
      { date, role_scope: "smm", metric_key: "followers_facebook", metric_value: Math.round(4950 + t * 8 + Math.random() * 10), unit: "ta" },
      { date, role_scope: "smm", metric_key: "engagement_rate", metric_value: round(3.8 + Math.random() * 1.5, 2), unit: "%" },

      { date, role_scope: "copywriter", metric_key: "articles_published", metric_value: Math.round(20 + t * 0.5 + Math.random() * 2), unit: "ta" },
      { date, role_scope: "copywriter", metric_key: "avg_turnaround_days", metric_value: round(3.2 - t * 0.02 + Math.random() * 0.5, 1), unit: "kun" },

      { date, role_scope: "videographer", metric_key: "videos_published", metric_value: Math.round(8 + t * 0.25 + Math.random()), unit: "ta" },
      { date, role_scope: "videographer", metric_key: "total_views", metric_value: Math.round(15000 + t * 900 + Math.random() * 500), unit: "ta" },

      { date, role_scope: "it", metric_key: "site_uptime_pct", metric_value: round(99.5 + Math.random() * 0.5, 2), unit: "%" },
      { date, role_scope: "it", metric_key: "avg_page_load_ms", metric_value: Math.round(850 + Math.random() * 300), unit: "ms" },
      { date, role_scope: "it", metric_key: "monthly_visitors", metric_value: Math.round(9000 + t * 60 + Math.random() * 200), unit: "ta" }
    );
  }

  const { error } = await supabase
    .from("kpi_daily")
    .upsert(rows, { onConflict: "date,role_scope,metric_key" });

  if (error) console.error("kpi_daily xatolik:", error.message);
  else console.log(`+ ${rows.length} ta KPI qatori yozildi`);
}

async function seedContent(ids) {
  const items = [
    { role_scope: "smm", item_type: "Instagram post", title: "SMM Pro kursi reklamasi", status: "published", author_id: ids.smm, metrics: { likes: 420, views: 8200, comments: 34 } },
    { role_scope: "smm", item_type: "Reels", title: "Bitiruvchi hikoyasi", status: "approved", author_id: ids.smm, metrics: {} },
    { role_scope: "smm", item_type: "Telegram post", title: "Yangi guruh e'loni", status: "review", author_id: ids.smm, metrics: {} },
    { role_scope: "smm", item_type: "Story", title: "Kunlik motivatsiya", status: "draft", author_id: ids.smm, metrics: {} },

    { role_scope: "copywriter", item_type: "Blog maqola", title: "Frontend yo'nalishi haqida to'liq qo'llanma", status: "published", author_id: ids.copywriter, metrics: {} },
    { role_scope: "copywriter", item_type: "Landing matni", title: "SMM Pro landing sahifasi matni", status: "review", author_id: ids.copywriter, metrics: {} },
    { role_scope: "copywriter", item_type: "Reklama matni", title: "Google Ads uchun 3 varianti", status: "draft", author_id: ids.copywriter, metrics: {} },

    { role_scope: "videographer", item_type: "YouTube video", title: "Kurs sharhi: Backend yo'nalishi", status: "published", author_id: ids.videographer, metrics: { views: 5400, likes: 210 } },
    { role_scope: "videographer", item_type: "Reels", title: "Kampus bo'ylab tur", status: "approved", author_id: ids.videographer, metrics: {} },
    { role_scope: "videographer", item_type: "TikTok", title: "Talaba kuni", status: "draft", author_id: ids.videographer, metrics: {} },
  ];

  const { error } = await supabase.from("content_items").insert(items);
  if (error) console.error("content_items xatolik:", error.message);
  else console.log(`+ ${items.length} ta kontent qo'shildi`);
}

async function seedCampaigns() {
  const campaigns = [
    { name: "Kuzgi qabul - Frontend", channel: "Instagram Ads", budget: 8000000, spent: 6200000, leads: 340, enrollments: 58 },
    { name: "Kuzgi qabul - Backend", channel: "Google Ads", budget: 6000000, spent: 5100000, leads: 210, enrollments: 41 },
    { name: "SMM Pro reklamasi", channel: "Telegram Ads", budget: 3000000, spent: 2400000, leads: 180, enrollments: 29 },
    { name: "Robbit (bolalar) kampaniyasi", channel: "Facebook Ads", budget: 4000000, spent: 3900000, leads: 150, enrollments: 22 },
  ];
  const { error } = await supabase.from("campaigns").insert(campaigns);
  if (error) console.error("campaigns xatolik:", error.message);
  else console.log(`+ ${campaigns.length} ta kampaniya qo'shildi`);
}

async function seedIntegrations() {
  const integrations = [
    { name: "Instagram Business API", status: "connected", last_synced_at: new Date().toISOString() },
    { name: "Telegram Bot API", status: "connected", last_synced_at: new Date().toISOString() },
    { name: "Google Analytics", status: "connected", last_synced_at: new Date().toISOString() },
    { name: "Meta Ads (Facebook)", status: "disconnected" },
    { name: "CRM (ichki tizim)", status: "error", notes: "So'nggi sinxronizatsiyada xatolik" },
  ];
  const { error } = await supabase.from("integrations").insert(integrations);
  if (error) console.error("integrations xatolik:", error.message);
  else console.log(`+ ${integrations.length} ta integratsiya qo'shildi`);
}

async function main() {
  console.log("Demo xodimlar yaratilmoqda...");
  const ids = await upsertUsers();

  console.log("\nKPI ma'lumotlari yozilmoqda...");
  await seedKpi();

  console.log("\nKontent-reja yozilmoqda...");
  await seedContent(ids);

  console.log("\nKampaniyalar yozilmoqda...");
  await seedCampaigns();

  console.log("\nIntegratsiyalar yozilmoqda...");
  await seedIntegrations();

  console.log("\nTayyor! Demo login ma'lumotlari:");
  for (const u of DEMO_USERS) {
    console.log(`  ${u.email}  /  ${DEMO_PASSWORD}  (${u.role})`);
  }
}

main();
