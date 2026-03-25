import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Dashboard
            </h1>
            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                color: "#475569",
              }}
            >
              Bienvenido a Phaseolus.
            </p>
          </div>

          <LogoutButton />
        </header>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            display: "grid",
            gap: "16px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Sesión actual
          </h2>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            <div>
              <strong>ID:</strong> {session.sub}
            </div>
            <div>
              <strong>Email:</strong> {session.email}
            </div>
            <div>
              <strong>Rol:</strong> {session.role}
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Estado del sistema
          </h2>

          <p style={{ color: "#475569", marginBottom: 0 }}>
            Autenticación base funcionando, sesión persistida con cookie y ruta
            protegida correctamente.
          </p>
        </section>
      </div>
    </main>
  );
}