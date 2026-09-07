import { EmployeeManager } from "@/components/EmployeeManager";
import { getAllProfiles } from "@/lib/queries";

export default async function XodimlarPage() {
  const profiles = await getAllProfiles();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Xodimlar</h1>
        <p className="text-sm text-secondary">
          Yangi xodim qo'shish, rol biriktirish va o'chirish
        </p>
      </div>
      <EmployeeManager profiles={profiles} />
    </div>
  );
}
