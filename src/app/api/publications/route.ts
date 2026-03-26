import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { createPublication } from "@/server/services/publication.service";

export async function POST(req: Request) {
  const session = await getCurrentSession();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "COLLABORATOR")
  ) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await req.json();

    const {
      title,
      slug,
      abstract,
      journal,
      doi,
      publicationDate,
      status,
      authorIds,
    } = body;

    if (!title || !slug || !status) {
      return NextResponse.json(
        { error: "title, slug y status son requeridos" },
        { status: 400 }
      );
    }

    const publication = await createPublication({
      title,
      slug,
      abstract,
      journal,
      doi,
      publicationDate,
      status,
      createdById: session.sub,
      authorIds: Array.isArray(authorIds) ? authorIds : [],
    });

    return NextResponse.json(publication);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear publicación" },
      { status: 500 }
    );
  }
}