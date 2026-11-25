"use client";

import { useLocale } from "next-intl";
import type { IconType } from "react-icons";
import { BsBarChartFill } from "react-icons/bs";
import { FaMoneyBillWave, FaWallet, FaUsers } from "react-icons/fa6";
import DashboardStatCard from "@/Components/features/admin/dashboard-stat-card";
import { cn } from "@/lib/utils/cn";

export type CrmSummaryStat = {
  label: string;
  value: number;
  icon?: IconType;
  iconColor?: string;
  isCurrency?: boolean;
  valueClassName?: string;
};

const DEFAULT_ICONS = [
  { icon: BsBarChartFill, color: "#2563EB" },
  { icon: FaMoneyBillWave, color: "#F97316" },
  { icon: FaWallet, color: "#059669" },
  { icon: FaUsers, color: "#8B5CF6" },
];

type CrmSummaryStatsProps = {
  stats: CrmSummaryStat[];
  currencyLabel?: string;
  className?: string;
};

export default function CrmSummaryStats({
  stats,
  currencyLabel = "EGP",
  className,
}: CrmSummaryStatsProps) {
  const locale = useLocale();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        stats.length === 3 && "xl:grid-cols-3",
        stats.length === 4 && "xl:grid-cols-4",
        stats.length < 3 && "sm:grid-cols-1",
        className,
      )}
    >
      {stats.map((stat, index) => {
        const fallback = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
        const Icon = stat.icon ?? fallback.icon;
        const iconColor = stat.iconColor ?? fallback.color;
        const isCurrency = stat.isCurrency ?? index > 0;

        return (
          <DashboardStatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            decimalPlaces={isCurrency ? 2 : 0}
            currency={isCurrency ? currencyLabel : undefined}
            icon={<Icon className="size-5" style={{ color: iconColor }} aria-hidden />}
            iconColor={iconColor}
            valueClassName={stat.valueClassName}
            locale={locale}
          />
        );
      })}
    </div>
  );
}