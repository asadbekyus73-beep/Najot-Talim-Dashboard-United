"use client";

import { createContentItem } from "@/lib/actions/content";
import type { AppRole } from "@/lib/types";

const INPUT_CLASS =
  "rounded-lg border border-line bg-surface px-3 py-2 text-sm text-primary outline-none focus:border-accent";

export function NewContentForm({
  roleScope,
  redirectPath,
  itemTypes,
}: {
  roleScope: AppRole;
  redirectPath: string;
  itemTypes: string[];
}) {
  const action = createContentItem.bind(null, roleScope, redirectPath);

  return (
    <form
      action={action}
      className="grid grid-cols-1 gap-3 rounded-xl border border-line bg-surface p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
    >
      <input
        name="title"
        required
        placeholder="Sarlavha"
        className={INPUT_CLASS}
      />
      <select name="item_type" required defaultValue="" className={INPUT_CLASS}>
        <option value="" disabled>
          Turi
        </option>
        {itemTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input name="due_date" type="date" className={INPUT_CLASS} />
      <input
        name="description"
        placeholder="Izoh (ixtiyoriy)"
        className={`${INPUT_CLASS} lg:col-span-1`}
      />
      <button
        type="submit"
        className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Qo'shish
      </button>
    </form>
  );
}
