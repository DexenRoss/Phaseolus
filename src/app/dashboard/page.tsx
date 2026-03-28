import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import Can from "@/components/auth/can";
import SectionCard from "@/components/ui/section-card";
import { PERMISSIONS } from "@/lib/permissions";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) return null;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Bienvenido de nuevo a Phaseolus
        </h1>
        <p className="max-w-2xl text-sm text-[var(--muted-foreground)]">
          Controla publicaciones, autores y módulos administrativos desde una
          interfaz clara y consistente.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Can permissions={session.permissions} require={[PERMISSIONS.userRead]}>
          <Link href="/dashboard/users" className="dashboard-tile">
            <span className="dashboard-tile__eyebrow">Administración</span>
            <h2>Usuarios</h2>
            <p>Consulta usuarios del sistema y gestiona accesos administrativos.</p>
          </Link>
        </Can>

        <Can
          permissions={session.permissions}
          require={[PERMISSIONS.invitationRead]}
        >
          <Link href="/dashboard/invitations" className="dashboard-tile">
            <span className="dashboard-tile__eyebrow">Administración</span>
            <h2>Invitaciones</h2>
            <p>Controla invitaciones para nuevos colaboradores.</p>
          </Link>
        </Can>

        <Can permissions={session.permissions} require={[PERMISSIONS.auditRead]}>
          <Link href="/dashboard/audit" className="dashboard-tile">
            <span className="dashboard-tile__eyebrow">Administración</span>
            <h2>Auditoría</h2>
            <p>Revisa actividad global y trazabilidad del sistema.</p>
          </Link>
        </Can>

        <Can
          permissions={session.permissions}
          require={[PERMISSIONS.authorCreate, PERMISSIONS.authorUpdate]}
        >
          <Link href="/dashboard/authors" className="dashboard-tile">
            <span className="dashboard-tile__eyebrow">Contenido científico</span>
            <h2>Autores</h2>
            <p>Crea y edita autores ligados a publicaciones científicas.</p>
          </Link>
        </Can>

        <Can
          permissions={session.permissions}
          require={[PERMISSIONS.publicationCreate, PERMISSIONS.publicationUpdate]}
        >
          <Link href="/dashboard/publications" className="dashboard-tile">
            <span className="dashboard-tile__eyebrow">Contenido científico</span>
            <h2>Publicaciones</h2>
            <p>Administra publicaciones, autores relacionados y su estado.</p>
          </Link>
        </Can>
      </div>

      <SectionCard title="Sesión actual" description="Resumen de identidad y permisos activos">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Usuario autenticado</p>
            <p className="mt-1 font-medium">{session.email}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Rol actual</p>
            <p className="mt-1 font-medium">{session.role}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}