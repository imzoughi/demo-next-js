import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/docs/CodeBlock";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Démarrage · documentation" };

export default function Start() {
  return (
    <article>
      <h1 className="h2">Démarrage</h1>
      <p>Ce site présente les pages de la boutique et la documentation du design system. Les composants sont ceux de l’application : les exemples de la documentation sont leurs stories.</p>
      <h2 className="h4">Commandes</h2>
      <CodeBlock code={`npm install\nnpm run dev            # serveur de développement\nnpm run storybook      # Storybook (port 6006)\nnpm run check          # lint + types + build (doit rester vert)\nnpm run build          # export statique dans out/\nnpm run start          # sert out/`} />
      <h2 className="h4">Liens clés</h2>
      <ul className={s.list}>
        <li><Link href="/docs/tokens/">Tokens</Link></li>
        <li><Link href="/docs/composants/button/">Composants</Link></li>
        <li><Link href="/docs/pages/">Pages et maquettes</Link></li>
        <li><Link href="/docs/versions/">Journal des versions</Link></li>
      </ul>
      <h2 className="h4">Comment brancher les données</h2>
      <p>Les pages lisent leurs données dans <code>src/lib/api</code> (mocks typés dans <code>src/mocks</code>). Pour brancher le backend :</p>
      <ol className={s.list}>
        <li>Garder les types de <code>src/mocks/types.ts</code> comme contrat de réponse.</li>
        <li>Remplacer, fonction par fonction, le corps des fonctions de <code>src/lib/api/index.ts</code> par un appel HTTP vers le backend (même signature, même type de retour).</li>
        <li>Ne rien changer dans les composants : ils reçoivent leurs données par props.</li>
        <li>Lancer <code>npm run check</code> : les types signalent tout écart entre le backend et le contrat.</li>
      </ol>
    </article>
  );
}
