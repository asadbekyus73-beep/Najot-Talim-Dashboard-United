import { STATUS_COLOR } from "@/lib/palette";

const CONTENT_STATUS_MAP: Record<string, { label: string; tone: keyof typeof STATUS_COLOR }> = {
  draft: { label: "Qoralama", tone: "warning" },
  review: { label: "Tekshiruvda", tone: "serious" },
  approved: { label: "Tasdiqlangan", tone: "good" },
  published: { label: "Nashr etilgan", tone: "good" },
};

const INTEGRATION_STATUS_MAP: Record<string, { label: string; tone: keyof typeof STATUS_COLOR }> = {
  connected: { label: "Ulangan", tone: "good" },
  disconnected: { label: "Uzilgan", tone: "warning" },
  error: { label: "Xatolik", tone: "critical" },
};

export function StatusBadge({
  status,
  kind = "content",
}: {
  status: string;
  kind?: "content" | "integration";
}) {
  const map = kind === "content" ? CONTENT_STATUS_MAP : INTEGRATION_STATUS_MAP;
  const entry = map[status] ?? { label: status, tone: "warning" as const };
  const color = STATUS_COLOR[entry.tone];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ borderColor: color, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {entry.label}
    </span>
  );
}
