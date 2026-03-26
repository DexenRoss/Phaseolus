export type AppRole = "ADMIN" | "COLLABORATOR" | "USER";

export function hasRequiredRole(
  userRole: AppRole,
  allowedRoles: AppRole[]
): boolean {
  return allowedRoles.includes(userRole);
}