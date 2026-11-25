"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/Components/UI/button";

export default function DarkModeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      variant="gotht"
      size="icon-md"
      className="rounded-lg"
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </Button>
  );
}
