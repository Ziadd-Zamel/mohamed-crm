import { getTranslations } from "next-intl/server";

export default async function TasksPage() {
  const t = await getTranslations("Sidebar");

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-strong">{t("tasks")}</h1>
      <p className="text-sm text-weaker">Ready for CRM tasks module.</p>
    </div>
  );
}
