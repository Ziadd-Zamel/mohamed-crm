"use client";

import { useLocale, useTranslations } from "next-intl";
import AddClientDialog from "@/Components/features/clients/add-client-dialog";
import DashboardHeader from "@/Components/features/admin/page-header";
import FilterSearch from "@/Components/features/admin/filter-search";
import { TableBuilder } from "@/Components/features/admin/table-builder";
import { TableCell, TableRow } from "@/Components/UI/table";
import { useRouter } from "@/i18n/navigation";
import type { ClientSummary } from "@/lib/services/clients.service";
import { cn } from "@/lib/utils/cn";
import { formatEgp } from "@/lib/utils/money";

const CLIENT_HEADERS = [
  { headName: "Clients.columns.name", className: "text-start!" },
  { headName: "Clients.columns.supplies" },
  { headName: "Clients.columns.payments" },
  { headName: "Clients.columns.balance" },
  { headName: "Clients.columns.bons" },
];

export default function ClientsTable({ clients }: { clients: ClientSummary[] }) {
  const t = useTranslations("Clients");
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="relative space-y-4">
      <DashboardHeader
        title={t("title")}
        description={t("subtitle")}
        action={<AddClientDialog />}
      />

      <div className="flex w-full flex-col gap-4 py-1 sm:flex-row sm:items-center sm:justify-between">
        <FilterSearch inputPlaceholder="Clients.searchPlaceholder" filterName="q" />
      </div>

      <TableBuilder
        tableHeadNames={CLIENT_HEADERS}
        tableData={clients}
        emptyState={
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-strong">{t("empty")}</p>
          </div>
        }
        renderRow={(client) => (
          <TableRow
            key={client.id}
            className="cursor-pointer hover:bg-surface-neutral/50"
            onClick={() => router.push(`/clients/${client.id}`)}
          >
            <TableCell className="text-start">
              <p className="font-semibold text-strong">{client.name}</p>
              {client.notes ? <p className="text-xs text-weaker">{client.notes}</p> : null}
            </TableCell>
            <TableCell>{formatEgp(client.supplies, locale)}</TableCell>
            <TableCell>{formatEgp(client.payments, locale)}</TableCell>
            <TableCell
              className={cn(
                "font-semibold",
                client.balance < 0 ? "text-error" : "text-strong",
              )}
            >
              {formatEgp(client.balance, locale)}
            </TableCell>
            <TableCell>{client.bonsCount}</TableCell>
          </TableRow>
        )}
      />
    </div>
  );
}
