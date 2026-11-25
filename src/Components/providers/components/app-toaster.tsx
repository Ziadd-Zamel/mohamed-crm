"use client";

import { useLocale } from "next-intl";
import type { CSSProperties } from "react";
import { type DefaultToastOptions, Toaster, type ToasterProps } from "react-hot-toast";

const BASE_TOAST_OPTIONS: DefaultToastOptions = {
  duration: 3000,
};

const directionStyles = (direction: "rtl" | "ltr"): CSSProperties => ({
  textAlign: direction === "rtl" ? "right" : "left",
  direction,
});

const AppToaster = ({ toastOptions, position, ...rest }: ToasterProps) => {
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const mergedOptions: DefaultToastOptions = {
    ...BASE_TOAST_OPTIONS,
    ...toastOptions,
    style: {
      ...BASE_TOAST_OPTIONS.style,
      ...directionStyles(direction),
      ...toastOptions?.style,
    },
  };

  const resolvedPosition = position ?? (direction === "rtl" ? "bottom-right" : "bottom-left");

  return <Toaster {...rest} position={resolvedPosition} toastOptions={mergedOptions} />;
};

export default AppToaster;
export { BASE_TOAST_OPTIONS };
