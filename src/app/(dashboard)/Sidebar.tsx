"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/nav";

export function Sidebar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex w-60 shrink-0 flex-col gap-1 border-r border-line bg-surface p-4">
      <div className="mb-4 px-2">
        <p className="text-sm font-bold text-primary">Najot Ta'lim</p>
        <p className="text-xs text-muted">Marketing Dashboard</p>
      </div>
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-accent text-white"
                : "text-secondary hover:bg-surface-hover"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
