"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps, ReactNode } from "react";

function ignoreIntlError() {}

function messageFallback({ namespace, key }: { namespace?: string; key: string }) {
  return [namespace, key].filter(Boolean).join(".");
}

type Messages = NonNullable<ComponentProps<typeof NextIntlClientProvider>["messages"]>;

export default function IntlProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: Messages;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={ignoreIntlError}
      getMessageFallback={messageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
}
