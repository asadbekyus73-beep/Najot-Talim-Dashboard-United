import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { getKpiSeries, getLatestKpi } from "@/lib/queries";

export default async function ItPage() {
  const [series, latest] = await Promise.all([
    getKpiSeries("it", 30),
    getLatestKpi("it"),
  ]);
  const defs = METRICS_BY_ROLE.it;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Texnik holat</h1>
        <p className="text-sm text-secondary">
          Sayt va tizimlarning so'nggi 30 kunlik ko'rsatkichlari
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
        title="Oylik tashrifchilar dinamikasi"
        data={series}
        series={[{ key: "monthly_visitors", label: "Tashrifchilar" }]}
      />
    </div>
  );
}
