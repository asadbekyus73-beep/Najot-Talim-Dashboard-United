import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AppRole } from "@/lib/types";

function generateTempPassword() {
  return "Nt-" + Math.random().toString(36).slice(2, 10) + "!1";
}

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "admin";
}

export async function POST(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  const body = await request.json();
  const email = String(body.email ?? "").trim();
  const full_name = String(body.full_name ?? "").trim();
  const role = String(body.role ?? "") as AppRole;

  if (!email || !full_name || !role) {
    return NextResponse.json(
      { error: "Barcha maydonlarni to'ldiring" },
      { status: 400 }
    );
  }

  const tempPassword = generateTempPassword();
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name, role },
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message ?? "Xodim yaratilmadi" },
      { status: 400 }
    );
  }

  return NextResponse.json({ email, tempPassword });
}

export async function DELETE(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "id kerak" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
