import { ExportCsvButton } from "@/components/ExportCsvButton";
import { ROLE_LABELS } from "@/lib/nav";
import { getAllKpiRaw } from "@/lib/queries";

export default async function HisobotlarPage() {
  const rows = await getAllKpiRaw(30);
  const csvRows = rows.map((r) => ({
    sana: r.date,
    bolim: ROLE_LABELS[r.role_scope],
    korsatkich: r.metric_key,
    qiymat: r.metric_value,
    birlik: r.unit ?? "",
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-primary">Hisobotlar</h1>
          <p className="text-sm text-secondary">
            So'nggi 30 kunlik barcha ko'rsatkichlar (xom ma'lumot)
          </p>
        </div>
        <ExportCsvButton filename="najot-talim-hisobot.csv" rows={csvRows} />
      </div>

      <div className="max-h-[600px] overflow-auto rounded-xl border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="sticky top-0 bg-surface">
            <tr className="border-b border-line text-left text-xs font-medium text-secondary">
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Bo'lim</th>
              <th className="px-4 py-3">Ko'rsatkich</th>
              <th className="px-4 py-3">Qiymat</th>
              <th className="px-4 py-3">Birlik</th>
            </tr>
          </thead>
          <tbody>
            {csvRows.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-4 py-2 text-secondary">{r.sana}</td>
                <td className="px-4 py-2 text-secondary">{r.bolim}</td>
                <td className="px-4 py-2 text-secondary">{r.korsatkich}</td>
                <td className="px-4 py-2 font-medium text-primary">{r.qiymat}</td>
                <td className="px-4 py-2 text-muted">{r.birlik}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
