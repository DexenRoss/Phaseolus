import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import {
  AppPermission,
  AppRole,
  hasPermission,
  isAppRole,
} from "@/lib/permissions";

export class AuthorizationError extends Error {
  status: 401 | 403;

  constructor(message: string, status: 401 | 403) {
    super(message);
    this.name = "AuthorizationError";
    this.status = status;
  }
}

type AuthorizedSession = {
  sub: string;
  email: string;
  role: AppRole;
};

function normalizeSessionRole(role: unknown): AppRole {
  if (!isAppRole(role)) {
    throw new AuthorizationError("Rol inválido en sesión", 403);
  }

  return role;
}

export async function requirePermission(
  permission: AppPermission
): Promise<AuthorizedSession> {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const role = normalizeSessionRole(session.role);

  if (!hasPermission(role, permission)) {
    redirect("/forbidden");
  }

  return {
    sub: session.sub,
    email: session.email,
    role,
  };
}

export async function requireRequestPermission(
  permission: AppPermission
): Promise<AuthorizedSession> {
  const session = await getCurrentSession();

  if (!session) {
    throw new AuthorizationError("No autenticado", 401);
  }

  const role = normalizeSessionRole(session.role);

  if (!hasPermission(role, permission)) {
    throw new AuthorizationError("No autorizado", 403);
  }

  return {
    sub: session.sub,
    email: session.email,
    role,
  };
}