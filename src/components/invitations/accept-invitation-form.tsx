"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  token: string;
};

type InvitationInfo = {
  email: string;
  role: string;
  status: string;
  expiresAt: string;
};

export default function AcceptInvitationForm({ token }: Props) {
  const router = useRouter();

  const [invitation, setInvitation] = useState<InvitationInfo | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingInvitation, setLoadingInvitation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadInvitation() {
      try {
        setLoadingInvitation(true);
        setError("");

        if (!token) {
          setError("Token de invitación no proporcionado");
          return;
        }

        const response = await fetch(`/api/invitations/${token}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "No se pudo cargar la invitación");
          return;
        }

        setInvitation(data);
      } catch {
        setError("Ocurrió un error al cargar la invitación");
      } finally {
        setLoadingInvitation(false);
      }
    }

    loadInvitation();
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/invitations/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          name,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo aceptar la invitación");
        return;
      }

      setSuccess("Cuenta creada correctamente. Redirigiendo a login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingInvitation) {
    return <p>Cargando invitación...</p>;
  }

  if (error && !invitation) {
    return (
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "#fef2f2",
          color: "#b91c1c",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "#f8fafc",
        }}
      >
        <div>
          <strong>Email invitado:</strong> {invitation?.email}
        </div>
        <div>
          <strong>Rol asignado:</strong> {invitation?.role}
        </div>
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
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
          }}
        >
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: "none",
          background: submitting ? "#9ca3af" : "#111827",
          color: "#ffffff",
          fontWeight: 600,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? "Creando cuenta..." : "Aceptar invitación"}
      </button>
    </form>
  );
}