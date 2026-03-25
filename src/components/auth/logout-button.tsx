"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("No se pudo cerrar sesión");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "10px 14px",
        borderRadius: "10px",
        border: "none",
        background: loading ? "#9ca3af" : "#dc2626",
        color: "#ffffff",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}