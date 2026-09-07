import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function SmmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["smm", "admin"]);
  return <>{children}</>;
}
