import { SignJWT, jwtVerify } from "jose";

export type SessionPayload = {
  sub: string;
  email: string;
  role: "ADMIN" | "COLLABORATOR" | "USER";
};

function getEncodedKey() {
  const secretKey = process.env.AUTH_SECRET;

  if (!secretKey) {
    throw new Error("AUTH_SECRET no está definido en .env");
  }

  return new TextEncoder().encode(secretKey);
}

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getEncodedKey());
  return payload as unknown as SessionPayload;
}
