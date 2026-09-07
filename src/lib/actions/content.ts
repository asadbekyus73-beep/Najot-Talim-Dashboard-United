"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AppRole, ContentStatus } from "@/lib/types";

export async function createContentItem(
  roleScope: AppRole,
  redirectPath: string,
  formData: FormData
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const title = String(formData.get("title") ?? "").trim();
  const item_type = String(formData.get("item_type") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const due_date = String(formData.get("due_date") ?? "").trim() || null;

  if (!title || !item_type) return;

  await supabase.from("content_items").insert({
    role_scope: roleScope,
    item_type,
    title,
    description,
    due_date,
    author_id: user.id,
  });

  revalidatePath(redirectPath);
}

export async function setContentStatus(
  id: string,
  status: ContentStatus,
  redirectPath: string
) {
  const supabase = await createClient();
  const update: { status: ContentStatus; published_at?: string } = { status };
  if (status === "published") {
    update.published_at = new Date().toISOString();
  }
  await supabase.from("content_items").update(update).eq("id", id);
  revalidatePath(redirectPath);
}

export async function deleteContentItem(id: string, redirectPath: string) {
  const supabase = await createClient();
  await supabase.from("content_items").delete().eq("id", id);
  revalidatePath(redirectPath);
}
