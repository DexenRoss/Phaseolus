import { NextResponse } from "next/server";
import {
  AuthorizationError,
  requireRequestPermission,
} from "@/lib/authorization";
import { createPublication } from "@/server/services/publication.service";

export async function POST(req: Request) {
  try {
    const session = await requireRequestPermission("publication:create");

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
    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Error al crear publicación" },
      { status: 500 }
    );
  }
}