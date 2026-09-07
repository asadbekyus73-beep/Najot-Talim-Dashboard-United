import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// FAQAT server tomonida (API route / seed skript) ishlatiladi.
// service_role kalit RLS'ni chetlab o'tadi — brauzerga hech qachon chiqarilmasin.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
