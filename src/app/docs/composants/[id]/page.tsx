// Fiche composant : règles du design system, statut QA, exemples vivants (stories), code à copier, fichiers.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { components } from "@/docs/entries";
import { CodeBlock } from "@/docs/CodeBlock";
import { Examples } from "@/docs/Examples";
import { Status } from "@/docs/Status";
import { readText } from "@/docs/read";
import { qaRouge, qaStatus, qaSource } from "@/data/qa";
import s from "@/docs/doc-ui.module.scss";

export function generateStaticParams() { return components.map((c) => ({ id: c.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = components.find((x) => x.id === id);
  return { title: c ? `${c.title} · documentation` : "Composant" };
}

export default async function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = components.find((x) => x.id === id);
  if (!c) notFound();
  const rules = readText(`design/ds-export/components/${c.ds}/README.md`);
  const source = readText(`${c.dir}/${c.title}.tsx`);
  const props = source.match(new RegExp(`export interface ${c.title}Props[\\s\\S]*?\\n}`))?.[0] ?? "";
  const status = qaStatus(c.ds);
  return (
    <article>
      <h1 className="h2">{c.title} <Status value={status} /></h1>
      <p className={s.muted}>{c.group} · statut d’après {qaSource}</p>
      {status === "ROUGE" && <p>À reprendre : {qaRouge[c.ds]}</p>}
      {rules && <section><h2 className="h4">Règles du design system</h2><div className={s.prose}>{rules}</div></section>}
      <section><h2 className="h4">Exemples</h2><Examples id={c.id} /></section>
      <section>
        <h2 className="h4">Code</h2>
        <CodeBlock code={`import { ${c.title} } from "@/components/${c.dir.split("/")[2]}/${c.title}/${c.title}";`} />
        {props && <CodeBlock code={props} />}
      </section>
      <section><h2 className="h4">Fichiers</h2><ul className={s.list}>{c.files.map((f) => <li key={f}><code>{f}</code></li>)}</ul></section>
      <section><h2 className="h4">Page où le voir</h2><p>Aucune page intégrée pour l’instant.</p></section>
    </article>
  );
}
