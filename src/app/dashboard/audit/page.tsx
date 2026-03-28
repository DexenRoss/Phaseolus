import RoleGuard from "@/components/auth/role-guard";
import SectionCard from "@/components/ui/section-card";

export default function AuditPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <SectionCard
        title="Audit Log"
        description="Trazabilidad global y actividad administrativa del sistema."
      >
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted-foreground)]">
          Módulo de auditoría en construcción.
        </div>
      </SectionCard>
    </RoleGuard>
  );
}