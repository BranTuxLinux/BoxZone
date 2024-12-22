import { ItemsSection } from "@/components/ItemsSection";

type IParams = {
    params: Promise<{ InventoryId: string }>
  }

export default async function InventoryID({ params }: { params: Promise<{ InventoryId: string }> }) {
    const { InventoryId } = (await params);
    console.log(InventoryId)
  return (
    <>
      <ItemsSection InventoryId={InventoryId} />
    </>
  );
}
