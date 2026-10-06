// Portail Decade (Next.js) : même structure que le portail HTML — hero, groupes de pages, bloc documentation.
import Link from "next/link";
import * as Icons from "lucide-react";
import { site } from "@/data/site";
import s from "./portal.module.scss";

const docs = [["/docs", "Démarrage"], ["/docs/architecture", "Architecture"], ["/docs/tokens", "Tokens"], ["/docs/composants/button", "Composants"], ["/docs/pages", "Pages & maquettes"], ["/docs/versions", "Journal des versions"], ["/docs/performance", "Performance"]];

export default function Portal() {
  return (
    <main className={s.portal}>
      <header className={s.hero}>
        <h1>Maquettes front et documentation</h1>
        <p>{site.pages.length} pages {site.stackLabel} construites à partir du design system {site.name} (version {site.dsVersion}).</p>
        <div className={s.ctas}>
          <Link className="btn btn--primary" href={site.pages[0].href}>Voir le site</Link>
          <Link className="btn btn--secondary" href="/docs">Documentation</Link>
        </div>
      </header>
      <div className={s.groups}>
        {site.groups.map((g) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[g.icon] ?? Icons.Folder;
          return (
            <section key={g.title} className={s.group}>
              <div className={s.ghead}><Icon aria-hidden size={22} /><div><h2>{g.title}</h2><p>{g.text}</p></div></div>
              <ul>{site.pages.filter((p) => p.group === g.title).map((p) => (
                <li key={p.id}><Link href={p.href}>{p.title}<Icons.ArrowRight aria-hidden size={16} /></Link></li>
              ))}</ul>
            </section>
          );
        })}
        <section className={`${s.group} ${s.docs}`}>
          <div className={s.ghead}><Icons.BookOpen aria-hidden size={22} /><div><h2>Documentation</h2><p>Tokens, composants vivants avec code, pages, versions.</p></div></div>
          <ul>{docs.map(([href, label]) => <li key={href}><Link href={href}>{label}<Icons.ArrowRight aria-hidden size={16} /></Link></li>)}</ul>
        </section>
      </div>
    </main>
  );
}
