import { getTranslations } from "next-intl/server";

export default async function ReportsPage() {
  const t = await getTranslations("Sidebar");

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-strong">{t("reports")}</h1>
      <p className="text-sm text-weaker">Ready for CRM reports module.</p>
    </div>
  );
}
