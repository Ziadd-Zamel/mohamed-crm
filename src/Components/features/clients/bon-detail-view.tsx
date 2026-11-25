"use client";

import { useLocale, useTranslations } from "next-intl";
import AddBonLineDialog from "@/Components/features/clients/add-bon-line-dialog";
import AddPaymentDialog from "@/Components/features/clients/add-payment-dialog";
import DashboardHeader from "@/Components/features/admin/page-header";
import { TableBuilder } from "@/Components/features/admin/table-builder";
import { TableCell, TableRow } from "@/Components/UI/table";
import CrmSummaryStats from "@/Components/features/clients/crm-summary-stats";
import { cn } from "@/lib/utils/cn";
import { formatEgp, formatNumber } from "@/lib/utils/money";
import { FaMoneyBillWave, FaWallet } from "react-icons/fa6";
import { BsBarChartFill } from "react-icons/bs";

type LineRow = {
  id: string;
  material: string;
  finishing: string | null;
  palletCount: number;
  slabCount: number;
  length: number | null;
  width: number | null;
  thickness: number | null;
  quantity: number;
  unitPrice: number;
  area: number;
  total: number;
};

type BonDetailViewProps = {
  clientId: string;
  clientName: string;
  bon: {
    id: string;
    title: string;
    containerNumber: string | null;
    containerLabel: string | null;
    supplies: number;
    payments: number;
    remaining: number;
    totals: { pallets: number; slabs: number; area: number };
  };
  lines: LineRow[];
};

export default function BonDetailView({
  clientId,
  clientName,
  bon,
  lines,
}: BonDetailViewProps) {
  const t = useTranslations("Clients");
  const locale = useLocale();
  const hasPacking = lines.some(
    (line) => line.slabCount > 0 || line.length || line.width || line.finishing,
  );

  const headers = [
    { headName: "Clients.bonDetail.columns.material", className: "text-start!" },
    ...(hasPacking
      ? [
          { headName: "Clients.bonDetail.columns.finishing" },
          { headName: "Clients.bonDetail.columns.pallets" },
          { headName: "Clients.bonDetail.columns.slabs" },
          { headName: "Clients.bonDetail.columns.length" },
          { headName: "Clients.bonDetail.columns.width" },
          { headName: "Clients.bonDetail.columns.thickness" },
          { headName: "Clients.bonDetail.columns.area" },
        ]
      : []),
    { headName: "Clients.bonDetail.columns.quantity" },
    { headName: "Clients.bonDetail.columns.unitPrice" },
    { headName: "Clients.bonDetail.columns.total" },
  ];

  return (
    <div className="space-y-5">
      <DashboardHeader
        breadcrumbs={[
          { label: t("title"), href: "/clients" },
          { label: clientName, href: `/clients/${clientId}` },
          { label: bon.title },
        ]}
        action={
          <>
            <AddPaymentDialog clientId={clientId} bonId={bon.id} />
            <AddBonLineDialog clientId={clientId} bonId={bon.id} />
          </>
        }
      />

      {(bon.containerLabel || bon.containerNumber) && (
        <p className="text-sm text-weaker">
          {[bon.containerLabel, bon.containerNumber ? `${t("bons.container")} ${bon.containerNumber}` : null]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

      <CrmSummaryStats
        stats={[
          {
            label: t("bonDetail.summary.supplies"),
            value: bon.supplies,
            icon: BsBarChartFill,
            iconColor: "#2563EB",
            isCurrency: true,
          },
          {
            label: t("bonDetail.summary.payments"),
            value: bon.payments,
            icon: FaMoneyBillWave,
            iconColor: "#059669",
            isCurrency: true,
          },
          {
            label: t("bonDetail.summary.remaining"),
            value: bon.remaining,
            icon: FaWallet,
            iconColor: "#8B5CF6",
            isCurrency: true,
            valueClassName: cn(
              bon.remaining < 0 ? "text-error!" : bon.remaining > 0 ? "text-brand-primary!" : undefined,
            ),
          },
        ]}
      />

      <TableBuilder
        tableHeadNames={headers}
        tableData={lines}
        emptyState={
          <div className="py-10 text-center text-sm text-weaker">{t("bonDetail.empty")}</div>
        }
        renderRow={(line) => (
          <TableRow key={line.id}>
            <TableCell className="text-start font-semibold text-strong">{line.material}</TableCell>
            {hasPacking ? <TableCell>{line.finishing || "—"}</TableCell> : null}
            {hasPacking ? <TableCell>{formatNumber(line.palletCount, locale, 0)}</TableCell> : null}
            {hasPacking ? <TableCell>{formatNumber(line.slabCount, locale, 0)}</TableCell> : null}
            {hasPacking ? (
              <TableCell>{line.length != null ? formatNumber(line.length, locale) : "—"}</TableCell>
            ) : null}
            {hasPacking ? (
              <TableCell>{line.width != null ? formatNumber(line.width, locale) : "—"}</TableCell>
            ) : null}
            {hasPacking ? (
              <TableCell>
                {line.thickness != null ? formatNumber(line.thickness, locale) : "—"}
              </TableCell>
            ) : null}
            {hasPacking ? (
              <TableCell>{line.area ? formatNumber(line.area, locale) : "—"}</TableCell>
            ) : null}
            <TableCell>{formatNumber(line.quantity, locale)}</TableCell>
            <TableCell>{formatNumber(line.unitPrice, locale)}</TableCell>
            <TableCell className="font-semibold text-strong">
              {formatEgp(line.total, locale)}
            </TableCell>
          </TableRow>
        )}
      />

      {hasPacking ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-surface-raised p-4">
            <p className="text-xs font-medium text-weaker">{t("bonDetail.columns.pallets")}</p>
            <p className="mt-1 text-lg font-bold text-strong">
              {formatNumber(bon.totals.pallets, locale, 0)}
            </p>
          </div>
          <div className="rounded-xl bg-surface-raised p-4">
            <p className="text-xs font-medium text-weaker">{t("bonDetail.columns.slabs")}</p>
            <p className="mt-1 text-lg font-bold text-strong">
              {formatNumber(bon.totals.slabs, locale, 0)}
            </p>
          </div>
          <div className="rounded-xl bg-surface-raised p-4">
            <p className="text-xs font-medium text-weaker">{t("bonDetail.columns.area")}</p>
            <p className="mt-1 text-lg font-bold text-strong">
              {formatNumber(bon.totals.area, locale)}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
