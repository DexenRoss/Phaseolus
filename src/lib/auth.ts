import { cookies } from "next/headers";
import { verifySessionToken, SessionPayload } from "@/lib/sessions";
import {
  AppPermission,
  AppRole,
  getPermissionsByRole,
} from "@/lib/permissions";

export type CurrentSession = SessionPayload & {
  permissions: AppPermission[];
};

export async function getCurrentSession(): Promise<CurrentSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifySessionToken(token);

    const role = payload.role as AppRole;

    return {
      ...payload,
      role,
      permissions: getPermissionsByRole(role),
    };
  } catch {
    return null;
  }
}