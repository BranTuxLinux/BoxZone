"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardInventory() {
  return (
    <Card className="w-max ">
      <CardHeader>
        <CardTitle className="text-4xl">Inventario</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Creado 24/02/2024 </CardDescription>
        <CardDescription>Ultima modificación 24/02/2024 </CardDescription>
      </CardContent>
    </Card>
  );
}
