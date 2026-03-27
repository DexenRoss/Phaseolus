import { requirePermission } from "@/lib/authorization";
import { getAllUsers } from "@/server/services/user.service";

export default async function UsersPage() {
  await requirePermission("user:read");

  const users = await getAllUsers();

  return (
    <section style={{ display: "grid", gap: "24px" }}>
      <div>
        <h1>Users</h1>
        <p>Gestión básica de usuarios del sistema.</p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Email</th>
              <th align="left">Username</th>
              <th align="left">Role</th>
              <th align="left">Status</th>
              <th align="left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name ?? "—"}</td>
                <td>{user.email}</td>
                <td>{user.username ?? "—"}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{new Date(user.createdAt).toLocaleString("es-MX")}</td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6}>No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}