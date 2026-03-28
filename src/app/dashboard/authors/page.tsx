import RoleGuard from "@/components/auth/role-guard";
import Can from "@/components/auth/can";
import SectionCard from "@/components/ui/section-card";
import CreateAuthorForm from "@/components/authors/create-author-form";
import { getCurrentSession } from "@/lib/auth";
import { PERMISSIONS } from "@/lib/permissions";
import { getAllAuthors } from "@/server/services/author.service";

export default async function AuthorsPage() {
  const session = await getCurrentSession();
  const authors = await getAllAuthors();

  if (!session) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN", "COLLABORATOR"]}>
      <div className="space-y-6">
        <SectionCard
          title="Authors"
          description="Gestión de autores relacionados con publicaciones científicas."
        >
          <Can permissions={session.permissions} require={[PERMISSIONS.authorCreate]}>
            <div className="mb-6">
              <CreateAuthorForm />
            </div>
          </Can>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--panel)]">
                <tr className="text-left text-sm text-[var(--muted-foreground)]">
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">ORCID</th>
                  <th className="px-4 py-3">Affiliation</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Publications</th>
                  <th className="px-4 py-3">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-[var(--card)] text-sm">
                {authors.map((author) => (
                  <tr key={author.id}>
                    <td className="px-4 py-3 font-medium">{author.fullName}</td>
                    <td className="px-4 py-3">{author.orcid ?? "—"}</td>
                    <td className="px-4 py-3">{author.affiliation ?? "—"}</td>
                    <td className="px-4 py-3">{author.email ?? "—"}</td>
                    <td className="px-4 py-3">{author._count.publications}</td>
                    <td className="px-4 py-3">
                      {new Date(author.createdAt).toLocaleString("es-MX")}
                    </td>
                  </tr>
                ))}

                {authors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                      No hay autores registrados.
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