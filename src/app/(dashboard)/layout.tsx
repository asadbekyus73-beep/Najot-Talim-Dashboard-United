import { getCurrentProfile } from "@/lib/auth";
import { ROLE_LABELS, ROLE_NAV } from "@/lib/nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "./Sidebar";
import { signOut } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  const items = ROLE_NAV[profile.role];

  return (
    <div className="flex min-h-screen flex-1">
      <Sidebar items={items} />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              {profile.full_name}
            </p>
            <p className="text-xs text-secondary">
              {ROLE_LABELS[profile.role]}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-secondary hover:bg-surface-hover"
              >
                Chiqish
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 bg-page p-6">{children}</main>
      </div>
    </div>
  );
}
