import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { createAuthor } from "@/server/services/author.service";

export async function POST(req: Request) {
  const session = await getCurrentSession();

  if (
    !session ||
    (session.role !== "ADMIN" && session.role !== "COLLABORATOR")
  ) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { fullName, orcid, affiliation, email } = await req.json();

    if (!fullName) {
      return NextResponse.json(
        { error: "fullName es requerido" },
        { status: 400 }
      );
    }

    const author = await createAuthor({
      fullName,
      orcid,
      affiliation,
      email,
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear autor" },
      { status: 500 }
    );
  }
}