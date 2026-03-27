import { NextResponse } from "next/server";
import {
  AuthorizationError,
  requireRequestPermission,
} from "@/lib/authorization";
import { createAuthor } from "@/server/services/author.service";

export async function POST(req: Request) {
  try {
    await requireRequestPermission("author:create");

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
    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Error al crear autor" },
      { status: 500 }
    );
  }
}