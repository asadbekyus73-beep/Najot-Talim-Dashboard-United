import { setIntegrationStatus } from "@/lib/actions/integrations";
import { getIntegrations } from "@/lib/queries";
import { StatusBadge } from "@/components/StatusBadge";

export default async function IntegratsiyalarPage() {
  const integrations = await getIntegrations();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Integratsiyalar</h1>
        <p className="text-sm text-secondary">
          Tashqi tizimlar bilan ulanish holati
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium text-secondary">
              <th className="px-4 py-3">Tizim</th>
              <th className="px-4 py-3">Holat</th>
              <th className="px-4 py-3">Oxirgi sinxronizatsiya</th>
              <th className="px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map((intg) => (
              <tr key={intg.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-primary">{intg.name}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={intg.status} kind="integration" />
                </td>
                <td className="px-4 py-3 text-secondary">
                  {intg.last_synced_at
                    ? new Date(intg.last_synced_at).toLocaleString("uz-UZ")
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <form action={setIntegrationStatus.bind(null, intg.id, "connected")}>
                      <button className="rounded-md border border-line px-2 py-1 text-xs font-medium text-secondary hover:bg-surface-hover">
                        Ulash
                      </button>
                    </form>
                    <form action={setIntegrationStatus.bind(null, intg.id, "disconnected")}>
                      <button className="rounded-md border border-line px-2 py-1 text-xs font-medium text-secondary hover:bg-surface-hover">
                        Uzish
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
