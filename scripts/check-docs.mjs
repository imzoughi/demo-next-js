#!/usr/bin/env node
// Contrôle de la documentation générée (toutes stacks) — lancé par le contrôleur QA après le build.
// Usage : node check-docs.mjs <dossier construit> [--prefix /docs]
//   html   : node check-docs.mjs dist/docs
//   nextjs : node check-docs.mjs out --prefix /docs [--base /mon-projet]   (export statique ; chemins absolus résolus depuis out/)
// Bloquant (code 1) : Markdown non rendu, HTML échappé deux fois, bloc de code vide, lien interne cassé,
// image sans alt, id en double, h1 absent ou multiple, kit de documentation absent.
// Avertissement : saut de niveau de titre (h2 → h4).
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dir = path.resolve(args.find((a, i) => !a.startsWith('--') && !['--prefix', '--base'].includes(args[i - 1])) || 'dist/docs');
const opt = (k) => args.includes(k) ? (args[args.indexOf(k) + 1] || '') : '';
const prefix = opt('--prefix');
const basePath = opt('--base'); // basePath Next.js / GitHub Pages, ex. /boutique-demo
if (!fs.existsSync(dir)) { console.error(`Dossier introuvable : ${dir} (lance le build d’abord)`); process.exit(2); }

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
let files = walk(dir).filter((f) => f.endsWith('.html'));
if (prefix) { const sub = path.join(dir, prefix); files = files.filter((f) => f.startsWith(sub + path.sep) || f === sub + '.html'); }

const errors = []; const warnings = [];
const err = (f, m) => errors.push(`${path.relative(dir, f)} : ${m}`);
const warn = (f, m) => warnings.push(`${path.relative(dir, f)} : ${m}`);

const strip = (h) => h
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<pre[\s\S]*?<\/pre>/gi, ' ').replace(/<code[\s\S]*?<\/code>/gi, ' ')
  .replace(/<template[\s\S]*?<\/template>/gi, ' ');
const text = (h) => strip(h).replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ');

const MD = [
  [/\*\*[^*\n]+\*\*/, 'gras Markdown non rendu (**…**)'],
  [/(^|\s)__[^_\n]+__(\s|$)/, 'gras Markdown non rendu (__…__)'],
  [/```|~~~/, 'bloc de code Markdown non rendu (```)'],
  [/^[ \t]*#{1,6}[ \t]+\S/m, 'titre Markdown non rendu (# …)'],
  [/^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*\|/m, 'tableau Markdown non rendu (|---|)'],
  [/\[[^\]\n]+\]\((https?:|\/|\.|#)[^)\s]*\)/, 'lien Markdown non rendu ([…](…))'],
  [/!\[[^\]\n]*\]\([^)\s]+\)/, 'image Markdown non rendue (![…](…))'],
];
const ESCAPED = /&lt;\/?(p|strong|em|code|a|ul|ol|li|table|tr|td|th|h[1-6]|br|span|div)( [^&]*)?&gt;/i;

const resolveLink = (from, href) => {
  let clean = decodeURI(href.split('#')[0].split('?')[0]);
  if (basePath && clean.startsWith(basePath + '/')) clean = clean.slice(basePath.length);
  if (!clean) return true;
  const base = clean.startsWith('/') ? path.join(dir, clean) : path.resolve(path.dirname(from), clean);
  return [base, base + '.html', path.join(base, 'index.html')].some((p) => fs.existsSync(p) && fs.statSync(p).isFile())
    || (fs.existsSync(base) && fs.statSync(base).isFile());
};

let kitSeen = false;
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  if (/class="[^"]*\bdoc-shell\b/.test(h)) kitSeen = true;
  const t = text(h);
  for (const [re, label] of MD) { const m = t.match(re); if (m) err(f, `${label} → « ${m[0].trim().slice(0, 60)} »`); }
  const esc = strip(h).match(ESCAPED); if (esc) err(f, `HTML échappé affiché comme du texte → « ${esc[0].slice(0, 60)} »`);
  for (const m of h.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi)) {
    const inner = m[1].replace(/<[^>]+>/g, '').trim();
    if (!inner) err(f, 'bloc de code vide');
    else if (/^```/.test(inner)) err(f, 'bloc de code qui contient encore ses ``` d’ouverture');
  }
  // Page Tokens : elle doit montrer des tokens (pastilles ou lignes de tableau), sinon la lecture de tokens.json a échoué.
  if (/[\\/]tokens([\\/]index)?\.html$/.test(f) && !/doc-swatch"|<tbody>\s*<tr/.test(h)) err(f, 'page Tokens vide : tokens.json n’a pas été lu (format de l’export Claude Design : { color: { tokens: [...] }, ... })');
  const h1 = (h.match(/<h1[\s>]/gi) || []).length; if (h1 !== 1) err(f, `${h1} titre(s) h1 (il en faut exactement 1)`);
  let last = 0;
  for (const m of h.matchAll(/<h([1-6])[\s>]/gi)) { const lvl = +m[1]; if (last && lvl > last + 1) { warn(f, `saut de niveau de titre h${last} → h${lvl}`); break; } last = lvl; }
  for (const m of h.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) err(f, `image sans alt → ${m[0].slice(0, 60)}`);
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i); if (dup.length) err(f, `id en double : ${[...new Set(dup)].slice(0, 5).join(', ')}`);
  for (const m of strip(h).matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(href)) continue;
    if (!resolveLink(f, href)) err(f, `lien interne cassé → ${href}`);
  }
}
if (files.length && !kitSeen) errors.push('Kit de documentation Decade absent : aucune page n’utilise la structure .doc-shell (voir skill decade-portail, doc-kit/).');

console.log(`Documentation : ${files.length} page(s) contrôlée(s) dans ${path.relative(process.cwd(), dir) || '.'}`);
if (warnings.length) console.log(`\nAvertissements (${warnings.length}) :\n- ` + warnings.slice(0, 40).join('\n- '));
if (errors.length) { console.log(`\nERREURS (${errors.length}) :\n- ` + errors.slice(0, 80).join('\n- ') + `\n\nVerdict : ROUGE`); process.exit(1); }
console.log('\nVerdict : VERT'); process.exit(0);
