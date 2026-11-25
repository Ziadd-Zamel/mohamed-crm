"use client";

import { FaMoneyBillWave, FaUsers, FaWallet } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import CrmSummaryStats, { type CrmSummaryStat } from "@/Components/features/clients/crm-summary-stats";
import { cn } from "@/lib/utils/cn";

type DashboardHomeStatsProps = {
  clientsCount: number;
  supplies: number;
  payments: number;
  balance: number;
};

export default function DashboardHomeStats({
  clientsCount,
  supplies,
  payments,
  balance,
}: DashboardHomeStatsProps) {
  const tClients = useTranslations("Clients");
  const t = useTranslations("Dashboard");

  const stats: CrmSummaryStat[] = [
    {
      label: tClients("title"),
      value: clientsCount,
      icon: FaUsers,
      iconColor: "#2563EB",
      isCurrency: false,
    },
    {
      label: tClients("columns.supplies"),
      value: supplies,
      icon: BsBarChartFill,
      iconColor: "#2563EB",
      isCurrency: true,
    },
    {
      label: tClients("columns.payments"),
      value: payments,
      icon: FaMoneyBillWave,
      iconColor: "#059669",
      isCurrency: true,
    },
    {
      label: tClients("columns.balance"),
      value: balance,
      icon: FaWallet,
      iconColor: "#8B5CF6",
      isCurrency: true,
      valueClassName: cn(
        balance < 0 ? "text-error!" : balance > 0 ? "text-brand-primary!" : undefined,
      ),
    },
  ];

  return (
    <CrmSummaryStats stats={stats} currencyLabel={t("currency")} />
  );
}