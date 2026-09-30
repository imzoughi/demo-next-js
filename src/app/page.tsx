// Portail Decade (Next.js) : hero, une carte par parcours avec ses pages, carte Documentation.
import Link from "next/link";
import * as Icons from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button/Button";
import { Logo } from "@/components/ui/Logo/Logo";
import { Status } from "@/docs/Status";
import { components } from "@/docs/entries";
import s from "./portal.module.scss";

const docs = [
  ["/docs/", "Démarrage"], ["/docs/architecture/", "Architecture"], ["/docs/marque/", "Guide de marque"], ["/docs/tokens/", "Tokens"],
  ["/docs/composants/button/", "Composants"], ["/docs/pages/", "Pages et maquettes"], ["/docs/performance/", "Performance"], ["/docs/versions/", "Journal des versions"],
];

export default function Portal() {
  const prêtes = site.pages.filter((p) => p.status === "prête").length;
  return (
    <main className={s.portal}>
      <header className={s.hero}>
        <Logo href="/" current />
        <h1 className="h1">Maquettes front et documentation</h1>
        <p className="body-large">
          {site.client} : {site.pages.length} pages {site.stackLabel} à construire à partir du design system {site.name}.
        </p>
        <ul className={s.stats}>
          <li>{prêtes} page prête sur {site.pages.length}</li>
          <li>{components.length} composants</li>
          <li>Design system version {site.dsVersion}</li>
        </ul>
        <div className={s.ctas}>
          <Button href="/docs/">Documentation</Button>
          <Button href="/docs/composants/button/" type="secondary">Voir les composants</Button>
        </div>
      </header>
      <div className={s.groups}>
        {site.groups.map((g) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[g.icon] ?? Icons.Folder;
          return (
            <section key={g.title} className={s.group}>
              <div className={s.ghead}><Icon aria-hidden size={24} /><div><h2 className="h4">{g.title}</h2><p className="body-medium">{g.text}</p></div></div>
              <ul>
                {site.pages.filter((p) => p.group === g.title).map((p) => (
                  <li key={p.id}>
                    {p.status === "prête"
                      ? <Link href={p.href}>{p.title}<Icons.ArrowRight aria-hidden size={16} /></Link>
                      : <><span>{p.title}</span><Status value="à venir" /></>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <section className={`${s.group} ${s.docs}`}>
          <div className={s.ghead}><Icons.BookOpen aria-hidden size={24} /><div><h2 className="h4">Documentation</h2><p className="body-medium">Tokens, composants vivants avec code, pages, performance, versions.</p></div></div>
          <ul>{docs.map(([href, label]) => <li key={href}><Link href={href}>{label}<Icons.ArrowRight aria-hidden size={16} /></Link></li>)}</ul>
        </section>
      </div>
    </main>
  );
}
