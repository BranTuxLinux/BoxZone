import { NavbarDashboard } from "@/components/template/dashboard/Navbar";
import { AppSidebar } from "@/components/template/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        
      <NavbarDashboard />
        {children}
      </main>
    </SidebarProvider>
  );
}
