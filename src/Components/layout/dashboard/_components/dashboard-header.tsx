import { Suspense } from "react";
import { SidebarHeader, SidebarTrigger } from "@/Components/UI/sidebar";
import DarkModeSwitcher from "./dark-mode-switcher";
import GlobalSearch from "./global-search";
import LanguageSwitcher from "./language-switcher";
import NotificationButton from "./notification-button";
import UserMenu from "./user-menu";

export default function DashboardHeader() {
  return (
    <SidebarHeader className="h-18 bg-surface-raised p-0">
      <div className="flex h-full w-full items-center justify-between bg-surface-raised px-5 py-3 ltr:rounded-tl-xl rtl:rounded-tr-xl">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <div className="hidden md:block">
            <Suspense fallback={null}>
              <GlobalSearch variant="input" />
            </Suspense>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="md:hidden">
            <Suspense fallback={null}>
              <GlobalSearch variant="icon" />
            </Suspense>
          </div>
          <NotificationButton />
          <div className="hidden md:contents">
            <DarkModeSwitcher />
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
          </div>
          <UserMenu />
        </div>
      </div>
    </SidebarHeader>
  );
}
