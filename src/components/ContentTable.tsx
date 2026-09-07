import { setContentStatus, deleteContentItem } from "@/lib/actions/content";
import type { ContentItem, ContentStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

const NEXT_STATUS: Partial<Record<ContentStatus, { to: ContentStatus; label: string }>> = {
  draft: { to: "review", label: "Tekshiruvga yuborish" },
};

const APPROVAL_STATUS: Partial<Record<ContentStatus, { to: ContentStatus; label: string }[]>> = {
  review: [
    { to: "approved", label: "Tasdiqlash" },
    { to: "draft", label: "Qaytarish" },
  ],
  approved: [{ to: "published", label: "Nashr etish" }],
};

export function ContentTable({
  items,
  redirectPath,
  canApprove = false,
  canDeleteOwn = false,
}: {
  items: ContentItem[];
  redirectPath: string;
  canApprove?: boolean;
  canDeleteOwn?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs font-medium text-secondary">
            <th className="px-4 py-3">Sarlavha</th>
            <th className="px-4 py-3">Turi</th>
            <th className="px-4 py-3">Muddat</th>
            <th className="px-4 py-3">Holat</th>
            <th className="px-4 py-3">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const selfAction = NEXT_STATUS[item.status];
            const approvalActions = canApprove ? APPROVAL_STATUS[item.status] : undefined;

            return (
              <tr key={item.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-primary">{item.title}</p>
                  {item.description ? (
                    <p className="text-xs text-muted">{item.description}</p>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-secondary">{item.item_type}</td>
                <td className="px-4 py-3 text-secondary">{item.due_date ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {selfAction ? (
                      <form
                        action={setContentStatus.bind(
                          null,
                          item.id,
                          selfAction.to,
                          redirectPath
                        )}
                      >
                        <button className="rounded-md border border-line px-2 py-1 text-xs font-medium text-secondary hover:bg-surface-hover">
                          {selfAction.label}
                        </button>
                      </form>
                    ) : null}
                    {approvalActions?.map((a) => (
                      <form
                        key={a.to}
                        action={setContentStatus.bind(null, item.id, a.to, redirectPath)}
                      >
                        <button className="rounded-md border border-line px-2 py-1 text-xs font-medium text-secondary hover:bg-surface-hover">
                          {a.label}
                        </button>
                      </form>
                    ))}
                    {canDeleteOwn ? (
                      <form action={deleteContentItem.bind(null, item.id, redirectPath)}>
                        <button className="rounded-md border border-danger-border px-2 py-1 text-xs font-medium text-danger hover:bg-danger-soft">
                          O'chirish
                        </button>
                      </form>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-muted">
                Hozircha kontent qo'shilmagan
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
