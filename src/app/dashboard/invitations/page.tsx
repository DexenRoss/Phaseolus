import { requirePermission } from "@/lib/authorization";

export default async function InvitationsPage() {
  await requirePermission("invitation:read");

  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <div>
        <h1>Invitations</h1>
        <p>Módulo de invitaciones en construcción.</p>
      </div>
    </section>
  );
}