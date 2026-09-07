"use server";

import { createClient } from "@/lib/supabase/server";

export async function updatePassword(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "Parol kamida 8 belgidan iborat bo'lishi kerak.", success: false };
  }
  if (password !== confirm) {
    return { error: "Parollar mos kelmadi.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message, success: false };
  }

  return { error: null, success: true };
}
