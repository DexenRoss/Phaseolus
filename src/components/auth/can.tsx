import { ReactNode } from "react";
import { AppPermission, hasAllPermissions, hasAnyPermission } from "@/lib/permissions";

type CanProps = {
  permissions: AppPermission[];
  require?: AppPermission[];
  requireAll?: AppPermission[];
  fallback?: ReactNode;
  children: ReactNode;
};

export default function Can({
  permissions,
  require,
  requireAll,
  fallback = null,
  children,
}: CanProps) {
  const allowedByAny =
    !require || require.length === 0 || hasAnyPermission(permissions, require);

  const allowedByAll =
    !requireAll ||
    requireAll.length === 0 ||
    hasAllPermissions(permissions, requireAll);

  if (!allowedByAny || !allowedByAll) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}