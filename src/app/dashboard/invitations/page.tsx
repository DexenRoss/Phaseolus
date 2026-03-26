import RoleGuard from "@/components/auth/role-guard";
import { getAllInvitations } from "@/server/services/invitation.service";
import CreateInvitationForm from "@/components/invitations/create-invitation-form";

export default async function InvitationsPage() {
  const invitations = await getAllInvitations();

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
            Invitations
          </h1>
          <p style={{ color: "#475569", marginTop: "8px" }}>
            Gestión de invitaciones para nuevos usuarios del sistema.
          </p>
        </div>

        <CreateInvitationForm />

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
              minWidth: "1000px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Role</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Expires</th>
                <th style={{ padding: "12px" }}>Token</th>
                <th style={{ padding: "12px" }}>Link</th>
              </tr>
            </thead>

            <tbody>
              {invitations.map((inv) => {
                const acceptUrl = `/accept-invitation?token=${inv.token}`;

                return (
                  <tr key={inv.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px" }}>{inv.email}</td>
                    <td style={{ padding: "12px" }}>{inv.role}</td>
                    <td style={{ padding: "12px" }}>{inv.status}</td>
                    <td style={{ padding: "12px" }}>
                      {new Date(inv.expiresAt).toLocaleString("es-MX")}
                    </td>
                    <td style={{ padding: "12px", fontSize: "12px" }}>{inv.token}</td>
                    <td style={{ padding: "12px" }}>
                      <a href={acceptUrl}>Abrir invitación</a>
                    </td>
                  </tr>
                );
              })}

              {invitations.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No hay invitaciones registradas.
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