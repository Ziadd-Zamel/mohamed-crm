"use client";

import { FiUser } from "react-icons/fi";
import { Button } from "@/Components/UI/button";

export default function UserMenu() {
  return (
    <Button
      variant="gotht"
      size="icon-md"
      className="overflow-hidden rounded-lg border-none bg-brand-primary-weakest p-0 text-brand-primary hover:bg-brand-primary-weakest"
      aria-label="User"
    >
      <span className="flex size-8 items-center justify-center">
        <FiUser size={18} />
      </span>
    </Button>
  );
}
