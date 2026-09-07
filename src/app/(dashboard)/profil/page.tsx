import { getCurrentProfile } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/nav";
import { ChangePasswordForm } from "./ChangePasswordForm";

export default async function ProfilPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Profil</h1>
        <p className="text-sm text-secondary">Shaxsiy ma'lumotlar</p>
      </div>

      <div className="max-w-sm rounded-xl border border-line bg-surface p-4 shadow-sm">
        <p className="text-sm text-secondary">Ism</p>
        <p className="mb-3 font-medium text-primary">{profile.full_name}</p>
        <p className="text-sm text-secondary">Email</p>
        <p className="mb-3 font-medium text-primary">{profile.email}</p>
        <p className="text-sm text-secondary">Lavozim</p>
        <p className="font-medium text-primary">{ROLE_LABELS[profile.role]}</p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-primary">
          Parolni almashtirish
        </h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
