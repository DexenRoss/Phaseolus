"use client";

import { useState } from "react";

export default function CreateAuthorForm() {
  const [fullName, setFullName] = useState("");
  const [orcid, setOrcid] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          orcid,
          affiliation,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo crear el autor");
        return;
      }

      setSuccess("Autor creado correctamente");
      setFullName("");
      setOrcid("");
      setAffiliation("");
      setEmail("");
      location.reload();
    } catch {
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "16px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ margin: 0 }}>Crear autor</h2>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="fullName">Nombre completo</label>
        <input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        <div style={{ display: "grid", gap: "8px" }}>
          <label htmlFor="orcid">ORCID</label>
          <input
            id="orcid"
            value={orcid}
            onChange={(e) => setOrcid(e.target.value)}
            placeholder="0000-0000-0000-0000"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          <label htmlFor="affiliation">Afiliación</label>
          <input
            id="affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>
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
        {loading ? "Creando..." : "Crear autor"}
      </button>
    </form>
  );
}