"use client";

import { useState } from "react";

export default function InviteCollaboratorPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg({ type: "err", text: data?.error || "Error" });
        return;
      }

      setMsg({ type: "ok", text: "Invitación enviada ✅" });
      setEmail("");
    } catch {
      setMsg({ type: "err", text: "Error de red" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Invitar colaborador
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Envía un link con token (expira) para que el colaborador cree su cuenta.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-muted p-6 md:p-10">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                Correo del colaborador
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@dominio.com"
                type="email"
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {msg && (
              <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <span className={msg.type === "ok" ? "" : ""}>{msg.text}</span>
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 md:w-auto"
            >
              {loading ? "Enviando..." : "Enviar invitación"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
