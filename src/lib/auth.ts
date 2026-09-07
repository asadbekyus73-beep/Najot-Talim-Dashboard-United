import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ROLE_HOME } from "@/lib/nav";
import type { AppRole, Profile } from "@/lib/types";

export async function getCurrentProfile(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  return profile as Profile;
}

export function requireRole(profile: Profile, allowed: AppRole[]) {
  if (!allowed.includes(profile.role)) {
    redirect(ROLE_HOME[profile.role]);
  }
}
