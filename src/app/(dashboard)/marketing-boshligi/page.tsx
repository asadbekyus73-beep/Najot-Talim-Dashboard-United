import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { getKpiSeries, getLatestKpi } from "@/lib/queries";

export default async function MarketingHeadPage() {
  const [series, latest] = await Promise.all([
    getKpiSeries("marketing_head", 30),
    getLatestKpi("marketing_head"),
  ]);
  const defs = METRICS_BY_ROLE.marketing_head;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Umumiy ko'rinish</h1>
        <p className="text-sm text-secondary">
          So'nggi 30 kunlik marketing ko'rsatkichlari
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
          title="Yangi lidlar dinamikasi"
          data={series}
          series={[{ key: "leads", label: "Lidlar" }]}
        />
        <TrendChart
          title="Konversiya va ROAS"
          data={series}
          series={[
            { key: "conversion_rate", label: "Konversiya (%)" },
            { key: "roas", label: "ROAS (x)" },
          ]}
        />
      </div>
    </div>
  );
}
