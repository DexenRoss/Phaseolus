import { ReactNode } from "react";
import { getCurrentSession } from "@/lib/auth";
import {
  AppPermission,
  AppRole,
  hasPermission,
  isAppRole,
} from "@/lib/permissions";

type PermissionGuardProps = {
  permission: AppPermission;
  children: ReactNode;
  fallback?: ReactNode;
};

export default async function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const session = await getCurrentSession();

  if (!session) {
    return <>{fallback}</>;
  }

  if (!isAppRole(session.role)) {
    return <>{fallback}</>;
  }

  const isAllowed = hasPermission(session.role as AppRole, permission);

  if (!isAllowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}