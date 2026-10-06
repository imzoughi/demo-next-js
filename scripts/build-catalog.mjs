// Génère src/docs/catalog.tsx (format du kit decade-portail) : un composant du design system = une entrée,
// ses stories = ses exemples vivants. À relancer après /import-ds : npm run docs:catalog
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dsDir = path.join(root, "design/ds-export/components");
const names = fs.readdirSync(dsDir).filter((n) => fs.statSync(path.join(dsDir, n)).isDirectory()).sort();
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const order = ["Fondations", "Actions", "Formulaires", "Retours et états", "Cartes", "Navigation", "Sections de page", "Couches"];
// Page du site où le composant est visible (libellé affiché sur la fiche). À compléter si besoin.
const pages = {
  Button: "Accueil", HeroBlocks: "Accueil", EmailSignup: "Accueil", Features: "Accueil",
  ProductCard: "Liste de produits", Listings: "Liste de produits", Filters: "Liste de produits", FiltersSheet: "Liste de produits",
  ProductDetails: "Fiche produit",
  CartItem: "Panier", ShoppingBasket: "Panier",
  CheckoutProgress: "Paiement", OrderSummary: "Paiement",
  AuthForm: "Compte", OrderList: "Compte", AccountMenu: "Compte",
};

const entries = [];
for (const n of names) {
  const kind = fs.existsSync(path.join(root, `src/components/ui/${n}`)) ? "ui" : "blocks";
  const dir = `src/components/${kind}/${n}`;
  const story = `${dir}/${n}.stories.tsx`;
  if (!fs.existsSync(path.join(root, story))) { console.warn(`Pas de story pour ${n} : ignoré`); continue; }
  const m = fs.readFileSync(path.join(root, story), "utf8").match(/title:\s*'([^/']+)\//);
  entries.push({ n, kind, dir, group: m ? m[1] : "Fondations" });
}
entries.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.n.localeCompare(b.n));

const imports = entries.map((e) => `import * as ${e.n}Stories from "@/components/${e.kind}/${e.n}/${e.n}.stories";`).join("\n");
const rows = entries.map((e) => {
  const page = pages[e.n] ? `, page: ${JSON.stringify(pages[e.n])}` : "";
  return `  { id: "${kebab(e.n)}", title: "${e.n}", group: ${JSON.stringify(e.group)}, ds: "${e.n}", files: ["${e.dir}/${e.n}.tsx", "${e.n}.module.scss", "${e.n}.stories.tsx"]${page}, examples: toExamples("${e.n}", ${e.n}Stories) },`;
}).join("\n");

fs.writeFileSync(path.join(root, "src/docs/catalog.tsx"),
`// Catalogue de la documentation (Next.js / React) : une entrée par composant, tenue à jour par /import-ds.
// Généré par scripts/build-catalog.mjs (npm run docs:catalog) : ne pas modifier à la main.
// Source unique : les stories. Une story = un exemple du portail = un test (Storybook test-run), avec son code dessous.
// composeStories (portable stories de Storybook) rend chaque story utilisable hors de Storybook.
import type { ComponentType } from "react";
import { composeStories } from "@storybook/react";
${imports}
import { storyCode } from "./jsx";

export type Example = { name: string; Render: ComponentType; code: string };
export type Entry = { id: string; title: string; group: string; ds?: string; files: string[]; hooks?: string[]; page?: string; examples: Example[] };

type Composed = ComponentType & { storyName?: string; args?: Record<string, unknown>; parameters?: { docs?: { source?: { code?: string } } } };
const toExamples = (title: string, mod: Record<string, unknown>): Example[] =>
  Object.entries(composeStories(mod as never) as unknown as Record<string, Composed>)
    .map(([name, S]) => ({ name: S.storyName ?? name, Render: S, code: storyCode(title, S) }));

export const groups = ${JSON.stringify(order)};

export const components: Entry[] = [
${rows}
];
`);
console.log(entries.length, "composants");
