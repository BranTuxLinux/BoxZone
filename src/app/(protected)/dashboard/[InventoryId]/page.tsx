import { ItemsSection } from "@/components/ItemsSection";
import { Input } from "@/components/ui/input";
import { Toggle } from "@radix-ui/react-toggle";
import { Button } from "flowbite-react";

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
