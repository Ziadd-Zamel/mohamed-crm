import { prisma } from "@/lib/db/prisma";
import { lineArea, lineTotal, roundMoney } from "@/lib/utils/money";

export type ClientSummary = {
  id: string;
  name: string;
  notes: string | null;
  supplies: number;
  payments: number;
  balance: number;
  bonsCount: number;
};

function sumLines(
  lines: Array<{ quantity: number; unitPrice: number }>,
): number {
  return roundMoney(lines.reduce((sum, line) => sum + lineTotal(line.quantity, line.unitPrice), 0));
}

export async function listClientsWithTotals(): Promise<ClientSummary[]> {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    include: {
      payments: { select: { amount: true } },
      bons: {
        select: {
          id: true,
          lines: { select: { quantity: true, unitPrice: true } },
        },
      },
    },
  });

  return clients.map((client) => {
    const supplies = roundMoney(
      client.bons.reduce((sum, bon) => sum + sumLines(bon.lines), 0),
    );
    const payments = roundMoney(
      client.payments.reduce((sum, payment) => sum + payment.amount, 0),
    );

    return {
      id: client.id,
      name: client.name,
      notes: client.notes,
      supplies,
      payments,
      // Positive = client prepaid / in credit; negative = client still owes
      balance: roundMoney(payments - supplies),
      bonsCount: client.bons.length,
    };
  });
}

export async function getClientDetail(clientId: string) {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      payments: { orderBy: { date: "desc" } },
      bons: {
        orderBy: { date: "desc" },
        include: {
          lines: true,
          payments: true,
        },
      },
    },
  });

  if (!client) return null;

  const bons = client.bons.map((bon) => {
    const lines = bon.lines
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.getTime() - b.createdAt.getTime())
      .map((line) => {
        const area = lineArea(line);
        const total = lineTotal(line.quantity, line.unitPrice);
        return { ...line, area, total };
      });
    const supplies = sumLines(bon.lines);
    const payments = roundMoney(bon.payments.reduce((sum, p) => sum + p.amount, 0));
    const totalPallets = lines.reduce((sum, line) => sum + line.palletCount, 0);
    const totalSlabs = lines.reduce((sum, line) => sum + line.slabCount, 0);
    const totalArea = roundMoney(lines.reduce((sum, line) => sum + line.area, 0));

    return {
      id: bon.id,
      title: bon.title,
      date: bon.date,
      containerNumber: bon.containerNumber,
      containerLabel: bon.containerLabel,
      notes: bon.notes,
      linesCount: bon.lines.length,
      supplies,
      payments,
      remaining: roundMoney(payments - supplies),
      lines,
      totals: {
        pallets: totalPallets,
        slabs: totalSlabs,
        area: totalArea,
      },
    };
  });


  const supplies = roundMoney(bons.reduce((sum, bon) => sum + bon.supplies, 0));
  const payments = roundMoney(client.payments.reduce((sum, p) => sum + p.amount, 0));

  return {
    id: client.id,
    name: client.name,
    notes: client.notes,
    supplies,
    payments,
    balance: roundMoney(payments - supplies),
    bons,
    paymentRows: client.payments,
  };
}

export async function getBonDetail(bonId: string) {
  const bon = await prisma.bon.findUnique({
    where: { id: bonId },
    include: {
      client: true,
      payments: { orderBy: { date: "desc" } },
      lines: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  if (!bon) return null;

  const lines = bon.lines.map((line) => {
    const area = lineArea(line);
    const total = lineTotal(line.quantity, line.unitPrice);
    return { ...line, area, total };
  });

  const supplies = roundMoney(lines.reduce((sum, line) => sum + line.total, 0));
  const payments = roundMoney(bon.payments.reduce((sum, p) => sum + p.amount, 0));
  const totalPallets = lines.reduce((sum, line) => sum + line.palletCount, 0);
  const totalSlabs = lines.reduce((sum, line) => sum + line.slabCount, 0);
  const totalArea = roundMoney(lines.reduce((sum, line) => sum + line.area, 0));

  return {
    ...bon,
    lines,
    supplies,
    payments,
    remaining: roundMoney(payments - supplies),
    totals: {
      pallets: totalPallets,
      slabs: totalSlabs,
      area: totalArea,
    },
  };
}

export async function createClient(input: { name: string; notes?: string }) {
  return prisma.client.create({
    data: {
      name: input.name.trim(),
      notes: input.notes?.trim() || null,
    },
  });
}

export async function createBon(input: {
  clientId: string;
  title: string;
  date?: Date;
  containerNumber?: string;
  containerLabel?: string;
  notes?: string;
}) {
  return prisma.bon.create({
    data: {
      clientId: input.clientId,
      title: input.title.trim(),
      date: input.date ?? new Date(),
      containerNumber: input.containerNumber?.trim() || null,
      containerLabel: input.containerLabel?.trim() || null,
      notes: input.notes?.trim() || null,
    },
  });
}

export async function createBonLine(input: {
  bonId: string;
  material: string;
  finishing?: string;
  palletCount?: number;
  slabCount?: number;
  length?: number;
  width?: number;
  thickness?: number;
  quantity: number;
  unitPrice: number;
}) {
  return prisma.bonLine.create({
    data: {
      bonId: input.bonId,
      material: input.material.trim(),
      finishing: input.finishing?.trim() || null,
      palletCount: input.palletCount ?? 0,
      slabCount: input.slabCount ?? 0,
      length: input.length ?? null,
      width: input.width ?? null,
      thickness: input.thickness ?? null,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
    },
  });
}

export async function createPayment(input: {
  clientId: string;
  amount: number;
  bonId?: string;
  date?: Date;
  note?: string;
}) {
  return prisma.payment.create({
    data: {
      clientId: input.clientId,
      bonId: input.bonId || null,
      amount: input.amount,
      date: input.date ?? new Date(),
      note: input.note?.trim() || null,
    },
  });
}
