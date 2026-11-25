import localFont from "next/font/local";

export const somarSans = localFont({
  src: [
    {
      path: "../../public/Fonts/SomarSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/SomarSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/SomarSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Fonts/SomarSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-somar",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});
