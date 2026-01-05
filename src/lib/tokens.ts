import crypto from "crypto";

export function sha256hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function randomTokenBase64Url(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}
