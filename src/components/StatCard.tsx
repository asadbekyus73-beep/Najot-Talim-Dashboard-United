export function StatCard({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
      <p className="text-xs font-medium text-secondary">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">
        {value}
        {unit ? (
          <span className="ml-1 text-sm font-medium text-muted">
            {unit}
          </span>
        ) : null}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
