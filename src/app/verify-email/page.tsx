"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";

  const [status, setStatus] = useState<"loading"|"ok"|"error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function run() {
      if (!token) {
        setStatus("error");
        setMessage("Token inválido.");
        return;
      }

      try {
        const res = await fetch(`/api/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(data?.error || "Error");

        setStatus("ok");
        setMessage("Correo confirmado ✅ Tu cuenta ya está activa.");
      } catch (e: any) {
        setStatus("error");
        setMessage(e.message || "Link inválido o expirado.");
      }
    }
    run();
  }, [token]);

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-muted p-6 md:p-10">
        {status === "loading" && <div>Verificando...</div>}
        {status !== "loading" && <div className="text-lg font-semibold">{message}</div>}

        {status === "ok" && (
          <a
            href="/"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Ir al inicio
          </a>
        )}
      </div>
    </main>
  );
}
