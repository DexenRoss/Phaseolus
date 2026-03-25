import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET no está definido en .env");
}

const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  sub: string;
  email: string;
  role: "ADMIN" | "COLLABORATOR" | "USER";
};

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, encodedKey);
  return payload as unknown as SessionPayload;
}