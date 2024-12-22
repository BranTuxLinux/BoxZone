"use client";
import { Toggle } from "@radix-ui/react-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState, useTransition } from "react";
import { axiosClient } from "@/lib/axios";
import { IItem } from "@/backend/models/Items";
import { ItemCard } from "./ItemsCard";
import { CreateItems } from "./CreateItem";

export const ItemsSection = ({ InventoryId }: { InventoryId: string }) => {
  const [data, setData] = useState<IItem[] | null>(null);
  const [filteredData, setFilteredData] = useState<IItem[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    axiosClient
      .get(`/api/items?inventoryId=${InventoryId}`)
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data); // Inicialmente muestra todo
      })
      .catch((err) => {
        console.error(err);
      });
  }, [InventoryId]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    startTransition(() => {
      if (data) {
        const lowerQuery = query.toLowerCase();
        const filtered = data.filter((item) =>
          item?.price?.toString().toLowerCase().includes(lowerQuery)
        );
        setFilteredData(filtered);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-end my-10 w-10/12">
        <h1 className="mx-5">
          <Toggle>Ordenar Por Fecha</Toggle>
        </h1>
        <Input
          placeholder="Search"
          type="search"
          className="w-full sm:w-1/4"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <CreateItems InventoryID={InventoryId} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <h1>Cargando resultados...</h1>}
        {filteredData == null && <h1>Cargando...</h1>}
        {filteredData?.length === 0 && <h1>No hay Items aun</h1>}
        {Array.isArray(filteredData) &&
          filteredData.map((item) => (
            <ItemCard
              // key={item._id}
              price={item.price}
              quantity={item.quantity}
              inventoryId={item.inventoryId.toString()}
              category={item?.categoryId?.toString()}
              onDelete={() => console.log("Deleted:", item)}
              onUpdate={() => console.log("Updated:", item)}
            />
          ))}
      </div>
    </>
  );
};
