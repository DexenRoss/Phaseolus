import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/sessions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y password son requeridos" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    if (user.status !== "ACTIVE" || !user.emailVerifiedAt) {
      return NextResponse.json(
        { error: "Debes verificar tu correo antes de iniciar sesión" },
        { status: 403 }
      );
    }

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ 
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
