export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function lineTotal(quantity: number, unitPrice: number): number {
  return roundMoney(quantity * unitPrice);
}

/** مساحة مسطح = طول × عرض × عدد الشرايح */
export function lineArea(input: {
  length?: number | null;
  width?: number | null;
  slabCount?: number | null;
}): number {
  const length = input.length ?? 0;
  const width = input.width ?? 0;
  const slabs = input.slabCount ?? 0;
  if (!length || !width || !slabs) return 0;
  return roundMoney(length * width * slabs);
}

export function formatEgp(value: number, locale = "ar-EG"): string {
  if (Math.abs(value) < 0.005) return "—";

  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Math.abs(value));

  // Keep the minus on the number so RTL doesn’t shove it to the wrong side
  return value < 0 ? `EGP-${formatted}` : `EGP${formatted}`;
}

export function formatNumber(value: number, locale = "ar-EG", digits = 2): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value);
}
