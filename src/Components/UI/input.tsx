import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import * as React from "react";

const inputVariants = cva(
  [
    "w-full min-w-0 border-1 outline-none transition-all duration-300 border-border-default text-strong",
    "bg-[#F5F5F5] dark:bg-[#262626]",
    "focus:border-primary-500 dark:focus:border-primary-800 focus:outline-none focus:ring-0",
    "aria-invalid:border-[#FCA5A5] aria-invalid:bg-[#FAFAFA]",
    "dark:aria-invalid:border-error dark:aria-invalid:bg-[#1C1C1C]",
    "disabled:bg-[#D4D4D4] disabled:border-transparent disabled:opacity-50",
    "dark:disabled:bg-[#404040] dark:disabled:border-transparent",
  ],
  {
    variants: {
      inputSize: {
        default: "h-12 px-6 py-2",
        lg: "h-10 px-6 py-2",
        md: "h-8 px-4 py-1",
        sm: "h-6 px-4 py-1",
        dashboard:
          "h-10 p-2 bg-[#F5F5F5] dark:bg-[#0F1219] text-sm rounded-sm! focus:ring-1 focus:ring-brand-primary disabled:!bg-[#F5F5F5] disabled:dark:!bg-[#0F1219] disabled:!text-strong disabled:!border-border-default disabled:focus:ring-0 disabled:!opacity-100",
      },
      radius: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
      },
    },
    defaultVariants: {
      inputSize: "default",
      radius: "full",
    },
  },
);

const wrapperVariants = cva("relative flex items-center w-full", {
  variants: {
    inputSize: {
      default: "h-12",
      lg: "h-10",
      md: "h-8",
      sm: "h-6",
      dashboard: "h-10",
    },
  },
  defaultVariants: {
    inputSize: "default",
  },
});

const iconSizeMap = {
  default: "w-5 h-5",
  lg: "w-4 h-4",
  md: "w-4 h-4",
  sm: "w-3 h-3",
  dashboard: "w-3 h-3",
} as const;

const iconPaddingMap = {
  left: {
    default: "pe-10",
    lg: "pe-9",
    md: "pe-8",
    sm: "pe-7",
    dashboard: "pe-6",
  },
  right: {
    default: "ps-10",
    lg: "ps-9",
    md: "ps-8",
    sm: "ps-7",
    dashboard: "ps-6",
  },
} as const;

function Input({
  className,
  type,
  inputSize = "default",
  radius = "full",
  leftIcon,
  rightIcon,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }) {
  const size = inputSize ?? "default";
  const r = radius ?? "full";

  return (
    <div className={wrapperVariants({ inputSize: size })}>
      {leftIcon && (
        <span
          className={cn(
            "pointer-events-none absolute left-3 flex items-center justify-center text-[#A3A3A3] dark:text-[#737373]",
            iconSizeMap[size],
          )}
        >
          {leftIcon}
        </span>
      )}

      <input
        type={type}
        data-slot="input"
        data-size={size}
        className={cn(
          inputVariants({ inputSize: size, radius: r }),
          leftIcon && iconPaddingMap.left[size],
          rightIcon && iconPaddingMap.right[size],
          className,
        )}
        {...props}
      />

      {rightIcon && (
        <span
          className={cn(
            "absolute start-3 flex items-center justify-center text-[#A3A3A3] dark:text-[#737373]",
            iconSizeMap[size],
          )}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
}

export { Input, inputVariants };
