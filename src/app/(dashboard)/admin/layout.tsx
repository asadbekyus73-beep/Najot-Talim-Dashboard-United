import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["admin"]);
  return <>{children}</>;
}
