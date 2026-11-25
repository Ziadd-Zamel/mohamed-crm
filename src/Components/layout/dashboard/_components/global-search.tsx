"use client";

import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useCallback, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";

interface GlobalSearchProps {
  paramKey?: string;
  variant?: "icon" | "input";
}

export default function GlobalSearch({ paramKey = "q", variant = "input" }: GlobalSearchProps) {
  const t = useTranslations("Common");
  const [searchParam, setSearchParam] = useQueryState(paramKey, {
    defaultValue: "",
    shallow: true,
  });
  const [inputValue, setInputValue] = useState(searchParam);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        void setSearchParam(value || null);
      }, 400);
    },
    [setSearchParam],
  );

  if (variant === "icon") {
    return (
      <Button
        type="button"
        variant="gotht"
        size="icon-md"
        className="rounded-lg"
        aria-label={t("search")}
      >
        <FiSearch size={20} />
      </Button>
    );
  }

  return (
    <Input
      placeholder={t("search")}
      radius="md"
      inputSize="md"
      value={inputValue}
      onChange={handleChange}
      rightIcon={<FiSearch />}
      className="text-sm md:w-xs"
    />
  );
}
