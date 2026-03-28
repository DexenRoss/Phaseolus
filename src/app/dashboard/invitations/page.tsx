import RoleGuard from "@/components/auth/role-guard";
import SectionCard from "@/components/ui/section-card";

export default function InvitationsPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <SectionCard
        title="Invitations"
        description="Control de invitaciones para nuevos colaboradores."
      >
        <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted-foreground)]">
          Módulo de invitaciones en construcción.
        </div>
      </SectionCard>
    </RoleGuard>
  );
}