// Import du design system : découpe design/ds-export/bundle.css en un Nom.module.scss par composant.
// Les classes av-* deviennent des noms locaux (root, éléments, modificateurs en camelCase).
// Usage : node scripts/split-ds-css.mjs   (écrase les .module.scss générés : à n'exécuter que pour le premier import)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1').replace(/\/$/, '');
let css = readFileSync(ROOT + '/design/ds-export/bundle.css', 'utf8').replace(/base64,[A-Za-z0-9+/=]+/g, 'base64,X');
const start = css.indexOf('/* ——— Icon ——— */');
css = css.slice(start);
const a = css.indexOf('/* ——— États communs');
const b = css.indexOf('/* ——— Logo ——— */');
css = css.slice(0, a) + css.slice(b);

const UI = ['Icon','Logo','Button','IconButton','TextLink','TextInput','FieldMessage','Choice','Stepper','Toast','Skeleton','Badge','FilterChip','Drawer'];
const owners = {
  Icon: { icon: '' }, Logo: { logo: '' }, Button: { btn: '' }, IconButton: { iconbtn: '' }, TextLink: { link: '' },
  TextInput: { field: '', input: 'input' }, FieldMessage: { 'field-msg': '' }, Choice: { choice: '' }, Stepper: { stepper: '' },
  Toast: { toast: '', 'toast-region': 'region' }, Skeleton: { skel: 'skel', 'skel-wrap': 'wrap', 'skel-card': 'card', 'skel-lines': 'lines' },
  EmptyState: { empty: '' }, Badge: { badge: '' }, FilterChip: { chip: '' }, CartItem: { cartitem: '' }, Drawer: { drawer: '' },
  MiniCart: { minicart: '' }, FiltersSheet: { sheet: '' }, TopNav: { topnav: '' }, Breadcrumb: { crumb: '' }, Banner: { banner: '' },
  EmailSignup: { signup: '' }, Footer: { footer: '' }, ProductCard: { pcard: '' }, FeatureCard: { fcard: '' }, HeroBlocks: { hero: '' },
  Features: { features: '' }, Listings: { listings: '' }, PageHeader: { pagehead: '' }, Filters: { filters: '' }, ProductDetails: { pd: '' },
  OrderSummary: { summary: '' }, ShoppingBasket: { basket: '' }, CheckoutProgress: { steps: '' }, AuthForm: { auth: '' },
  AccountMenu: { account: '' }, OrderList: { orders: '' },
};
const baseOwner = {};
for (const [o, m] of Object.entries(owners)) for (const bb of Object.keys(m)) baseOwner[bb] = o;
const SHARED_KF = new Set(['av-fade-in', 'av-fade-out', 'av-pulse-3', 'av-msg-in']);
const kfOwner = (n) => n.startsWith('av-icon') ? 'Icon' : n.startsWith('av-toast') ? 'Toast' : n.startsWith('av-ci') ? 'CartItem' : n.startsWith('av-drawer') ? 'Drawer' : null;

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function parseClass(tok) {
  const m = /^av-(.+?)(?:__(.+?))?(?:--(.+))?$/.exec(tok);
  return { base: m[1], elem: m[2], mod: m[3] };
}
function localName(owner, tok) {
  const { base, elem, mod } = parseClass(tok);
  const prefix = owners[owner][base];
  const parts = [elem, mod].filter(Boolean).map(camel);
  if (prefix === '') return parts.length ? parts[0] + parts.slice(1).map(cap).join('') : 'root';
  return prefix + parts.map(cap).join('');
}
function parse(text, wrappers, out) {
  let i = 0; let pendingComment = '';
  while (i < text.length) {
    const c = text[i];
    if (/\s/.test(c)) { i++; continue; }
    if (text.startsWith('/*', i)) { const e = text.indexOf('*/', i); pendingComment = text.slice(i, e + 2); i = e + 2; continue; }
    let j = i, depth = 0;
    while (j < text.length && !(text[j] === '{' && depth === 0)) { if (text[j] === '(') depth++; if (text[j] === ')') depth--; j++; }
    const prelude = text.slice(i, j).trim();
    let k = j + 1, d = 1;
    while (d > 0) { if (text[k] === '{') d++; else if (text[k] === '}') d--; k++; }
    const body = text.slice(j + 1, k - 1);
    if (/^@(media|container)/.test(prelude)) parse(body, [...wrappers, prelude], out);
    else if (prelude.startsWith('@keyframes')) out.push({ kind: 'kf', name: prelude.split(/\s+/)[1], body, wrappers, comment: pendingComment });
    else out.push({ kind: 'rule', prelude, body, wrappers, comment: pendingComment });
    pendingComment = ''; i = k;
  }
}
const items = []; parse(css, [], items);

const files = {};
const flags = [];
const add = (o, e) => ((files[o] ||= []).push(e));

function splitTop(s, sep) {
  const r = []; let d = 0, cur = '';
  for (const ch of s) {
    if (ch === '(' || ch === '[') d++;
    if (ch === ')' || ch === ']') d--;
    if (ch === sep && d === 0) { r.push(cur); cur = ''; } else cur += ch;
  }
  r.push(cur);
  return r.map((x) => x.trim()).filter(Boolean);
}
function decls(body) { return splitTop(body, ';').map((x) => x.replace(/\s+/g, ' ')); }

for (const it of items) {
  if (it.kind === 'kf') {
    if (SHARED_KF.has(it.name)) continue;
    const o = kfOwner(it.name);
    add(o, { kf: true, name: it.name.replace(/^av-/, ''), body: it.body, wrappers: it.wrappers });
    continue;
  }
  const bySel = {};
  for (const sel of splitTop(it.prelude, ',')) {
    const classes = [...sel.matchAll(/\.(av-[a-z0-9_-]+)/g)].map((m) => m[1]);
    const first = classes.find((c) => baseOwner[parseClass(c).base]);
    if (!first) { flags.push('SANS PROPRIETAIRE: ' + sel); continue; }
    const owner = baseOwner[parseClass(first).base];
    (bySel[owner] ||= []).push(sel);
  }
  for (const [owner, sels] of Object.entries(bySel)) {
    const outSels = sels.map((sel) => sel.replace(/\.(av-[a-z0-9_-]+)/g, (m, tok) => {
      const { base } = parseClass(tok);
      if (base === 'icon') { flags.push(`${owner}: ${sel}  [icon -> svg]`); return 'svg'; }
      const bo = baseOwner[base];
      if (!bo) { if (base === 'sec') { flags.push(`${owner}: ${sel} [sec]`); return '.__SEC_' + tok + '__'; } return m; }
      if (bo !== owner) { flags.push(`${owner}: ${sel}  [foreign ${tok} of ${bo}]`); return '.__FOREIGN_' + tok + '__'; }
      return '.' + localName(owner, tok);
    }).replace(/\.is-([a-z]+)/g, (m, s) => '.is' + cap(s)));
    add(owner, { sels: outSels, decls: decls(it.body), wrappers: it.wrappers, comment: it.comment });
  }
}

const fmtDecl = (d) => (d.endsWith(';') ? d : d + ';');
function render(owner, entries) {
  const used = new Set();
  const lines = [];
  let cur = null;
  const closeWrap = () => { if (cur !== null) { lines.push('}', ''); cur = null; } };
  const wkey = (w) => w.join(' | ');
  for (const e of entries) {
    const ind = e.wrappers.length ? '  ' : '';
    const k = e.wrappers.length ? wkey(e.wrappers) : null;
    if (k !== cur) {
      closeWrap();
      if (k !== null) { lines.push(e.wrappers[0] + ' {'); cur = k; }
    }
    if (e.comment && !e.wrappers.length) lines.push(e.comment.replace(/av-/g, ''));
    if (e.kf) {
      lines.push(`${ind}@keyframes ${e.name} {`, ...e.body.trim().split('\n').map((l) => ind + '  ' + l.trim()), `${ind}}`, '');
      continue;
    }
    lines.push(`${ind}${e.sels.join(',\n' + ind)} {`);
    for (const d of e.decls) {
      lines.push(`${ind}  ${fmtDecl(d)}`);
      for (const m of d.matchAll(/(?<![-\w])av-(fade-in|fade-out|pulse-3|msg-in)/g)) used.add(m[1]);
    }
    lines.push(`${ind}}`, '');
  }
  closeWrap();
  let txt = lines.join('\n');
  txt = txt.replace(/(animation(?:-name)?:[^;]*)/g, (m) => m.replace(/(?<![-\w])av-/g, ''));
  txt = txt.replace(/\n{3,}/g, '\n\n');
  const inc = [...used].map((u) => `@include kf-${u};`).join('\n');
  const head = `// ${owner} : styles traduits de design/ds-export (bundle.css, design system 1.0.0). Tokens en variables CSS uniquement.\n@use '../../../styles/motion' as *;\n${inc ? '\n' + inc + '\n' : ''}\n`;
  return head + txt.trim() + '\n';
}
for (const [owner, entries] of Object.entries(files)) {
  const dir = UI.includes(owner) ? 'ui' : 'blocks';
  const path = owner === 'FieldMessage' ? `${ROOT}/src/components/ui/TextInput/FieldMessage.module.scss` : owner === 'Choice' ? `${ROOT}/src/components/ui/Choice/Choice.module.scss` : `${ROOT}/src/components/${dir}/${owner}/${owner}.module.scss`;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, render(owner, entries));
}
console.log(flags.join('\n'));
