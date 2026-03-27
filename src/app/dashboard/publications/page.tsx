import Link from "next/link";
import { requirePermission } from "@/lib/authorization";
import PermissionGuard from "@/components/auth/permission-guard";
import CreatePublicationForm from "@/components/publications/create-publication-form";
import DeletePublicationButton from "@/components/publications/delete-publication-button";
import { getAllAuthors } from "@/server/services/author.service";
import { getAllPublications } from "@/server/services/publication.service";

export default async function PublicationsPage() {
  await requirePermission("publication:create");

  const [publications, authors] = await Promise.all([
    getAllPublications(),
    getAllAuthors(),
  ]);

  return (
    <section style={{ display: "grid", gap: "24px" }}>
      <div>
        <h1>Publications</h1>
        <p>Gestión de publicaciones científicas y sus autores.</p>
      </div>

      <PermissionGuard permission="publication:create">
        <CreatePublicationForm authors={authors} />
      </PermissionGuard>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Title</th>
              <th align="left">Slug</th>
              <th align="left">Journal</th>
              <th align="left">DOI</th>
              <th align="left">Status</th>
              <th align="left">Publication Date</th>
              <th align="left">Authors</th>
              <th align="left">Created By</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications.map((publication) => (
              <tr key={publication.id}>
                <td>{publication.title}</td>
                <td>{publication.slug}</td>
                <td>{publication.journal ?? "—"}</td>
                <td>{publication.doi ?? "—"}</td>
                <td>{publication.status}</td>
                <td>
                  {publication.publicationDate
                    ? new Date(publication.publicationDate).toLocaleDateString("es-MX")
                    : "—"}
                </td>
                <td>
                  {publication.authors.length > 0
                    ? publication.authors
                        .map((item) => item.author.fullName)
                        .join(", ")
                    : "—"}
                </td>
                <td>{publication.createdBy.email}</td>
                <td>
                  <PermissionGuard permission="publication:update" fallback={null}>
                    <Link href={`/dashboard/publications/${publication.id}/edit`}>
                      Editar
                    </Link>
                  </PermissionGuard>

                  {" "}

                  <PermissionGuard permission="publication:delete" fallback={null}>
                    <DeletePublicationButton id={publication.id} />
                  </PermissionGuard>
                </td>
              </tr>
            ))}

            {publications.length === 0 && (
              <tr>
                <td colSpan={9}>No hay publicaciones registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}