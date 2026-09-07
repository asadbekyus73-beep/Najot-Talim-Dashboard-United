"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROLE_LABELS } from "@/lib/nav";
import type { AppRole, Profile } from "@/lib/types";

const ASSIGNABLE_ROLES: AppRole[] = [
  "marketing_head",
  "smm",
  "copywriter",
  "videographer",
  "it",
  "admin",
];

const INPUT_CLASS =
  "rounded-lg border border-line bg-surface px-3 py-2 text-sm text-primary outline-none focus:border-accent";

export function EmployeeManager({ profiles }: { profiles: Profile[] }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ email: string; tempPassword: string } | null>(
    null
  );

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setCreated(null);

    const res = await fetch("/api/admin/xodimlar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        full_name: formData.get("full_name"),
        role: formData.get("role"),
      }),
    });
    const data = await res.json();
    setPending(false);

    if (!res.ok) {
      setError(data.error ?? "Xatolik yuz berdi");
      return;
    }

    setCreated(data);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Xodimni o'chirishga ishonchingiz komilmi?")) return;
    await fetch("/api/admin/xodimlar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        action={handleSubmit}
        className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
      >
        <input
          name="full_name"
          required
          placeholder="Ism familiya"
          className={INPUT_CLASS}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="email@najottalim.uz"
          className={INPUT_CLASS}
        />
        <select name="role" required defaultValue="" className={INPUT_CLASS}>
          <option value="" disabled>
            Rol
          </option>
          {ASSIGNABLE_ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {pending ? "Qo'shilmoqda..." : "Xodim qo'shish"}
        </button>
      </form>

      {error ? (
        <p className="rounded-md border border-danger-border bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      ) : null}

      {created ? (
        <p className="rounded-md border border-success-border bg-success-soft px-3 py-2 text-sm text-success">
          Xodim qo'shildi. Vaqtinchalik parol: <b>{created.tempPassword}</b> (
          {created.email}) — bu parolni faqat shu yerda ko'rasiz, uni xodimga
          xavfsiz usulda yetkazing.
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-line bg-surface shadow-sm">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium text-secondary">
              <th className="px-4 py-3">Ism</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-primary">{p.full_name}</td>
                <td className="px-4 py-3 text-secondary">{p.email}</td>
                <td className="px-4 py-3 text-secondary">{ROLE_LABELS[p.role]}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded-md border border-danger-border px-2 py-1 text-xs font-medium text-danger hover:bg-danger-soft"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
