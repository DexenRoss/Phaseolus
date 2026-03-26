import { NextResponse } from "next/server";
import { acceptInvitation } from "@/server/services/invitation.service";

export async function POST(req: Request) {
  try {
    const { token, name, username, password } = await req.json();

    if (!token || !name || !username || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const user = await acceptInvitation({
      token,
      name,
      username,
      password,
    });

    return NextResponse.json({
      message: "Invitación aceptada correctamente",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      const knownErrors: Record<string, { status: number; message: string }> = {
        INVITATION_NOT_FOUND: {
          status: 404,
          message: "Invitación no encontrada",
        },
        INVITATION_NOT_AVAILABLE: {
          status: 400,
          message: "La invitación ya no está disponible",
        },
        INVITATION_EXPIRED: {
          status: 400,
          message: "La invitación ha expirado",
        },
        EMAIL_ALREADY_REGISTERED: {
          status: 400,
          message: "Ese correo ya está registrado",
        },
        USERNAME_ALREADY_TAKEN: {
          status: 400,
          message: "Ese username ya está en uso",
        },
      };

      const known = knownErrors[error.message];

      if (known) {
        return NextResponse.json(
          { error: known.message },
          { status: known.status }
        );
      }
    }

    console.error(error);
    return NextResponse.json(
      { error: "Error al aceptar invitación" },
      { status: 500 }
    );
  }
}