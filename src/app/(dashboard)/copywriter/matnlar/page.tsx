import { ContentTable } from "@/components/ContentTable";
import { getContentItems } from "@/lib/queries";

export default async function MatnlarArxiviPage() {
  const items = await getContentItems("copywriter");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Matnlar arxivi</h1>
        <p className="text-sm text-secondary">
          Barcha yozilgan matnlar va ularning holati
        </p>
      </div>

      <ContentTable items={items} redirectPath="/copywriter/matnlar" />
    </div>
  );
}
