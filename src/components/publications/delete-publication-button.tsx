"use client";

export default function DeletePublicationButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("¿Eliminar publicación?")) return;

    await fetch(`/api/publications/${id}`, {
      method: "DELETE",
    });

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      style={{ color: "red" }}
    >
      Eliminar
    </button>
  );
}