"use client";

type Props = {
  id: string;
};

export default function DeletePublicationButton({ id }: Props) {
  async function handleDelete() {
    if (!confirm("¿Eliminar publicación?")) return;

    const response = await fetch(`/api/publications/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("No se pudo eliminar la publicación");
      return;
    }

    location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
    >
      Eliminar
    </button>
  );
}