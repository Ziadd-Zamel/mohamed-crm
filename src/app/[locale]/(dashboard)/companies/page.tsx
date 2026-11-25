import { getTranslations } from "next-intl/server";

export default async function CompaniesPage() {
  const t = await getTranslations("Sidebar");

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-strong">{t("companies")}</h1>
      <p className="text-sm text-weaker">Ready for CRM companies module.</p>
    </div>
  );
}
