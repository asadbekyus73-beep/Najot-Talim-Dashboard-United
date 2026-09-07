import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function MobilografLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["videographer", "admin"]);
  return <>{children}</>;
}
