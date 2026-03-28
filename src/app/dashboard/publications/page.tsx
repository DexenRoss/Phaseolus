import Link from "next/link";
import RoleGuard from "@/components/auth/role-guard";
import Can from "@/components/auth/can";
import SectionCard from "@/components/ui/section-card";
import CreatePublicationForm from "@/components/publications/create-publication-form";
import DeletePublicationButton from "@/components/publications/delete-publication-button";
import { getCurrentSession } from "@/lib/auth";
import { PERMISSIONS } from "@/lib/permissions";
import { getAllAuthors } from "@/server/services/author.service";
import { getAllPublications } from "@/server/services/publication.service";

export default async function PublicationsPage() {
  const session = await getCurrentSession();

  const [publications, authors] = await Promise.all([
    getAllPublications(),
    getAllAuthors(),
  ]);

  if (!session) return null;

  return (
    <RoleGuard allowedRoles={["ADMIN", "COLLABORATOR", "USER"]}>
      <div className="space-y-6">
        <SectionCard
          title="Publications"
          description="Gestión de publicaciones científicas y sus autores."
        >
          <Can
            permissions={session.permissions}
            require={[PERMISSIONS.publicationCreate]}
          >
            <div className="mb-6">
              <CreatePublicationForm authors={authors} />
            </div>
          </Can>

          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
              <thead className="bg-[var(--panel)]">
                <tr className="text-left text-sm text-[var(--muted-foreground)]">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Journal</th>
                  <th className="px-4 py-3">DOI</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Publication Date</th>
                  <th className="px-4 py-3">Authors</th>
                  <th className="px-4 py-3">Created By</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border)] bg-[var(--card)] text-sm">
                {publications.map((publication) => (
                  <tr key={publication.id}>
                    <td className="px-4 py-3 font-medium">{publication.title}</td>
                    <td className="px-4 py-3">{publication.slug}</td>
                    <td className="px-4 py-3">{publication.journal ?? "—"}</td>
                    <td className="px-4 py-3">{publication.doi ?? "—"}</td>
                    <td className="px-4 py-3">{publication.status}</td>
                    <td className="px-4 py-3">
                      {publication.publicationDate
                        ? new Date(publication.publicationDate).toLocaleDateString("es-MX")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {publication.authors.length > 0
                        ? publication.authors
                            .map((item) => item.author.fullName)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">{publication.createdBy.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">
                        <Can
                          permissions={session.permissions}
                          require={[PERMISSIONS.publicationUpdate]}
                        >
                          <Link
                            href={`/dashboard/publications/${publication.id}/edit`}
                            className="inline-flex rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold transition hover:bg-[var(--panel)]"
                          >
                            Editar
                          </Link>
                        </Can>

                        <Can
                          permissions={session.permissions}
                          require={[PERMISSIONS.publicationDelete]}
                        >
                          <DeletePublicationButton id={publication.id} />
                        </Can>
                      </div>
                    </td>
                  </tr>
                ))}

                {publications.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                      No hay publicaciones registradas.
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