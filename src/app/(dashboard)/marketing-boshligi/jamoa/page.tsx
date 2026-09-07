import { ContentTable } from "@/components/ContentTable";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { METRICS_BY_ROLE } from "@/lib/metrics";
import { ROLE_LABELS } from "@/lib/nav";
import { getAllProfiles, getContentItems, getLatestKpi } from "@/lib/queries";
import type { AppRole } from "@/lib/types";

const TEAM_ROLES: AppRole[] = ["smm", "copywriter", "videographer", "it"];
const REDIRECT = "/marketing-boshligi/jamoa";

export default async function JamoaPage() {
  const [profiles, contentItems, ...latestByRole] = await Promise.all([
    getAllProfiles(),
    getContentItems(),
    ...TEAM_ROLES.map((role) => getLatestKpi(role)),
  ]);

  const pendingReview = contentItems.filter((c) => c.status === "review");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Jamoa</h1>
        <p className="text-sm text-secondary">
          Har bir yo'nalish bo'yicha xodimlar soni va asosiy ko'rsatkich
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEAM_ROLES.map((role, idx) => {
          const headline = METRICS_BY_ROLE[role][0];
          const latest = latestByRole[idx];
          const memberCount = profiles.filter((p) => p.role === role).length;
          const roleItems = contentItems.filter((c) => c.role_scope === role);

          return (
            <div
              key={role}
              className="rounded-xl border border-line bg-surface p-4 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-primary">
                  {ROLE_LABELS[role]}
                </p>
                <span className="text-xs text-muted">
                  {memberCount} xodim
                </span>
              </div>
              {headline ? (
                <StatCard
                  label={headline.label}
                  value={latest.get(headline.key)?.metric_value ?? "—"}
                  unit={headline.unit}
                />
              ) : null}
              <p className="mt-3 mb-2 text-xs font-medium text-secondary">
                Kontent holati ({roleItems.length} ta)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {roleItems.slice(0, 6).map((item) => (
                  <StatusBadge key={item.id} status={item.status} />
                ))}
                {roleItems.length === 0 ? (
                  <span className="text-xs text-muted">
                    Hozircha kontent qo'shilmagan
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Tasdiqlashni kutayotgan kontentlar ({pendingReview.length})
        </h2>
        <ContentTable items={pendingReview} redirectPath={REDIRECT} canApprove />
      </div>
    </div>
  );
}
