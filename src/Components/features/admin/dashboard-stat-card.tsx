"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type DashboardStatCardProps = {
  title: string;
  value: number;
  decimalPlaces?: number;
  currency?: string;
  suffix?: string;
  icon: ReactNode;
  iconColor: string;
  valueClassName?: string;
  locale?: string;
};

function formatStatNumber(value: number, decimalPlaces: number, locale: string) {
  return Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

export default function DashboardStatCard({
  title,
  value,
  decimalPlaces = 0,
  currency,
  suffix,
  icon,
  iconColor,
  valueClassName,
  locale = "ar-EG",
}: DashboardStatCardProps) {
  const display = formatStatNumber(Math.abs(value), decimalPlaces, locale);

  return (
    <div className="flex flex-col items-start gap-4 rounded-xl bg-surface-raised p-3">
      <div className="flex w-full items-center justify-between gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full p-2"
          style={{ backgroundColor: `${iconColor}1A` }}
        >
          {icon}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-1 text-start">
        <p className="text-xs font-medium text-weaker">{title}</p>
        <p className={cn("text-lg font-bold leading-7 text-weak", valueClassName)}>
          {value < 0 ? <span className={cn("me-0.5", valueClassName)}>-</span> : null}
          <span className="inline-block tabular-nums tracking-wide">{display}</span>
          {currency ? <span className="ms-1 text-lg font-semibold text-weakest">{currency}</span> : null}
          {suffix ? <span className="ms-1 text-lg font-semibold text-weakest">{suffix}</span> : null}
        </p>
      </div>
    </div>
  );
}