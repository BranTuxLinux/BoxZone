"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function CardInventory({
  id,
  name,
  createAt: createdAt,
  updateAt
}: {
  id: string;
  name: string;
  createAt: Date | undefined;
  updateAt: Date | undefined;
}) {
  const router = useRouter();

  const HandleClick = () => { 
    console.log("click")
    console.log(id)
    router.push(`/dashboard/${id}`)
   }
  return (
    <Card
    onClick={HandleClick}
    className="w-max cursor-pointer hover:shadow-lg hover:scale-105 hover:transition-transform transition-transform">
      <CardHeader
      className=" max-w-sm"
      >
        <CardTitle className="text-4xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Creado {createdAt?.toLocaleDateString()}</CardDescription>
        <CardDescription>
          Ultima modificación {updateAt?.toLocaleDateString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
