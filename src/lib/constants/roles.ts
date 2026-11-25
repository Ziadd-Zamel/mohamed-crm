import type { Role } from "@prisma/client";

export const ADMIN_ROLES: Role[] = ["ADMIN"];

export function isAdminRole(role?: Role | string | null): boolean {
  if (!role) return false;
  return ADMIN_ROLES.includes(role as Role);
}
