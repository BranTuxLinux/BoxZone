"use client";
import { Toggle } from "@radix-ui/react-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { axiosClient } from "@/lib/axios";
import { IItem } from "@/backend/models/Items";
import { ItemCard } from "./ItemsCard";

export const ItemsSection = ({ InventoryId }: { InventoryId: string }) => {
  const [data, setData] = useState<IItem[] | null>(null);
  console.log(InventoryId);
  useEffect(() => {
    axiosClient
      .get(`/api/items?inventoryId=${InventoryId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [InventoryId]);
  const HandleClick = () => {
    console.log(data);
  };
  console.log(data);

  // !filtrar por palabras clave
  return (
    <>
      <div className="flex items-center justify-end my-10 w-10/12">
        <h1 className="mx-5">
          <Toggle> Ordenar Por Fecha</Toggle>
        </h1>
        <Input placeholder="Search" type="search" className="w-full sm:w-1/4" />
        <Button className="hidden sm:mx-5 sm:block">
          Crear nuevo Inventario
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {data == null && <h1 className="">Cargando...</h1>}
        {data?.length === 0 && <h1 className="">No hay Items aun</h1>}
        {Array.isArray(data) &&
          data?.map((item) => (
            <ItemCard
              price={item.price}
              quantity={item.quantity}
              inventoryId={item.inventoryId.toString()}
              category={item?.categoryId?.toString()}
              onDelete={HandleClick}
              onUpdate={HandleClick}
            />
          ))}
      </div>
    </>
  );
};
