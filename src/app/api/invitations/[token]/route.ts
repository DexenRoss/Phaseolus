import { NextResponse } from "next/server";
import { getInvitationByToken } from "@/server/services/invitation.service";

type RouteContext = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    const invitation = await getInvitationByToken(token);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitación no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(invitation);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener invitación" },
      { status: 500 }
    );
  }
}