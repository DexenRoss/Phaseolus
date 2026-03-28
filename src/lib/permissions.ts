export type AppRole = "ADMIN" | "COLLABORATOR" | "USER";

const APP_ROLES = ["ADMIN", "COLLABORATOR", "USER"] as const;

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && APP_ROLES.includes(value as AppRole);
}

export const PERMISSIONS = {
  userRead: "user:read",
  userUpdateRole: "user:updateRole",
  invitationCreate: "invitation:create",
  invitationRead: "invitation:read",
  publicationCreate: "publication:create",
  publicationUpdate: "publication:update",
  publicationDelete: "publication:delete",
  authorCreate: "author:create",
  authorUpdate: "author:update",
  authorDelete: "author:delete",
  auditRead: "audit:read",
} as const;

export type AppPermission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<AppRole, AppPermission[]> = {
  ADMIN: [
    PERMISSIONS.userRead,
    PERMISSIONS.userUpdateRole,
    PERMISSIONS.invitationCreate,
    PERMISSIONS.invitationRead,
    PERMISSIONS.publicationCreate,
    PERMISSIONS.publicationUpdate,
    PERMISSIONS.publicationDelete,
    PERMISSIONS.authorCreate,
    PERMISSIONS.authorUpdate,
    PERMISSIONS.authorDelete,
    PERMISSIONS.auditRead,
  ],
  COLLABORATOR: [
    PERMISSIONS.publicationCreate,
    PERMISSIONS.publicationUpdate,
    PERMISSIONS.authorCreate,
    PERMISSIONS.authorUpdate,
  ],
  USER: [],
};

export function getPermissionsByRole(role: AppRole): AppPermission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasRequiredRole(
  userRole: AppRole,
  allowedRoles: AppRole[],
): boolean {
  return allowedRoles.includes(userRole);
}

export function hasPermission(
  permissions: AppPermission[],
  permission: AppPermission,
): boolean {
  return permissions.includes(permission);
}

export function hasAnyPermission(
  permissions: AppPermission[],
  required: AppPermission[],
): boolean {
  return required.some((permission) => permissions.includes(permission));
}

export function hasAllPermissions(
  permissions: AppPermission[],
  required: AppPermission[],
): boolean {
  return required.every((permission) => permissions.includes(permission));
}

export type DashboardNavItem = {
  href: string;
  label: string;
  permissions?: AppPermission[];
};

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview" },
  {
    href: "/dashboard/users",
    label: "Users",
    permissions: [PERMISSIONS.userRead],
  },
  {
    href: "/dashboard/invitations",
    label: "Invitations",
    permissions: [PERMISSIONS.invitationRead],
  },
  {
    href: "/dashboard/audit",
    label: "Audit Log",
    permissions: [PERMISSIONS.auditRead],
  },
  {
    href: "/dashboard/authors",
    label: "Authors",
    permissions: [PERMISSIONS.authorCreate, PERMISSIONS.authorUpdate],
  },
  {
    href: "/dashboard/publications",
    label: "Publications",
    permissions: [PERMISSIONS.publicationCreate, PERMISSIONS.publicationUpdate],
  },
  // Lo dejo visible solo para ADMIN por ahora, hasta que definas permisos reales
  {
    href: "/dashboard/datasets",
    label: "Datasets",
    permissions: [PERMISSIONS.auditRead],
  },
];

export function getDashboardNavItems(
  permissions: AppPermission[],
): DashboardNavItem[] {
  return DASHBOARD_NAV_ITEMS.filter((item) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return hasAnyPermission(permissions, item.permissions);
  });
}