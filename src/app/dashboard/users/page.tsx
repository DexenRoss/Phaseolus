import RoleGuard from "@/components/auth/role-guard";
import { getAllUsers } from "@/server/services/user.service";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <section style={{ display: "grid", gap: "24px" }}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Users
          </h1>
          <p style={{ color: "#475569", marginTop: "8px" }}>
            Gestión básica de usuarios del sistema.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "760px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px" }}>Name</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Username</th>
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Created At</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <td style={{ padding: "12px" }}>{user.name ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{user.email}</td>
                  <td style={{ padding: "12px" }}>{user.username ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{user.role}</td>
                  <td style={{ padding: "12px" }}>{user.status}</td>
                  <td style={{ padding: "12px" }}>
                    {new Date(user.createdAt).toLocaleString("es-MX")}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </RoleGuard>
  );
}