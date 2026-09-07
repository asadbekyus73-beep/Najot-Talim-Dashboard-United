import { ContentTable } from "@/components/ContentTable";
import { NewContentForm } from "@/components/NewContentForm";
import { getContentItems } from "@/lib/queries";

const REDIRECT = "/smm/kontent-reja";

export default async function KontentRejaPage() {
  const items = await getContentItems("smm");
  const pending = items.filter((i) => i.status !== "published");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-primary">Kontent-reja</h1>
        <p className="text-sm text-secondary">
          Rejalashtirilgan postlar va ularning holati
        </p>
      </div>

      <NewContentForm
        roleScope="smm"
        redirectPath={REDIRECT}
        itemTypes={["Instagram post", "Telegram post", "Reels", "Story"]}
      />

      <ContentTable items={pending} redirectPath={REDIRECT} canDeleteOwn />
    </div>
  );
}
