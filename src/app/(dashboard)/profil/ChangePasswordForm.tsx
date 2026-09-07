"use client";

import { useActionState } from "react";
import { updatePassword } from "@/lib/actions/profile";

const INPUT_CLASS =
  "rounded-lg border border-line bg-surface px-3 py-2 text-sm text-primary outline-none focus:border-accent";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<
    { error: string | null; success: boolean },
    FormData
  >(updatePassword, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="flex max-w-sm flex-col gap-3">
      <input
        name="password"
        type="password"
        placeholder="Yangi parol"
        required
        minLength={8}
        className={INPUT_CLASS}
      />
      <input
        name="confirm"
        type="password"
        placeholder="Yangi parolni takrorlang"
        required
        minLength={8}
        className={INPUT_CLASS}
      />
      {state.error ? (
        <p className="rounded-md border border-danger-border bg-danger-soft px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="rounded-md border border-success-border bg-success-soft px-3 py-2 text-sm text-success">
          Parol muvaffaqiyatli yangilandi.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Saqlanmoqda..." : "Parolni yangilash"}
      </button>
    </form>
  );
}
