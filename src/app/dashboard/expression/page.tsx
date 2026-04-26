import RoleGuard from "@/components/auth/role-guard";
import ExpressionDashboard from "@/components/expression/expression-dashboard";
import { getExpressionModuleBootstrap } from "@/server/services/expression.service";

export default async function ExpressionPage() {
  const bootstrap = await getExpressionModuleBootstrap();

  return (
    <RoleGuard allowedRoles={["ADMIN", "COLLABORATOR"]}>
      <ExpressionDashboard
        datasets={bootstrap.datasets}
        initialView={bootstrap.initialView}
      />
    </RoleGuard>
  );
}
