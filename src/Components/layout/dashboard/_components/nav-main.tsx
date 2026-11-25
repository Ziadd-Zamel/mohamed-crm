"use client";

import { ArrowLeft, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ElementType } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/UI/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/Components/UI/sidebar";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface NavSubItem {
  name: string;
  path?: string;
  subItems?: NavSubItem[];
}

interface NavItem {
  name: string;
  icon?: ElementType;
  path?: string;
  subItems?: NavSubItem[];
}

function pathIsActive(pathname: string, path?: string) {
  if (!path) return false;
  if (path === "/") return pathname === "/";
  if (pathname === path) return true;
  // Keep parent active on nested routes (e.g. /clients/[id])
  return pathname.startsWith(`${path}/`);
}

function hasActiveNested(pathname: string, items?: NavSubItem[]): boolean {
  if (!items?.length) return false;
  return items.some(
    (item) => pathIsActive(pathname, item.path) || hasActiveNested(pathname, item.subItems),
  );
}

function NestedNavLinks({
  items,
  depth = 0,
  nestedOpen = false,
}: {
  items: NavSubItem[];
  depth?: number;
  /** True when rendering inside an open nested group with white bg */
  nestedOpen?: boolean;
}) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarMenuSub className={cn("mx-0 border-0", nestedOpen ? "px-0" : "px-2")}>
      {items.map((subItem) => {
        const nested = subItem.subItems?.length ? subItem.subItems : undefined;
        const nestedActive = hasActiveNested(pathname, nested);
        const leafActive = pathIsActive(pathname, subItem.path);

        if (nested) {
          return (
            <Collapsible
              key={subItem.name}
              asChild
              defaultOpen={nestedActive}
              className={cn(
                "group/nested my-1 list-none overflow-hidden rounded-lg transition-colors",
                "data-[state=open]:bg-white",
              )}
            >
              <SidebarMenuSubItem className="duration-300 transition-all">
                <CollapsibleTrigger asChild>
                  <SidebarMenuSubButton
                    className={cn(
                      "h-10 w-full cursor-pointer px-2 text-sm font-medium transition-colors",
                      "group-data-[state=open]/nested:bg-transparent group-data-[state=open]/nested:text-brand-primary",
                      "group-data-[state=closed]/nested:text-white group-data-[state=closed]/nested:hover:bg-white/10",
                    )}
                  >
                    <span className="flex w-full items-center gap-2">
                      <ArrowLeft
                        className={cn(
                          "size-4 shrink-0 ltr:rotate-180 rtl:rotate-0",
                          "group-data-[state=open]/nested:text-brand-primary",
                          "group-data-[state=closed]/nested:text-white",
                        )}
                      />
                      <span className="flex-1 text-start">{t(subItem.name)}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-200",
                          "group-data-[state=open]/nested:rotate-180 group-data-[state=open]/nested:text-brand-primary",
                          "group-data-[state=closed]/nested:text-white",
                        )}
                      />
                    </span>
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=open]:pb-1">
                  <NestedNavLinks items={nested} depth={depth + 1} nestedOpen />
                </CollapsibleContent>
              </SidebarMenuSubItem>
            </Collapsible>
          );
        }

        if (!subItem.path) return null;

        return (
          <SidebarMenuSubItem key={subItem.name} className="duration-300 transition-all">
            <SidebarMenuSubButton
              asChild
              className={cn(
                "h-10 cursor-pointer px-2 text-sm font-medium transition-colors",
                // Align text with parent title (after the arrow + gap)
                nestedOpen && "ps-8",
                nestedOpen
                  ? leafActive
                    ? "bg-transparent text-brand-secondary hover:bg-transparent hover:text-brand-secondary"
                    : "bg-transparent text-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                  : leafActive
                    ? "bg-white text-brand-primary hover:bg-white hover:text-brand-primary [&_svg]:stroke-brand-primary [&_svg]:text-brand-primary"
                    : "text-white hover:bg-white/10 hover:text-white [&_svg]:stroke-white [&_svg]:text-white",
              )}
            >
              <Link
                href={subItem.path}
                onClick={closeMobileSidebar}
                className={cn(
                  "flex items-center gap-2",
                  nestedOpen
                    ? leafActive
                      ? "text-brand-secondary"
                      : "text-brand-primary"
                    : leafActive
                      ? "text-brand-primary"
                      : "text-white",
                )}
              >
                {!nestedOpen && (
                  <ArrowLeft
                    className={cn(
                      "shrink-0 ltr:rotate-180 rtl:rotate-0",
                      leafActive ? "text-brand-primary" : "text-white",
                    )}
                  />
                )}
                {t(subItem.name)}
              </Link>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const { state, setOpen, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path?: string) => pathIsActive(pathname, path);
  const hasActiveSub = (item: NavItem) => hasActiveNested(pathname, item.subItems);

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup className={cn("w-full")}>
      <SidebarMenu className={cn("w-full", isCollapsed && "ms-2 mt-5")}>
        {items.map((item) => {
          if (!item.subItems || item.subItems.length === 0) {
            const active = isActive(item.path);
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={t(item.name)}
                  className={cn(
                    "cursor-pointer gap-3 px-3 h-11 font-semibold text-base transition-colors",
                    active
                      ? "bg-primary-500 text-white hover:bg-primary-500 hover:text-white hover:opacity-100"
                      : "text-weak hover:bg-primary-500 hover:text-white",
                  )}
                >
                  <Link href={item.path ?? "#"} onClick={closeMobileSidebar}>
                    {item.icon ? (
                      <item.icon className={cn(isCollapsed && "size-5.5! -ms-[3px]")} />
                    ) : null}
                    <span>{t(item.name)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          const parentActive = hasActiveSub(item);

          return (
            <Collapsible
              key={item.name}
              asChild
              defaultOpen={parentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={t(item.name)}
                    onClick={() => {
                      if (isCollapsed) {
                        setOpen(true);
                      }
                    }}
                    className={cn(
                      "cursor-pointer gap-3 px-3 h-11 font-semibold text-base transition-colors",
                      parentActive &&
                        "bg-primary-500 text-white hover:bg-primary-500 hover:text-white hover:opacity-100 [&_svg]:text-white [&_svg]:stroke-white",
                      !parentActive && "text-weak hover:bg-primary-500 hover:text-white",
                      "group-data-[state=open]/collapsible:bg-primary-500",
                      "group-data-[state=open]/collapsible:text-white",
                      isCollapsed
                        ? "rounded-b-lg"
                        : "group-data-[state=open]/collapsible:rounded-b-none",
                      "group-data-[state=open]/collapsible:opacity-100",
                      "group-data-[state=open]/collapsible:hover:bg-primary-500",
                      "group-data-[state=open]/collapsible:hover:text-white",
                      "group-data-[state=open]/collapsible:hover:opacity-100",
                      "group-data-[state=open]/collapsible:hover:[&_span]:text-white",
                      "group-data-[state=open]/collapsible:hover:[&_svg]:text-white",
                      "group-data-[state=open]/collapsible:hover:[&_svg]:stroke-white",
                      "[&>svg]:group-data-[state=open]/collapsible:text-white",
                      "[&>svg]:group-data-[state=open]/collapsible:stroke-white",
                    )}
                  >
                    {item.icon && (
                      <item.icon className={cn(isCollapsed && "size-5.5!  -ms-[3px]")} />
                    )}
                    <span>{t(item.name)}</span>
                    <ChevronDown className="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {!isCollapsed && (
                  <CollapsibleContent
                    className={cn(
                      "overflow-hidden transition-all duration-200",
                      "data-[state=closed]:animate-collapsible-up",
                      "data-[state=open]:animate-collapsible-down",
                      "data-[state=open]:rounded-b-lg",
                      "data-[state=open]:pb-3",
                      "group-data-[state=open]/collapsible:bg-primary-500",
                    )}
                  >
                    <NestedNavLinks items={item.subItems} />
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
