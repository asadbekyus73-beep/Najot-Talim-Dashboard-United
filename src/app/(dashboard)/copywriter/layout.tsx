import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function CopywriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["copywriter", "admin"]);
  return <>{children}</>;
}
