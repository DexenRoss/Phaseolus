import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { hasRequiredRole, AppRole, isAppRole } from "@/lib/permissions";

type RoleGuardProps = {
  allowedRoles: AppRole[];
  children: React.ReactNode;
};

export default async function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (!isAppRole(session.role)) {
    redirect("/forbidden");
  }

  const isAllowed = hasRequiredRole(session.role, allowedRoles);

  if (!isAllowed) {
    redirect("/forbidden");
  }

  return <>{children}</>;
}