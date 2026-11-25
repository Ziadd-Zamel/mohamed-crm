"use client";

import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/Components/UI/input";

export default function FilterSearch({
  inputPlaceholder,
  filterName = "q",
}: {
  inputPlaceholder: string;
  filterName?: string;
}) {
  const t = useTranslations();
  const [param, setParam] = useQueryState(filterName, {
    defaultValue: "",
    shallow: false,
  });
  const [value, setValue] = useState(param);

  useEffect(() => {
    setValue(param);
  }, [param]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void setParam(value || null);
    }, 350);
    return () => clearTimeout(timer);
  }, [value, setParam]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={t(inputPlaceholder)}
      radius="md"
      inputSize="md"
      rightIcon={<FiSearch />}
      className="w-full text-sm sm:max-w-xs"
    />
  );
}
