// Tokens : lus dans design/ds-export/tokens.json (couleurs clair et sombre, typo, espacements, rayons, ombres, mouvement…).
import type { Metadata } from "next";
import { readJson } from "@/docs/read";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Tokens · documentation" };

type Tok = { name: string; value: string | { light: string; dark: string }; usage?: string };
type Style = { name: string; fontSize: string; lineHeight: number; sample: string; usage: string };
type Tokens = {
  color: { tokens: Tok[] };
  type: { families: Record<string, string>; groups: { name: string; note: string; styles: Style[] }[] };
  [k: string]: unknown;
};

const simple: [string, string][] = [
  ["spacing", "Espacements"], ["radius", "Rayons"], ["shadow", "Ombres"], ["size", "Tailles"], ["breakpoint", "Points de rupture"],
  ["zIndex", "Empilement"], ["motion", "Mouvement"], ["opacity", "Opacités"],
];

export default function Tokens() {
  const t = readJson<Tokens>("design/ds-export/tokens.json");
  if (!t) return <article><h1 className="h2">Tokens</h1><p>tokens.json introuvable.</p></article>;
  return (
    <article>
      <h1 className="h2">Tokens</h1>
      <h2 className="h4">Couleurs</h2>
      <table className={s.table}>
        <thead><tr><th>Nom</th><th>Clair</th><th>Sombre</th><th>Usage</th></tr></thead>
        <tbody>{t.color.tokens.map((c) => {
          const v = typeof c.value === "string" ? { light: c.value, dark: c.value } : c.value;
          return (
            <tr key={c.name}>
              <td><code>{c.name}</code></td>
              <td><span data-theme="light" className={s.swatch} style={{ background: `var(--${c.name})` }} />{v.light}</td>
              <td><span data-theme="dark" className={s.swatch} style={{ background: `var(--${c.name})` }} />{v.dark}</td>
              <td>{c.usage}</td>
            </tr>
          );
        })}</tbody>
      </table>
      <h2 className="h4">Typographie</h2>
      <p>Polices : {Object.entries(t.type.families).map(([k, v]) => <span key={k}><code>{k}</code> {v}. </span>)}</p>
      {t.type.groups.map((g) => (
        <section key={g.name}>
          <h3 className="h5">{g.name}</h3>
          <p className={s.muted}>{g.note}</p>
          <table className={s.table}>
            <thead><tr><th>Style</th><th>Taille</th><th>Aperçu</th><th>Usage</th></tr></thead>
            <tbody>{g.styles.map((st) => (
              <tr key={st.name}><td><code>{st.name}</code></td><td>{st.fontSize} / {st.lineHeight}</td><td className={st.name}>{st.sample}</td><td>{st.usage}</td></tr>
            ))}</tbody>
          </table>
        </section>
      ))}
      {simple.map(([key, label]) => {
        const fam = t[key] as { tokens: Tok[] } | undefined;
        if (!fam) return null;
        return (
          <section key={key}>
            <h2 className="h4">{label}</h2>
            <table className={s.table}>
              <thead><tr><th>Nom</th><th>Valeur</th><th>Usage</th></tr></thead>
              <tbody>{fam.tokens.map((k) => (
                <tr key={k.name}><td><code>{k.name}</code></td><td>{typeof k.value === "string" ? k.value : JSON.stringify(k.value)}</td><td>{k.usage}</td></tr>
              ))}</tbody>
            </table>
          </section>
        );
      })}
    </article>
  );
}
