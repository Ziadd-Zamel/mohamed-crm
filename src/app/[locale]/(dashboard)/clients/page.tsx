import ClientsTable from "@/Components/features/clients/clients-table";
import { listClientsWithTotals } from "@/lib/services/clients.service";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const clients = await listClientsWithTotals();
  const query = (q || "").trim().toLowerCase();
  const filtered = query
    ? clients.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          (client.notes || "").toLowerCase().includes(query),
      )
    : clients;

  return <ClientsTable clients={filtered} />;
}
