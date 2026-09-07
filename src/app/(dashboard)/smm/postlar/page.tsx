import { getContentItems } from "@/lib/queries";

export default async function PostlarPage() {
  const items = await getContentItems("smm");
  const published = items
    .filter((i) => i.status === "published")
    .sort((a, b) => (b.metrics.likes ?? 0) - (a.metrics.likes ?? 0));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Postlar reytingi</h1>
        <p className="text-sm text-secondary">
          Nashr etilgan postlar, eng yaxshi natijalar yuqorida
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {published.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-line bg-surface p-4 shadow-sm"
          >
            <p className="text-xs font-medium text-muted">{item.item_type}</p>
            <p className="mt-1 font-semibold text-primary">{item.title}</p>
            <div className="mt-3 flex gap-4 text-sm text-secondary">
              <span>❤️ {item.metrics.likes ?? 0}</span>
              <span>👁 {item.metrics.views ?? 0}</span>
              <span>💬 {item.metrics.comments ?? 0}</span>
            </div>
          </div>
        ))}
        {published.length === 0 ? (
          <p className="text-sm text-muted">
            Hozircha nashr etilgan post yo'q
          </p>
        ) : null}
      </div>
    </div>
  );
}
