import { getTranslations } from "next-intl/server";
import { Button } from "@/Components/UI/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("Nav");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-semibold text-strong">404</h1>
      <Button asChild variant="brand-soft">
        <Link href="/">{t("home")}</Link>
      </Button>
    </div>
  );
}
