import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { hasRequiredRole, AppRole } from "@/lib/permissions";

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

  const isAllowed = hasRequiredRole(session.role as AppRole, allowedRoles);

  if (!isAllowed) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}