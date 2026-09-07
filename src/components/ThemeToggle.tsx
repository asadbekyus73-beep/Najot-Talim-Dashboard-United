"use client";

import { useIsDark } from "@/lib/useIsDark";

export function ThemeToggle() {
  const isDark = useIsDark();

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage mavjud bo'lmasa (masalan maxfiy rejim) — e'tiborsiz qoldiriladi
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
      title={isDark ? "Kunduzgi rejim" : "Tungi rejim"}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-secondary transition-colors hover:bg-surface-hover"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm9-6a1 1 0 010 2h-1a1 1 0 110-2h1zM4 12a1 1 0 010 2H3a1 1 0 110-2h1zm14.36-6.36a1 1 0 011.42 1.42l-.71.71a1 1 0 11-1.42-1.42l.71-.71zM6.34 17.66a1 1 0 011.42 1.42l-.71.71a1 1 0 11-1.42-1.42l.71-.71zm11.31 1.42a1 1 0 01-1.41-1.42l.7-.7a1 1 0 111.42 1.41l-.71.71zM7.05 6.34a1 1 0 01-1.41-1.42l.7-.7a1 1 0 111.42 1.41l-.71.71zM12 20a1 1 0 011 1v0a1 1 0 11-2 0v0a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
        </svg>
      )}
    </button>
  );
}
