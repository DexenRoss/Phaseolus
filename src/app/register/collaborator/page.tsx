"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CollaboratorRegisterPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const email = (sp.get("email") || "").toLowerCase();
  const token = sp.get("token") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const invalidLink = useMemo(() => !email || !token, [email, token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (invalidLink) {
      setMsg("Link inválido. Revisa el correo de invitación.");
      return;
    }
    if (!firstName || !lastName || !password) {
      setMsg("Completa todos los campos.");
      return;
    }
    if (password !== password2) {
      setMsg("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/collaborators/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          inviteToken: token,
          firstName,
          lastName,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Error");

      // redirige a “revisa tu correo”
      router.push(`/register/check-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setMsg(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-xs font-semibold tracking-wide">UNAM</div>
        <div className="hidden md:block text-xs text-muted-foreground">
          Registro de colaborador
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-6 md:pt-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Lado izquierdo: titulo / instrucciones (desktop) */}
          <section className="hidden md:block">
            <h1 className="text-4xl font-extrabold tracking-tight">Crea tu cuenta</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Te invitamos como colaborador. Completa tus datos y confirma tu correo para activar tu cuenta.
            </p>
          </section>

          {/* Card formulario (mobile + desktop) */}
          <section className="rounded-2xl border border-border bg-muted p-6 md:p-10">
            <div className="md:hidden">
              <h1 className="text-3xl font-extrabold leading-tight">Crea tu cuenta</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Registro exclusivo para colaboradores.
              </p>
            </div>

            {invalidLink && (
              <div className="mt-4 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                Link inválido. Abre el link del correo de invitación.
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Nombre">
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nombre"
                  />
                </Field>

                <Field label="Apellido">
                  <input
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Apellido"
                  />
                </Field>
              </div>

              <Field label="Email (invitation)">
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm opacity-80"
                  value={email}
                  readOnly
                />
              </Field>

              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Contraseña">
                  <input
                    type="password"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </Field>

                <Field label="Repetir contraseña">
                  <input
                    type="password"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="••••••••"
                  />
                </Field>
              </div>

              {msg && (
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {msg}
                </div>
              )}

              <button
                disabled={loading || invalidLink}
                className="w-full rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
