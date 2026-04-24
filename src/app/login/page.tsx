
"use client";
import React from "react";

import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  useEffect(() => {
    try {
      const s = localStorage.getItem("phaseolus_session");
      if (s) {
        window.location.href = "/";
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold text-center mb-6">Acceso</h1>
          <div className="rounded-2xl bg-card p-8 shadow-md space-y-6 border border-border">
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Usuario o correo
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="username"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste la contraseña?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 mt-4"
                onClick={async (e) => {
                  e.preventDefault();
                  localStorage.setItem("phaseolus_session", JSON.stringify({ email: (document.getElementById("email") as HTMLInputElement)?.value, name: "Usuario", timestamp: Date.now() }));
                  window.location.href = "/";
                }}
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
