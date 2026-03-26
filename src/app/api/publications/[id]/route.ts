import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
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
  const session = await getCurrentSession();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "COLLABORATOR")
  ) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await req.json();

  const updated = await updatePublication({
    id,
    ...body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "COLLABORATOR")
  ) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const { id } = await context.params;

  await deletePublication(id);

  return NextResponse.json({ success: true });
}