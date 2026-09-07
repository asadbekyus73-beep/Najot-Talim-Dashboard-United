import { getCampaigns } from "@/lib/queries";

function formatMoney(n: number) {
  return new Intl.NumberFormat("uz-UZ").format(n);
}

export default async function KampaniyalarPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Kampaniyalar</h1>
        <p className="text-sm text-secondary">
          Reklama kampaniyalari va byudjet taqsimoti
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium text-secondary">
              <th className="px-4 py-3">Kampaniya</th>
              <th className="px-4 py-3">Kanal</th>
              <th className="px-4 py-3">Byudjet</th>
              <th className="px-4 py-3">Sarflangan</th>
              <th className="px-4 py-3">Lidlar</th>
              <th className="px-4 py-3">Yozilganlar</th>
              <th className="px-4 py-3">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => {
              const roas = c.spent > 0 ? (c.enrollments * 500000) / c.spent : 0;
              return (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium text-primary">{c.name}</td>
                  <td className="px-4 py-3 text-secondary">{c.channel}</td>
                  <td className="px-4 py-3 text-secondary">{formatMoney(c.budget)} so'm</td>
                  <td className="px-4 py-3 text-secondary">{formatMoney(c.spent)} so'm</td>
                  <td className="px-4 py-3 text-secondary">{c.leads}</td>
                  <td className="px-4 py-3 text-secondary">{c.enrollments}</td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {roas.toFixed(2)}x
                  </td>
                </tr>
              );
            })}
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted">
                  Hozircha kampaniya qo'shilmagan
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
