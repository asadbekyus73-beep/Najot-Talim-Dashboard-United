import { ContentTable } from "@/components/ContentTable";
import { NewContentForm } from "@/components/NewContentForm";
import { StatCard } from "@/components/StatCard";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { getContentItems, getLatestKpi } from "@/lib/queries";

const REDIRECT = "/copywriter";

export default async function CopywriterPage() {
  const [items, latest] = await Promise.all([
    getContentItems("copywriter"),
    getLatestKpi("copywriter"),
  ]);
  const active = items.filter((i) => i.status !== "published");
  const defs = METRICS_BY_ROLE.copywriter;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Topshiriqlar</h1>
        <p className="text-sm text-secondary">
          Yozish kerak bo'lgan matnlar va muddatlar
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

      <NewContentForm
        roleScope="copywriter"
        redirectPath={REDIRECT}
        itemTypes={["Blog maqola", "Landing matni", "Reklama matni", "Email"]}
      />

      <ContentTable items={active} redirectPath={REDIRECT} canDeleteOwn />
    </div>
  );
}
