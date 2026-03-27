import { NextResponse } from "next/server";
import { requireRequestPermission, AuthorizationError } from "@/lib/authorization";
import { isAppRole } from "@/lib/permissions";
import { updateUserRole } from "@/server/services/user.service";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, context: Context) {
  try {
    await requireRequestPermission("user:updateRole");

    const { id } = await context.params;
    const body = await req.json();
    const { role } = body as { role?: string };

    if (!role || !isAppRole(role)) {
      return NextResponse.json(
        { error: "Rol inválido" },
        { status: 400 }
      );
    }

    const user = await updateUserRole(id, role);

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    console.error(error);

    return NextResponse.json(
      { error: "Error al actualizar el rol del usuario" },
      { status: 500 }
    );
  }
}