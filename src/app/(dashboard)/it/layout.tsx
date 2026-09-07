import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function ItLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["it", "admin"]);
  return <>{children}</>;
}
