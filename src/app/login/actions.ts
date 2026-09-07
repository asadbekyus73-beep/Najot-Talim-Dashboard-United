"use server";

import { createClient } from "@/lib/supabase/server";
import { ROLE_HOME } from "@/lib/nav";
import type { AppRole } from "@/lib/types";
import { redirect } from "next/navigation";

export async function signIn(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email va parolni kiriting." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Email yoki parol noto'g'ri." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role as AppRole | undefined;

  if (!role) {
    await supabase.auth.signOut();
    return {
      error:
        "Profil topilmadi. Iltimos, tizim administratoriga murojaat qiling.",
    };
  }

  redirect(ROLE_HOME[role]);
}
