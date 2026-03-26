"use client";

import { useState } from "react";

export default function CreateInvitationForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("COLLABORATOR");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/invitations", {
      method: "POST",
      body: JSON.stringify({ email, role }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setEmail("");
    setLoading(false);
    location.reload(); // simple refresh
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px" }}>
      <input
        type="email"
        placeholder="email@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="COLLABORATOR">COLLABORATOR</option>
        <option value="USER">USER</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Invitar"}
      </button>
    </form>
  );
}