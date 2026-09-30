// Génère src/styles/tokens.css depuis design/ds-export/tokens.json (variables CSS, thème clair + sombre)
// et extrait les polices intégrées de bundle.css vers src/styles/fonts/.
// Usage : node scripts/build-tokens.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const t = JSON.parse(read('design/ds-export/tokens.json'));
const ref = (v) => v.replace(/^\{(.+)\}$/, 'var(--$1)');

const light = [];
const dark = [];
for (const c of t.color.tokens) {
  light.push(`--${c.name}:${ref(c.value.light)};`);
  dark.push(`--${c.name}:${ref(c.value.dark)};`);
}
const shadows = t.shadow.tokens.map((s) => `--${s.name}:${s.value};`);
const shared = [];
for (const k of ['spacing', 'radius', 'zIndex', 'size', 'breakpoint', 'motion', 'opacity']) {
  for (const s of t[k].tokens) shared.push(`--${s.name}:${s.value};`);
}
shared.push(`--font-display:${t.type.families.display};`, `--font-body:${t.type.families.body};`);

const out = `/* Généré par scripts/build-tokens.mjs depuis design/ds-export/tokens.json (version ${t.version}). Ne pas modifier à la main. */
:root,
[data-theme='light'] {
${[...light, ...shadows].map((l) => '  ' + l).join('\n')}
}

[data-theme='dark'] {
${dark.map((l) => '  ' + l).join('\n')}
}

:root {
${shared.map((l) => '  ' + l).join('\n')}
}
`;
writeFileSync(new URL('src/styles/tokens.css', root), out);

// Classes de texte (h1…h6, body-*, price) : générées dans _typography.scss
const styles = t.type.groups.flatMap((g) => g.styles.map((s) => ({ ...s, family: g.family })));
const typo = `// Généré par scripts/build-tokens.mjs depuis tokens.json (type.groups). Ne pas modifier à la main.
${styles
  .map(
    (s) =>
      `.${s.name} {\n  font-family: var(--font-${s.family});\n  font-size: ${s.fontSize};\n  line-height: ${s.lineHeight};\n  font-weight: ${s.fontWeight};\n}\n`,
  )
  .join('\n')}`;
writeFileSync(new URL('src/styles/_typography.scss', root), typo);

// Polices : data URI woff2 de bundle.css -> fichiers
mkdirSync(new URL('src/styles/fonts/', root), { recursive: true });
const css = read('design/ds-export/bundle.css');
const re = /@font-face\{font-family:'([^']+)';[^}]*?base64,([A-Za-z0-9+/=]+)\)/g;
let m;
while ((m = re.exec(css))) {
  const file = `${m[1].replace(/\s+/g, '')}-400.woff2`;
  writeFileSync(new URL(`src/styles/fonts/${file}`, root), Buffer.from(m[2], 'base64'));
  console.log('police', file);
}
console.log('tokens.css :', light.length, 'couleurs,', shared.length, 'autres variables');
