"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type DashboardLogoProps = {
  isCollapsed: boolean;
  dark?: boolean;
  className?: string;
};

export default function DashboardLogo({ isCollapsed, className }: DashboardLogoProps) {
  const t = useTranslations("Common");

  return (
    <div
      className={cn("relative mx-auto mt-2 flex h-12 w-full shrink-0 items-center justify-center px-3", className)}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary-600 text-white transition-all",
          isCollapsed ? "size-10" : "h-11 w-full gap-2 px-3",
        )}
      >
        <span className="text-sm font-bold tracking-wide">CRM</span>
        {!isCollapsed ? (
          <span className="truncate text-sm font-medium opacity-90">{t("appName")}</span>
        ) : null}
      </div>
    </div>
  );
}
