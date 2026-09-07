import { StatCard } from "@/components/StatCard";
import { ROLE_LABELS } from "@/lib/nav";
import { getAllProfiles } from "@/lib/queries";
import type { AppRole } from "@/lib/types";

export default async function AdminPage() {
  const profiles = await getAllProfiles();
  const roles = Object.keys(ROLE_LABELS) as AppRole[];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Bosh sahifa</h1>
        <p className="text-sm text-secondary">Tizimdagi jami xodimlar soni</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Jami xodimlar" value={profiles.length} />
        {roles
          .filter((r) => r !== "admin")
          .map((role) => (
            <StatCard
              key={role}
              label={ROLE_LABELS[role]}
              value={profiles.filter((p) => p.role === role).length}
              unit="kishi"
            />
          ))}
      </div>
    </div>
  );
}
