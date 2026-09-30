// Lecture de fichiers du projet au moment du build (export statique) : serveur uniquement.
import fs from "node:fs";
import path from "node:path";

export const readText = (rel: string): string => {
  const f = path.join(process.cwd(), rel);
  return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
};

export function readJson<T>(rel: string): T | null {
  const t = readText(rel);
  return t ? (JSON.parse(t) as T) : null;
}
