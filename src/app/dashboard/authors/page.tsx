import RoleGuard from "@/components/auth/role-guard";
import CreateAuthorForm from "@/components/authors/create-author-form";
import { getAllAuthors } from "@/server/services/author.service";

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

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
            Authors
          </h1>
          <p style={{ color: "#475569", marginTop: "8px" }}>
            Gestión de autores relacionados con publicaciones científicas.
          </p>
        </div>

        <CreateAuthorForm />

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
              minWidth: "950px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px" }}>Full Name</th>
                <th style={{ padding: "12px" }}>ORCID</th>
                <th style={{ padding: "12px" }}>Affiliation</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Publications</th>
                <th style={{ padding: "12px" }}>Created At</th>
              </tr>
            </thead>

            <tbody>
              {authors.map((author) => (
                <tr key={author.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>{author.fullName}</td>
                  <td style={{ padding: "12px" }}>{author.orcid ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{author.affiliation ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{author.email ?? "—"}</td>
                  <td style={{ padding: "12px" }}>{author._count.publications}</td>
                  <td style={{ padding: "12px" }}>
                    {new Date(author.createdAt).toLocaleString("es-MX")}
                  </td>
                </tr>
              ))}

              {authors.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No hay autores registrados.
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