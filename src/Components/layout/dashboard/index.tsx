import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/Components/UI/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <DashboardHeader />
        <div className="h-full w-full bg-surface-base px-5 pt-4 pb-20">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
