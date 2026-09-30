import type { Metadata } from "next";
import { readText } from "@/docs/read";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Guide de marque · documentation" };

export default function Brand() {
  const md = readText("design/ds-export/README.md");
  return <article><h1 className="h2">Guide de marque</h1><div className={s.prose}>{md || "README du design system introuvable."}</div></article>;
}
