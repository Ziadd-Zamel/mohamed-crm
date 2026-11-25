import { getLocale, getMessages } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AppToaster from "./components/app-toaster";
import IntlProvider from "./components/intl-provider";
import ReactQueryProvider from "./components/react-query-provider";
import ThemeProvider from "./components/theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  if (!messages) {
    throw new Error("Failed to load messages for next-intl");
  }

  return (
    <ThemeProvider>
      <IntlProvider messages={messages} locale={locale}>
        <ReactQueryProvider>
          <NuqsAdapter>
            {children}
            <AppToaster />
          </NuqsAdapter>
        </ReactQueryProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}
