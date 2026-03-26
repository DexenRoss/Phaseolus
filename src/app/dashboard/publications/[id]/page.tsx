import EditPublicationForm from "@/components/publications/edit-publication-form";
import { getAllAuthors } from "@/server/services/author.service";
import { getPublicationById } from "@/server/services/publication.service";

type EditPublicationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPublicationPage({
  params,
}: EditPublicationPageProps) {
  const { id } = await params;

  const [publication, authors] = await Promise.all([
    getPublicationById(id),
    getAllAuthors(),
  ]);

  if (!publication) {
    return (
      <main style={{ padding: "32px" }}>
        <h1>Publicación no encontrada</h1>
        <p>No existe una publicación con ese ID.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "32px" }}>
      <EditPublicationForm publication={publication} authors={authors} />
    </main>
  );
}

