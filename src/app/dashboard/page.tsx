import { getCurrentSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  return (
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
          Overview
        </h1>
        <p style={{ color: "#475569", marginTop: "8px" }}>
          Bienvenido de nuevo a Phaseolus.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "18px" }}>Sesión</h2>
          <p style={{ marginBottom: 0, color: "#475569" }}>
            Usuario autenticado: {session?.email}
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "18px" }}>Rol</h2>
          <p style={{ marginBottom: 0, color: "#475569" }}>
            Nivel actual: {session?.role}
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "18px" }}>Estado</h2>
          <p style={{ marginBottom: 0, color: "#475569" }}>
            Base del sistema operando correctamente.
          </p>
        </div>
      </div>
    </section>
  );
}