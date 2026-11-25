"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FiGlobe } from "react-icons/fi";
import { Button } from "@/Components/UI/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const otherLocale = locale === "ar" ? "en" : "ar";

  const handleToggle = () => {
    const query = searchParams.toString();
    const target = query ? `${pathname}?${query}` : pathname;
    router.replace(target, { locale: otherLocale });
  };

  return (
    <Button
      onClick={handleToggle}
      variant="gotht"
      size="icon-md"
      className="rounded-lg"
      aria-label="Language Switcher"
      title={otherLocale.toUpperCase()}
    >
      <FiGlobe />
    </Button>
  );
}
