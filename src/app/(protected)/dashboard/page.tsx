import { CardInventory } from "@/components/card";
import { CardInventorySection } from "@/components/CardInventorySection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

async function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-end my-10 w-10/12">
        <h1 className="mx-5">
          <Toggle> Ordenar Por Fecha</Toggle>
        </h1>
        <Input placeholder="Search" type="search" className="w-full sm:w-1/4" />
        <Button className="hidden sm:mx-5 sm:block">Crear nuevo Inventario</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        <CardInventorySection />
      </div>
    </>
  );
}

export default Dashboard;
