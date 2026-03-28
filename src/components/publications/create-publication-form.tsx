"use client";

import { useState } from "react";

type AuthorOption = {
  id: string;
  fullName: string;
  orcid: string | null;
};

type Props = {
  authors: AuthorOption[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreatePublicationForm({ authors }: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [abstract, setAbstract] = useState("");
  const [journal, setJournal] = useState("");
  const [doi, setDoi] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [authorIds, setAuthorIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleAuthorChange(authorId: string, checked: boolean) {
    if (checked) {
      setAuthorIds((prev) => [...prev, authorId]);
    } else {
      setAuthorIds((prev) => prev.filter((id) => id !== authorId));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          abstract,
          journal,
          doi,
          publicationDate,
          status,
          authorIds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "No se pudo crear la publicación");
        return;
      }

      setSuccess("Publicación creada correctamente");
      setTitle("");
      setSlug("");
      setAbstract("");
      setJournal("");
      setDoi("");
      setPublicationDate("");
      setStatus("DRAFT");
      setAuthorIds([]);
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
      className="grid gap-4 rounded-2x1 border border-[var(--border)] bg-[var(--panel)] p5"
      style={{
        display: "grid",
        gap: "16px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <h2 style={{ margin: 0 }}>Crear publicación</h2>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
            if (!slug) {
              setSlug(slugify(value));
            }
          }}
          className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="abstract">Abstract</label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            resize: "vertical",
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
          <label htmlFor="journal">Journal</label>
          <input
            id="journal"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          <label htmlFor="doi">DOI</label>
          <input
            id="doi"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          <label htmlFor="publicationDate">Fecha de publicación</label>
          <input
            id="publicationDate"
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
            }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: "10px" }}>
        <label>Autores existentes</label>

        {authors.length === 0 ? (
          <div
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: "#f8fafc",
              color: "#475569",
            }}
          >
            No hay autores registrados todavía.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "8px",
              maxHeight: "220px",
              overflowY: "auto",
              padding: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
            }}
          >
            {authors.map((author) => (
              <label
                key={author.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={authorIds.includes(author.id)}
                  onChange={(e) =>
                    handleAuthorChange(author.id, e.target.checked)
                  }
                  className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent-strong)]"
                />
                <span>
                  {author.fullName}
                  {author.orcid ? ` — ${author.orcid}` : ""}
                </span>
              </label>
            ))}
          </div>
        )}
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
        className="inline-flex w-fit rounded-xl bg-[var(--accent-strong)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
        {loading ? "Creando..." : "Crear publicación"}
      </button>
    </form>
  );
}