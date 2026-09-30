import type { Metadata } from "next";
import { CodeBlock } from "@/docs/CodeBlock";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Architecture · documentation" };

export default function Architecture() {
  return (
    <article>
      <h1 className="h2">Architecture</h1>
      <CodeBlock code={`design/ds-export/      design system validé (lecture seule)
design/CHANGELOG.md    journal des versions importées
qa/                    rapports QA et mesures de performance
src/app/               routes : / (portail), /docs, pages du BRIEF
src/components/ui/     composants de base (un dossier par composant)
src/components/blocks/ blocs de page
src/lib/api/           accès aux données (mocks typés)
src/styles/            tokens.css (généré), typographie, mouvement
src/docs/              catalogue de la documentation (généré)`} />
      <h2 className="h4">Conventions</h2>
      <ul className={s.list}>
        <li>Aucune couleur en dur : uniquement les variables de <code>tokens.css</code>.</li>
        <li>Textes en français, casse de phrase ; icônes Lucide via le composant Icon.</li>
        <li>Composants serveur par défaut ; <code>&quot;use client&quot;</code> seulement pour l’interactif.</li>
      </ul>
      <h2 className="h4">Cycle de vie d’un composant</h2>
      <p>Import du design system, composant avec ses stories, contrôle QA, puis page qui l’utilise. Seul un verdict VERT du contrôleur QA valide le composant.</p>
      <h2 className="h4">Synchronisation avec le design system</h2>
      <p>À chaque nouvelle version : <code>/import-ds</code> régénère <code>tokens.css</code>, met à jour les composants, ajoute une entrée au journal des versions et régénère le catalogue (<code>node scripts/build-catalog.mjs</code>).</p>
    </article>
  );
}
