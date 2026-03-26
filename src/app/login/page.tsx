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
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <HelixBackground />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 pb-10 pt-3 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-slate-200/80 px-2 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-sm border border-slate-300 bg-white text-[10px] font-bold tracking-[0.2em] text-slate-700">
              UN
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-800">
              UNAM
            </span>
          </div>

          <span className="text-xs font-medium text-slate-700 sm:text-sm">
            Herramientas
          </span>
        </header>

        <section className="flex flex-1 flex-col pt-10 sm:pt-14 lg:pt-20">
          <h1 className="text-center text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
            Iniciar Sesión
          </h1>

          <div className="mt-14 sm:mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Acceso
            </h2>

            <div className="mt-5 rounded-[22px] bg-[#eef9eb]/95 px-5 py-10 shadow-[0_10px_30px_rgba(125,153,124,0.08)] ring-1 ring-[#d8ebd2] sm:px-8 md:px-12 md:py-12 lg:px-16">
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-4xl flex-col gap-6"
              >
                <div className="grid items-center gap-3 md:grid-cols-[170px_minmax(0,1fr)]">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700 md:text-right"
                  >
                    Usuario / correo
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    required
                    className="h-11 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div className="grid items-start gap-3 md:grid-cols-[170px_minmax(0,1fr)]">
                  <label
                    htmlFor="password"
                    className="pt-3 text-sm font-semibold text-slate-700 md:text-right"
                  >
                    Contraseña
                  </label>

                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        required
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 pr-11 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 transition hover:text-slate-700"
                        aria-label={
                          showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="w-fit text-left text-sm font-semibold text-slate-700 underline decoration-slate-500 underline-offset-2 transition hover:text-slate-900"
                    >
                      ¿Olvidaste la contraseña?
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {success}
                  </div>
                )}

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-w-40 items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {loading ? "Iniciando..." : "Iniciar Sesion"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HelixBackground() {
  return (
    <>
      <div className="pointer-events-none absolute right-0 top-16 h-[320px] w-[460px] opacity-[0.18]">
        <svg viewBox="0 0 460 320" className="h-full w-full" aria-hidden="true">
          <g stroke="#94a3b8" strokeWidth="1.2" fill="none">
            {Array.from({ length: 8 }).map((_, index) => {
              const x = 35 + index * 52;
              const y = 150 - Math.sin(index * 0.62) * 72;
              const y2 = 150 + Math.sin(index * 0.62) * 72;

              return (
                <g key={`top-${index}`}>
                  <line x1={x} y1={y} x2={x} y2={y2} />
                  <circle cx={x} cy={y} r="21" />
                  <circle cx={x} cy={y2} r="21" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[330px] w-[500px] opacity-[0.18]">
        <svg viewBox="0 0 500 330" className="h-full w-full" aria-hidden="true">
          <g stroke="#94a3b8" strokeWidth="1.2" fill="none">
            {Array.from({ length: 8 }).map((_, index) => {
              const x = 45 + index * 55;
              const y = 190 - Math.sin(index * 0.58) * 76;
              const y2 = 190 + Math.sin(index * 0.58) * 76;

              return (
                <g key={`bottom-${index}`}>
                  <line x1={x} y1={y} x2={x} y2={y2} />
                  <circle cx={x} cy={y} r="22" />
                  <circle cx={x} cy={y2} r="22" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}
