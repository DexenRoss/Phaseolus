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
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
      <h3 className="text-lg font-semibold">Crear autor</h3>

      <div className="grid gap-2">
        <label htmlFor="fullName" className="text-sm font-medium">Nombre completo</label>
        <input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <div className="grid gap-2">
          <label htmlFor="orcid" className="text-sm font-medium">ORCID</label>
          <input
            id="orcid"
            value={orcid}
            onChange={(e) => setOrcid(e.target.value)}
            placeholder="0000-0000-0000-0000"
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="affiliation" className="text-sm font-medium">Afiliación</label>
          <input
            id="affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-fit rounded-xl bg-[var(--accent-strong)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creando..." : "Crear autor"}
      </button>
    </form>
  );
}