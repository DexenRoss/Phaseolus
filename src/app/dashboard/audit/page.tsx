import { requirePermission } from "@/lib/authorization";

export default async function AuditPage() {
  await requirePermission("audit:read");

  return (
    <section style={{ display: "grid", gap: "16px" }}>
      <div>
        <h1>Audit Log</h1>
        <p>Módulo de auditoría en construcción.</p>
      </div>
    </section>
  );
}