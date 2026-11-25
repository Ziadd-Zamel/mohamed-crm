import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientDetailView from "@/Components/features/clients/client-detail-view";
import { getClientDetail } from "@/lib/services/clients.service";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = await getClientDetail(clientId);
  if (!client) notFound();

  // ensure translations load for client tables
  await getTranslations("Clients");

  return (
    <ClientDetailView
      client={{
        id: client.id,
        name: client.name,
        notes: client.notes,
        supplies: client.supplies,
        payments: client.payments,
        balance: client.balance,
      }}
      bons={client.bons.map((bon) => ({
        id: bon.id,
        title: bon.title,
        date: bon.date.toISOString(),
        containerNumber: bon.containerNumber,
        containerLabel: bon.containerLabel,
        linesCount: bon.linesCount,
        supplies: bon.supplies,
        remaining: bon.remaining,
      }))}
    />
  );
}
