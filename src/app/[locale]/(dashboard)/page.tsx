import { getTranslations } from "next-intl/server";
import AddClientDialog from "@/Components/features/clients/add-client-dialog";
import DashboardHomeStats from "@/Components/features/clients/dashboard-home-stats";
import DashboardHeader from "@/Components/features/admin/page-header";
import { listClientsWithTotals } from "@/lib/services/clients.service";

export default async function DashboardHomePage() {
  const t = await getTranslations("Dashboard");
  const tClients = await getTranslations("Clients");
  const clients = await listClientsWithTotals();

  const supplies = clients.reduce((sum, c) => sum + c.supplies, 0);
  const payments = clients.reduce((sum, c) => sum + c.payments, 0);
  const balance = payments - supplies;

  return (
    <div className="space-y-4">
      <DashboardHeader
        title={t("title")}
        description={t("subtitle")}
        action={<AddClientDialog />}
        variant="transparent"
      />

      <DashboardHomeStats
        clientsCount={clients.length}
        supplies={supplies}
        payments={payments}
        balance={balance}
      />

      {clients.length === 0 ? (
        <p className="rounded-xl bg-surface-raised px-4 py-8 text-center text-sm text-weaker">
          {tClients("empty")}
        </p>
      ) : null}
    </div>
  );
}