import { createHash } from "node:crypto";

export function hash(data) {
  return createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

export function isHashProofed({ hash, difficulty, prefix = "0" }) {
  return hash.startsWith(prefix.repeat(difficulty));
}
