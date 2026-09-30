// Journal des versions : affiche design/CHANGELOG.md, écrit à chaque /import-ds.
import type { Metadata } from "next";
import { readText } from "@/docs/read";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Journal des versions · documentation" };

export default function Versions() {
  const md = readText("design/CHANGELOG.md");
  return <article><h1 className="h2">Journal des versions</h1><div className={s.prose}>{md || "Aucune version pour l’instant."}</div></article>;
}
