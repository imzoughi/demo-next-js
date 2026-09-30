import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['.next/**', 'out/**', 'storybook-static/**', 'design/**', 'node_modules/**', 'next-env.d.ts', 'lighthouserc.cjs', 'tmp-qa/**'] },
];

export default config;
