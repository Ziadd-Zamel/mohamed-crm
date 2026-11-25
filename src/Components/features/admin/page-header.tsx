"use client";

import type { ComponentProps, ReactNode } from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Button } from "@/Components/UI/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Href = ComponentProps<typeof Link>["href"];

export type PageHeaderBreadcrumb = {
  label: string;
  href?: Href;
};

type DashboardHeaderProps = {
  title?: string;
  description?: string;
  breadcrumbs?: PageHeaderBreadcrumb[];
  linkLabel?: string;
  href?: Href;
  action?: ReactNode;
  variant?: "default" | "transparent";
  className?: string;
};

export default function DashboardHeader({
  title,
  description,
  breadcrumbs,
  linkLabel,
  href,
  action,
  variant = "default",
  className,
}: DashboardHeaderProps) {
  const crumbs = breadcrumbs ?? [];

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        variant === "transparent"
          ? "bg-transparent"
          : "rounded-xl bg-surface-raised p-3 py-4 sm:py-5",
        className,
      )}
    >
      <div className="min-w-0">
        {crumbs.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 text-sm">
            {crumbs.map((item, i) => {
              const isFirst = i === 0;
              const isLast = i === crumbs.length - 1;
              return (
                <div key={`${item.label}-${String(i)}`} className="flex items-center gap-1.5">
                  {!isFirst ? <span className="font-semibold text-weaker">/</span> : null}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 font-semibold text-weaker"
                    >
                      {isFirst ? (
                        <span className="flex size-6 items-center justify-center rounded-md bg-surface-neutral">
                          <FiArrowRight className="text-weaker ltr:rotate-180" />
                        </span>
                      ) : null}
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast
                          ? "font-semibold text-brand-primary"
                          : "font-semibold text-weaker"
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {title ? (
              <h2 className="text-lg font-bold text-strong sm:text-xl">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm font-medium text-weaker">{description}</p>
            ) : null}
          </div>
        )}
      </div>

      {action != null ? (
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto">
          {action}
        </div>
      ) : href ? (
        <Button size="md" className="w-full rounded-lg sm:w-auto" asChild>
          <Link href={href} className="flex items-center gap-2">
            <FiPlus className="size-5" />
            {linkLabel}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
