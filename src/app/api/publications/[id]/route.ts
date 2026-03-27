import { NextResponse } from "next/server";
import {
  AuthorizationError,
  requireRequestPermission,
} from "@/lib/authorization";
import {
  getPublicationById,
  updatePublication,
  deletePublication,
} from "@/server/services/publication.service";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: Context) {
  const { id } = await context.params;

  const publication = await getPublicationById(id);

  if (!publication) {
    return NextResponse.json(
      { error: "No encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(publication);
}

export async function PUT(req: Request, context: Context) {
  try {
    await requireRequestPermission("publication:update");

    const { id } = await context.params;
    const body = await req.json();

    const updated = await updatePublication({
      id,
      ...body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar la publicación" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: Context) {
  try {
    await requireRequestPermission("publication:delete");

    const { id } = await context.params;
    await deletePublication(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar la publicación" },
      { status: 500 }
    );
  }
}