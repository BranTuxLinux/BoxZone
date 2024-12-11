import { auth } from "@/auth";
import { NavbarDashboard } from "@/components/template/dashboard/Navbar";
import { AppSidebar } from "@/components/template/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        
      <NavbarDashboard session={session} />
        {children}
      </main>
    </SidebarProvider>
  );
}
