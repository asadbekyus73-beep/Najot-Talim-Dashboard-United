import { ContentTable } from "@/components/ContentTable";
import { NewContentForm } from "@/components/NewContentForm";
import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { getContentItems, getKpiSeries, getLatestKpi } from "@/lib/queries";

const REDIRECT = "/mobilograf";

export default async function MobilografPage() {
  const [items, series, latest] = await Promise.all([
    getContentItems("videographer"),
    getKpiSeries("videographer", 30),
    getLatestKpi("videographer"),
  ]);
  const active = items.filter((i) => i.status !== "published");
  const defs = METRICS_BY_ROLE.videographer;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Video-reja</h1>
        <p className="text-sm text-secondary">
          Suratga olish jadvali va montaj holati
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {defs.map((m) => (
          <StatCard
            key={m.key}
            label={m.label}
            value={latest.get(m.key)?.metric_value ?? "—"}
            unit={m.unit}
          />
        ))}
      </div>

      <TrendChart
        title="Umumiy ko'rishlar dinamikasi"
        data={series}
        series={[{ key: "total_views", label: "Ko'rishlar" }]}
      />

      <NewContentForm
        roleScope="videographer"
        redirectPath={REDIRECT}
        itemTypes={["YouTube video", "Reels", "TikTok", "Tashqi reklama roligi"]}
      />

      <ContentTable items={active} redirectPath={REDIRECT} canDeleteOwn />
    </div>
  );
}
