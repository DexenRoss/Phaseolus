import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { createInvitation } from "@/server/services/invitation.service";

export async function POST(req: Request) {
  const session = await getCurrentSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email y role son requeridos" },
        { status: 400 }
      );
    }

    const invitation = await createInvitation({
      email,
      role,
      invitedById: session.sub,
    });

    return NextResponse.json(invitation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear invitación" },
      { status: 500 }
    );
  }
}