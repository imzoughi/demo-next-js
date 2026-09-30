"use client";
// Bloc de code avec bouton Copier (doc Next.js).
import { useState } from "react";
import s from "./doc-ui.module.scss";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {});
  };
  return (
    <div className={s.code}>
      <button type="button" className={s.copy} onClick={copy}>{copied ? "Copié" : "Copier"}</button>
      <pre><code>{code}</code></pre>
    </div>
  );
}
