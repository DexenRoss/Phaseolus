export const APP_ROLES = ["ADMIN", "COLLABORATOR", "USER"] as const;
export type AppRole = (typeof APP_ROLES)[number];

export const PERMISSIONS = [
  "user:read",
  "user:updateRole",
  "invitation:create",
  "invitation:read",
  "publication:create",
  "publication:update",
  "publication:delete",
  "author:create",
  "author:update",
  "author:delete",
  "audit:read",
] as const;

export type AppPermission = (typeof PERMISSIONS)[number];

const ALL_PERMISSIONS = [...PERMISSIONS] as readonly AppPermission[];

export const ROLE_PERMISSIONS: Record<AppRole, readonly AppPermission[]> = {
  ADMIN: ALL_PERMISSIONS,
  COLLABORATOR: [
    "publication:create",
    "publication:update",
    "publication:delete",
    "author:create",
    "author:update",
    "author:delete",
  ],
  USER: [],
} as const;

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && APP_ROLES.includes(value as AppRole);
}

export function isAppPermission(value: unknown): value is AppPermission {
  return (
    typeof value === "string" &&
    PERMISSIONS.includes(value as AppPermission)
  );
}

export function hasPermission(
  role: AppRole,
  permission: AppPermission
): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Compatibilidad hacia atrás para no romper código viejo.
 * Úsalo solo donde todavía no migres a permisos.
 */
export function hasRequiredRole(
  userRole: AppRole,
  allowedRoles: AppRole[]
): boolean {
  return allowedRoles.includes(userRole);
}