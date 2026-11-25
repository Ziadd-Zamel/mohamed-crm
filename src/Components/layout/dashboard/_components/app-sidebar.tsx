"use client";

import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import type * as React from "react";
import { Sidebar, SidebarContent, SidebarRail, useSidebar } from "@/Components/UI/sidebar";
import { NAV_ITEMS } from "@/lib/constants/nav-items.constant";
import DashboardLogo from "./dashboard-logo";
import { NavMain } from "./nav-main";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const locale = useLocale();
  const { state } = useSidebar();
  const { theme } = useTheme();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar side={locale === "ar" ? "right" : "left"} collapsible="icon" {...props}>
      <SidebarContent className="overflow-y-auto border-none bg-[#E2E8F0] dark:bg-[#1C222D]">
        <DashboardLogo isCollapsed={isCollapsed} dark={theme === "dark"} />
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
