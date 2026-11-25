"use client";

import { useLocale, useTranslations } from "next-intl";
import AddBonDialog from "@/Components/features/clients/add-bon-dialog";
import AddPaymentDialog from "@/Components/features/clients/add-payment-dialog";
import DashboardHeader from "@/Components/features/admin/page-header";
import { TableBuilder } from "@/Components/features/admin/table-builder";
import { TableCell, TableRow } from "@/Components/UI/table";
import { useRouter } from "@/i18n/navigation";
import CrmSummaryStats from "@/Components/features/clients/crm-summary-stats";
import { cn } from "@/lib/utils/cn";
import { formatEgp, formatNumber } from "@/lib/utils/money";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";

type BonRow = {
  id: string;
  title: string;
  date: string;
  containerNumber: string | null;
  containerLabel: string | null;
  linesCount: number;
  supplies: number;
  remaining: number;
};

type ClientDetailViewProps = {
  client: {
    id: string;
    name: string;
    notes: string | null;
    supplies: number;
    payments: number;
    balance: number;
  };
  bons: BonRow[];
};

export default function ClientDetailView({ client, bons }: ClientDetailViewProps) {
  const t = useTranslations("Clients");
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="space-y-5">
      <DashboardHeader
        breadcrumbs={[
          { label: t("title"), href: "/clients" },
          { label: client.name },
        ]}
        action={
          <>
            <AddPaymentDialog clientId={client.id} />
            <AddBonDialog clientId={client.id} />
          </>
        }
      />

      <CrmSummaryStats
        stats={[
          {
            label: t("columns.supplies"),
            value: client.supplies,
            icon: BsBarChartFill,
            iconColor: "#2563EB",
            isCurrency: true,
          },
          {
            label: t("columns.payments"),
            value: client.payments,
            icon: FaMoneyBillWave,
            iconColor: "#059669",
            isCurrency: true,
          },
          {
            label: t("columns.balance"),
            value: client.balance,
            icon: FaWallet,
            iconColor: "#8B5CF6",
            isCurrency: true,
            valueClassName: cn(
              client.balance < 0 ? "text-error!" : client.balance > 0 ? "text-brand-primary!" : undefined,
            ),
          },
        ]}
      />

      {client.notes ? (
        <p className="rounded-xl bg-surface-raised px-4 py-3 text-sm text-weaker">{client.notes}</p>
      ) : null}

      {/* Bons table — click row to open details */}
      <div className="space-y-3">
        <DashboardHeader title={t("bons.section")} description={t("bons.hint")} variant="transparent" />
        <TableBuilder
          tableHeadNames={[
            { headName: "Clients.bons.columns.title", className: "text-start!" },
            { headName: "Clients.bons.columns.date" },
            { headName: "Clients.bons.columns.lines" },
            { headName: "Clients.bons.columns.supplies" },
            { headName: "Clients.bons.columns.remaining" },
          ]}
          tableData={bons}
          emptyState={
            <div className="py-10 text-center text-sm text-weaker">{t("bons.empty")}</div>
          }
          renderRow={(bon) => (
            <TableRow
              key={bon.id}
              className="cursor-pointer hover:bg-surface-neutral/50"
              onClick={() => router.push(`/clients/${client.id}/bons/${bon.id}`)}
            >
              <TableCell className="text-start">
                <p className="font-semibold text-strong">{bon.title}</p>
                {bon.containerLabel || bon.containerNumber ? (
                  <p className="text-xs text-weaker">
                    {[bon.containerLabel, bon.containerNumber].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
                  new Date(bon.date),
                )}
              </TableCell>
              <TableCell>{formatNumber(bon.linesCount, locale, 0)}</TableCell>
              <TableCell>{formatEgp(bon.supplies, locale)}</TableCell>
              <TableCell
                className={cn(
                  "font-semibold",
                  bon.remaining < 0 ? "text-error" : "text-strong",
                )}
              >
                {formatEgp(bon.remaining, locale)}
              </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
}
