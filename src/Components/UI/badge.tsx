import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils/cn";
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "pink";

const badgeVariants = cva(
  "flex items-center justify-center text-[#E7EBF7] w-fit whitespace-nowrap py-1 px-2.5 h-6 font-medium text-xs gap-1 transition-colors",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        info: "",
        neutral: "",
        pink: "",
      },
      tone: {
        solid: "",
        subtle: "",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
      },
    },
    compoundVariants: [
      // primary
      { variant: "primary", tone: "solid", class: "bg-primary-600" },
      {
        variant: "primary",
        tone: "subtle",
        class: "bg-primary-50 text-primary-600",
      },
      // secondary
      { variant: "secondary", tone: "solid", class: "bg-secondary-600" },
      {
        variant: "secondary",
        tone: "subtle",
        class: "bg-secondary-100 text-secondary-600",
      },
      // success
      { variant: "success", tone: "solid", class: "bg-[#16A34A]" },
      {
        variant: "success",
        tone: "subtle",
        class: "bg-[#DCFCE7] text-[#16A34A]",
      },
      // warning
      { variant: "warning", tone: "solid", class: "bg-[#CA8A04]" },
      {
        variant: "warning",
        tone: "subtle",
        class: "bg-[#FEF9C3] text-[#CA8A04]",
      },
      // error
      { variant: "error", tone: "solid", class: "bg-[#DC2626]" },
      {
        variant: "error",
        tone: "subtle",
        class: "bg-[#FEDFDD] text-[#DC2626]",
      },
      // info
      { variant: "info", tone: "solid", class: "bg-[#2563EB]" },
      { variant: "info", tone: "subtle", class: "bg-[#DBEAFE] text-[#2563EB]" },
      // neutral
      { variant: "neutral", tone: "solid", class: "bg-[#171717]" },
      {
        variant: "neutral",
        tone: "subtle",
        class: "bg-[#E5E5E5] text-[#525252]",
      },
      // pink
      { variant: "pink", tone: "solid", class: "bg-[#DB2777]" },
      {
        variant: "pink",
        tone: "subtle",
        class: "bg-[#FCE7F3] text-[#DB2777]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      tone: "solid",
      shape: "pill",
    },
  },
);

function Badge({
  className,
  variant,
  tone,
  shape,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, tone, shape }), className)}
      {...props}
    >
      {leftIcon && (
        <span className="inline-flex shrink-0 items-center [&>svg]:size-3">{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className="inline-flex shrink-0 items-center [&>svg]:size-3">{rightIcon}</span>
      )}
    </Comp>
  );
}

export { Badge, badgeVariants };
