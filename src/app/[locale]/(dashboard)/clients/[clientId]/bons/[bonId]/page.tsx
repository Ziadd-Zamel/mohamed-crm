import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import BonDetailView from "@/Components/features/clients/bon-detail-view";
import { getBonDetail } from "@/lib/services/clients.service";

export default async function BonDetailPage({
  params,
}: {
  params: Promise<{ clientId: string; bonId: string }>;
}) {
  const { clientId, bonId } = await params;
  const bon = await getBonDetail(bonId);
  if (!bon || bon.clientId !== clientId) notFound();

  await getTranslations("Clients");

  return (
    <BonDetailView
      clientId={clientId}
      clientName={bon.client.name}
      bon={{
        id: bon.id,
        title: bon.title,
        containerNumber: bon.containerNumber,
        containerLabel: bon.containerLabel,
        supplies: bon.supplies,
        payments: bon.payments,
        remaining: bon.remaining,
        totals: bon.totals,
      }}
      lines={bon.lines.map((line) => ({
        id: line.id,
        material: line.material,
        finishing: line.finishing,
        palletCount: line.palletCount,
        slabCount: line.slabCount,
        length: line.length,
        width: line.width,
        thickness: line.thickness,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        area: line.area,
        total: line.total,
      }))}
    />
  );
}
