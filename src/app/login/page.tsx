import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="text-xl font-bold text-primary">Najot Ta'lim</h1>
        <p className="mb-6 text-sm text-secondary">
          Marketing bo'limi analitik dashboardi
        </p>
        <LoginForm />
        <p className="mt-6 text-xs text-muted">
          Ro'yxatdan o'tish yopiq. Kirish uchun ma'lumot administrator
          tomonidan beriladi.
        </p>
      </div>
    </div>
  );
}
