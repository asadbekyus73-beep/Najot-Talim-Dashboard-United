import { getCurrentProfile, requireRole } from "@/lib/auth";

export default async function MarketingHeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  requireRole(profile, ["marketing_head", "admin"]);
  return <>{children}</>;
}
