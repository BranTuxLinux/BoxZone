import { NavbarDashboard } from "@/components/template/dashboard/Navbar";
import React from "react";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="">
      <NavbarDashboard />{children}
    </main>
  );
}
