import RoleGuard from "@/components/auth/role-guard";
import CreatePublicationForm from "@/components/publications/create-publication-form";
import { getAllAuthors } from "@/server/services/author.service";
import { getAllPublications } from "@/server/services/publication.service";
import DeletePublicationButton from "@/components/publications/delete-publication-button";

export default async function PublicationsPage() {
  const [publications, authors] = await Promise.all([
    getAllPublications(),
    getAllAuthors(),
  ]);

  return (
    <RoleGuard allowedRoles={["ADMIN", "COLLABORATOR"]}>
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
            Publications
          </h1>
          <p style={{ color: "#475569", marginTop: "8px" }}>
            Gestión de publicaciones científicas y sus autores.
          </p>
        </div>

        <CreatePublicationForm authors={authors} />

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
              minWidth: "1100px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px" }}>Title</th>
                <th style={{ padding: "12px" }}>Slug</th>
                <th style={{ padding: "12px" }}>Journal</th>
                <th style={{ padding: "12px" }}>DOI</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px" }}>Publication Date</th>
                <th style={{ padding: "12px" }}>Authors</th>
                <th style={{ padding: "12px" }}>Created By</th>
                <th style={{ padding: "12px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {publications.map((publication) => (
                <tr
                  key={publication.id}
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <td style={{ padding: "12px" }}>{publication.title}</td>
                  <td style={{ padding: "12px" }}>{publication.slug}</td>
                  <td style={{ padding: "12px" }}>{publication.journal ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{publication.doi ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{publication.status}</td>
                  <td style={{ padding: "12px" }}>
                    {publication.publicationDate
                      ? new Date(publication.publicationDate).toLocaleDateString(
                          "es-MX"
                        )
                      : "—"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {publication.authors.length > 0
                      ? publication.authors
                          .map((item) => item.author.fullName)
                          .join(", ")
                      : "—"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {publication.createdBy.email}
                  </td>
                  <td>
                    <a href={`/dashboard/publications/${publication.id}`}>
                      Editar
                    </a>
                    {" | "}
                    <DeletePublicationButton id={publication.id} />
                  </td>
                </tr>
              ))}

              {publications.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No hay publicaciones registradas.
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