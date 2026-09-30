// Documentation : barre latérale (prise en main + composants par groupe) et contenu.
import Link from "next/link";
import type { ReactNode } from "react";
import { groups, components } from "@/docs/entries";
import { site } from "@/data/site";
import s from "./docs.module.scss";

const start = [
  ["/docs/", "Démarrage"], ["/docs/architecture/", "Architecture"], ["/docs/marque/", "Guide de marque"], ["/docs/tokens/", "Tokens"],
  ["/docs/pages/", "Pages et maquettes"], ["/docs/performance/", "Performance"], ["/docs/versions/", "Journal des versions"],
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <nav className={s.nav} aria-label="Documentation">
        <Link href="/" className={s.brand}>{site.name} · Documentation</Link>
        <p className={s.navTitle}>Prise en main</p>
        <ul>{start.map(([href, l]) => <li key={href}><Link href={href}>{l}</Link></li>)}</ul>
        {groups.map((g) => (
          <div key={g}>
            <p className={s.navTitle}>{g}</p>
            <ul>{components.filter((c) => c.group === g).map((c) => <li key={c.id}><Link href={`/docs/composants/${c.id}/`}>{c.title}</Link></li>)}</ul>
          </div>
        ))}
      </nav>
      <main className={s.main}>{children}<footer className={s.foot}>Généré depuis le design system {site.name} v{site.dsVersion}</footer></main>
    </div>
  );
}
