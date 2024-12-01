import { Button } from "@/components/ui/button";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center relative">
      {children}
      <Button className="w-14 h-14 z-10 fixed right-6 bottom-6 block sm:hidden">
        <h1 className="text-4xl">+</h1>
      </Button>
    </div>
  );
}
