import { requirePermission } from "@/lib/authorization";
import PermissionGuard from "@/components/auth/permission-guard";
import CreateAuthorForm from "@/components/authors/create-author-form";
import { getAllAuthors } from "@/server/services/author.service";

export default async function AuthorsPage() {
  await requirePermission("author:create");

  const authors = await getAllAuthors();

  return (
    <section style={{ display: "grid", gap: "24px" }}>
      <div>
        <h1>Authors</h1>
        <p>Gestión de autores relacionados con publicaciones científicas.</p>
      </div>

      <PermissionGuard permission="author:create">
        <CreateAuthorForm />
      </PermissionGuard>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Full Name</th>
              <th align="left">ORCID</th>
              <th align="left">Affiliation</th>
              <th align="left">Email</th>
              <th align="left">Publications</th>
              <th align="left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.fullName}</td>
                <td>{author.orcid ?? "—"}</td>
                <td>{author.affiliation ?? "—"}</td>
                <td>{author.email ?? "—"}</td>
                <td>{author._count.publications}</td>
                <td>{new Date(author.createdAt).toLocaleString("es-MX")}</td>
              </tr>
            ))}

            {authors.length === 0 && (
              <tr>
                <td colSpan={6}>No hay autores registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}