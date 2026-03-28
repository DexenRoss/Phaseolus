import RoleGuard from "@/components/auth/role-guard";
import SectionCard from "@/components/ui/section-card";
import { getAllUsers } from "@/server/services/user.service";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="space-y-6">
        <SectionCard
          title="Users"
          description="Gestión básica de usuarios del sistema."
        >
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--panel)]">
                <tr className="text-left text-sm text-[var(--muted-foreground)]">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-[var(--card)] text-sm">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 font-medium">{user.name ?? "—"}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.username ?? "—"}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{user.status}</td>
                    <td className="px-4 py-3">
                      {new Date(user.createdAt).toLocaleString("es-MX")}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </RoleGuard>
  );
}