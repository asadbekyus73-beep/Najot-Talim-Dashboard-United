import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { getKpiSeries, getLatestKpi } from "@/lib/queries";

export default async function SmmPage() {
  const [series, latest] = await Promise.all([
    getKpiSeries("smm", 30),
    getLatestKpi("smm"),
  ]);
  const defs = METRICS_BY_ROLE.smm;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Statistika</h1>
        <p className="text-sm text-secondary">
          Ijtimoiy tarmoqlardagi so'nggi 30 kunlik ko'rsatkichlar
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrendChart
          title="Obunachilar o'sishi"
          data={series}
          series={[
            { key: "followers_instagram", label: "Instagram" },
            { key: "followers_telegram", label: "Telegram" },
            { key: "followers_facebook", label: "Facebook" },
          ]}
        />
        <TrendChart
          title="Engagement darajasi"
          data={series}
          series={[{ key: "engagement_rate", label: "Engagement (%)" }]}
        />
      </div>
    </div>
  );
}
