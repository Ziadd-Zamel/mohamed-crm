import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  " flex items-center  justify-center whitespace-nowrap [&_svg]:shrink-0 rounded-full cursor-pointer disabled:cursor-default disabled:bg-[#D4D4D4] disabled:text-[#A3A3A3] transition-all duration-300 ease-in-out border-2 border-transparent",
  {
    variants: {
      variant: {
        default:
          "text-[#F8FAFC] bg-primary-600 hover:bg-primary-400 focus:border-primary-200 focus:bg-primary-500",
        secondary:
          "text-[#F8FAFC] bg-secondary-600 hover:bg-secondary-400 focus:border-secondary-200 focus:bg-secondary-500",
        gotht:
          "text-[#475569] bg-[#F1F5F9] hover:bg-[#E2E8F0] border-[#E2E8F0] border-1 focus:bg-[#CBD5E1] dark:text-[#94A3B8] dark:bg-[#1E293B] dark:hover:bg-[#334155] dark:border-[#334155] dark:focus:bg-[#475569]",
        danger:
          "text-[#F8FAFC] bg-[#DC2626] hover:bg-[#EF4444] focus:border-[#FECACA] focus:bg-primary-[#EF4444]",
        "brand-soft":
          "bg-brand-primary-weakest text-brand-primary hover:bg-brand-primary-weaker focus:border-brand-primary-light focus:bg-brand-primary-weaker disabled:bg-[#D4D4D4] disabled:text-[#A3A3A3]",

        "danger-soft":
          "bg-red-weakest text-error hover:bg-red-100 focus:border-red-200 focus:bg-red-100 disabled:bg-[#D4D4D4] disabled:text-[#A3A3A3]",
      },
      size: {
        default: "py-4 px-6 h-12 gap-3 text-lg font-normal",
        lg: "px-4 h-10 gap-2 text-base font-normal",
        md: "py-4 px-2 h-6 gap-1 text-xs sm:py-4 sm:px-3 sm:h-8 sm:gap-2 sm:text-sm font-medium",
        sm: "py-4 px-2 h-6 gap-1 text-xs font-medium",
        icon: "size-12 aspect-square",
        "icon-lg": "size-10 aspect-square",
        "icon-md": "size-8 aspect-square",
        "icon-sm": "size-6 aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
