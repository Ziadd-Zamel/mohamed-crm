import type { ElementType } from "react";
import {
  Building2,
  ChartColumn,
  Handshake,
  LayoutDashboard,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";

export type NavSubItem = {
  name: string;
  path?: string;
  subItems?: NavSubItem[];
};

export type NavItem = {
  name: string;
  icon: ElementType;
  path?: string;
  subItems?: NavSubItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    name: "dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "clients",
    icon: Users,
    path: "/clients",
  },
  {
    name: "companies",
    icon: Building2,
    path: "/companies",
  },
  {
    name: "deals",
    icon: Handshake,
    path: "/deals",
  },
  {
    name: "tasks",
    icon: SquareCheckBig,
    path: "/tasks",
  },
  {
    name: "reports",
    icon: ChartColumn,
    path: "/reports",
  },
  {
    name: "settings",
    icon: Settings,
    path: "/settings",
  },
];
