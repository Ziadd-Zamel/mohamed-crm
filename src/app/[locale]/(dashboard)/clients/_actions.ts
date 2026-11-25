"use server";

import { revalidatePath } from "next/cache";
import {
  createBon,
  createBonLine,
  createClient,
  createPayment,
} from "@/lib/services/clients.service";

function revalidateClients(locale: string, clientId?: string, bonId?: string) {
  revalidatePath(`/${locale}/clients`);
  if (clientId) revalidatePath(`/${locale}/clients/${clientId}`);
  if (clientId && bonId) revalidatePath(`/${locale}/clients/${clientId}/bons/${bonId}`);
}

export async function addClientAction(formData: FormData) {
  const locale = String(formData.get("locale") || "ar");
  const name = String(formData.get("name") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  if (!name) return;

  await createClient({ name, notes: notes || undefined });
  revalidateClients(locale);
}

export async function addBonAction(formData: FormData) {
  const locale = String(formData.get("locale") || "ar");
  const clientId = String(formData.get("clientId") || "");
  const title = String(formData.get("title") || "").trim();
  const containerNumber = String(formData.get("containerNumber") || "").trim();
  const containerLabel = String(formData.get("containerLabel") || "").trim();
  if (!clientId || !title) return;

  await createBon({
    clientId,
    title,
    containerNumber: containerNumber || undefined,
    containerLabel: containerLabel || undefined,
  });
  revalidateClients(locale, clientId);
}

export async function addPaymentAction(formData: FormData) {
  const locale = String(formData.get("locale") || "ar");
  const clientId = String(formData.get("clientId") || "");
  const bonId = String(formData.get("bonId") || "").trim();
  const amount = Number(formData.get("amount") || 0);
  const note = String(formData.get("note") || "").trim();
  if (!clientId || !amount) return;

  await createPayment({
    clientId,
    amount,
    bonId: bonId || undefined,
    note: note || undefined,
  });
  revalidateClients(locale, clientId, bonId || undefined);
}

export async function addBonLineAction(formData: FormData) {
  const locale = String(formData.get("locale") || "ar");
  const clientId = String(formData.get("clientId") || "");
  const bonId = String(formData.get("bonId") || "");
  const material = String(formData.get("material") || "").trim();
  const finishing = String(formData.get("finishing") || "").trim();
  const palletCount = Number(formData.get("palletCount") || 0);
  const slabCount = Number(formData.get("slabCount") || 0);
  const length = Number(formData.get("length") || 0);
  const width = Number(formData.get("width") || 0);
  const thickness = Number(formData.get("thickness") || 0);
  let quantity = Number(formData.get("quantity") || 0);
  const unitPrice = Number(formData.get("unitPrice") || 0);

  if (!bonId || !material) return;

  // Auto quantity from area when dimensions + slabs exist and quantity empty
  if (!quantity && length && width && slabCount) {
    quantity = Math.round(length * width * slabCount * 100) / 100;
  }

  await createBonLine({
    bonId,
    material,
    finishing: finishing || undefined,
    palletCount,
    slabCount,
    length: length || undefined,
    width: width || undefined,
    thickness: thickness || undefined,
    quantity,
    unitPrice,
  });
  revalidateClients(locale, clientId, bonId);
}
