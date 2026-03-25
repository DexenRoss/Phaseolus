"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("admin@phaseolus.local");
  const [password, setPassword] = useState("Admin1234*");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo iniciar sesión");
        return;
      }

      setSuccess("Login exitoso. Redirigiendo...");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginBottom: "8px",
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Iniciar sesión
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: "24px",
            color: "#6b7280",
          }}
        >
          Accede al panel de Phaseolus.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "16px" }}
        >
          <div style={{ display: "grid", gap: "8px" }}>
            <label htmlFor="email" style={{ fontWeight: 600, color: "#111827" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <label
              htmlFor="password"
              style={{ fontWeight: 600, color: "#111827" }}
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#fef2f2",
                color: "#b91c1c",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                padding: "12px",
                borderRadius: "10px",
                background: "#ecfdf5",
                color: "#047857",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "#9ca3af" : "#111827",
              color: "#ffffff",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}