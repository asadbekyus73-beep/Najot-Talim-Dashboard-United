"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Integration } from "@/lib/types";

export async function setIntegrationStatus(
  id: number,
  status: Integration["status"]
) {
  const supabase = await createClient();
  await supabase
    .from("integrations")
    .update({ status, last_synced_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/it/integratsiyalar");
}
