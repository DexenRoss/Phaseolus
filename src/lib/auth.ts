import { cookies } from "next/headers";
import { verifySessionToken, SessionPayload } from "@/lib/sessions";

export async function getCurrentSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifySessionToken(token);
    return payload;
  } catch {
    return null;
  }
}