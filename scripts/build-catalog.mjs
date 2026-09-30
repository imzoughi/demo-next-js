// Génère src/docs/entries.ts et src/docs/loaders.ts depuis les composants et leurs stories.
// À relancer après /import-ds : node scripts/build-catalog.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dsDir = path.join(root, "design/ds-export/components");
const names = fs.readdirSync(dsDir).filter((n) => fs.statSync(path.join(dsDir, n)).isDirectory()).sort();
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const order = ["Fondations", "Actions", "Formulaires", "Retours et états", "Cartes", "Navigation", "Sections de page", "Couches"];

const entries = [];
for (const n of names) {
  const kind = fs.existsSync(path.join(root, `src/components/ui/${n}`)) ? "ui" : "blocks";
  const dir = `src/components/${kind}/${n}`;
  const story = `${dir}/${n}.stories.tsx`;
  let group = "Fondations";
  if (fs.existsSync(path.join(root, story))) {
    const m = fs.readFileSync(path.join(root, story), "utf8").match(/title:\s*'([^/']+)\//);
    if (m) group = m[1];
  }
  entries.push({ id: kebab(n), title: n, group, ds: n, dir, files: [`${dir}/${n}.tsx`, `${dir}/${n}.module.scss`, story], hasStories: fs.existsSync(path.join(root, story)) });
}
entries.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.title.localeCompare(b.title));

fs.writeFileSync(path.join(root, "src/docs/entries.ts"),
`// Généré par scripts/build-catalog.mjs : une entrée par composant du design system. Ne pas modifier à la main.
export type Entry = { id: string; title: string; group: string; ds: string; dir: string; files: string[]; hasStories: boolean };
export const groups = ${JSON.stringify(order)};
export const components: Entry[] = ${JSON.stringify(entries, null, 2)};
`);
const loaders = entries.filter((e) => e.hasStories).map((e) => `  "${e.id}": () => import("@/${e.dir.slice(4)}/${e.title}.stories"),`).join("\n");
fs.writeFileSync(path.join(root, "src/docs/loaders.ts"),
`// Généré par scripts/build-catalog.mjs : chargement des stories de chaque composant (une story = un exemple vivant).
export const loaders: Record<string, () => Promise<Record<string, unknown>>> = {
${loaders}
};
`);
console.log(entries.length, "composants");
