import { notFound } from "next/navigation";
import Providers from "@/Components/providers";
import { somarSans } from "@/fonts/somarSans";
import { routing } from "@/i18n/routing";
import "@/Styles/globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={somarSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${somarSans.className} min-h-screen flex flex-col bg-surface-base text-strong`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
