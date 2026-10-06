# QA all — boutique-demo (06/10/2026, 5e passe)

**Verdict global : VERT** (avec réserves orange, toutes déjà connues). Le point rouge R1 de la 4e passe est corrigé et vérifié. Aucune régression détectée sur les 6 pages ni sur le portail.

Environnement : Node v22.12.0, Windows. Contrôle fait dans une copie propre du dépôt (`next dev` tourne sur le port 3000).
- **MCP Next DevTools** : répond. `get_compilation_issues` vide. `get_errors` ne remonte qu'un avertissement d'hydratation dû à des extensions du navigateur (`data-lt-installed`, `data-qb-installed`, `cz-shortcut-listen`), pas une erreur du code.
- **MCP Storybook** : `docs-list` répond, `test-run` n'est pas exposé au contrôleur. Axe refait sur les 185 stories (`storybook build` + Playwright).
- `tests/` toujours vide : `test:ui` et `shots` remplacés par des scripts Playwright. `npm run docs:check` absent : contrôle équivalent fait à la main.

## Vérification prioritaire de R1 : VERT
- Build préfixé `NEXT_PUBLIC_BASE_PATH=/boutique-demo` : OK.
- `src/app/docs/pages/page.tsx` : l. 5 `import { withBase } from "@/lib/paths"`, l. 18 et 19 `src={withBase(p.href)}`.
- `out/docs/pages/index.html` contient 2 fois chacun `src="/boutique-demo/accueil/"`, `/liste-produits/`, `/fiche-produit/`, `/panier/`, `/paiement/`, `/compte/` ; plus aucun `src="/accueil/"` nu.
- Servi sous `/boutique-demo/` dans Edge : 12 iframes chargées (1 H1 et un titre chacune), 0 réponse 404 hors artefact `__next.!…`.

## Point rouge
Aucun.

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| R1 — aperçus de « Pages et maquettes » préfixés | VERT | voir ci-dessus |
| `npm run check` (copie propre) | VERT | lint, `tsc`, `next build` : 54 pages en export statique, avec et sans préfixe. O1 reste latent |
| `npm run docs:check` | ORANGE | script absent (O3) ; équivalent VERT (ligne Documentation) |
| get_errors / compilation (MCP Next) | VERT avec réserve | 0 erreur du code ; avertissement dû aux extensions |
| N1 — tiroir après navigation | VERT | 1440 et 375 : « Voir le panier » et « Commander » ferment le tiroir ; focus sur body (avertissement) |
| E1 — cohérence du panier | VERT | 670 € de la fiche au tiroir, au panier, au paiement ; 0 rechargement complet ; survit au rechargement |
| MiniCart | VERT | Échap, fermer, clic sur le fond (1440), focus rendu au bouton Panier, piège de focus à 1440 et 375 |
| Interactions (parcours, compte, paiement, filtres, feuille Filtres) | VERT | 28 / 28 |
| Mouvement réduit | VERT | 6 pages × 4 largeurs, aucun blocage |
| Plafond de stock (A5) | VERT | `aria-disabled` + message relié par `aria-describedby` |
| Captures 6 pages × 4 largeurs (24) | VERT | 0 débordement, 1 H1 et 1 main par page, 0 image cassée, cartes de même hauteur, 0 texte coupé |
| axe 6 pages × 4 largeurs | VERT | 1 minor : `aria-allowed-role` sur `/compte/` (AuthForm), inchangé |
| Portail / docs à 375 (45 pages) | VERT | 0 débordement, 1 H1, `<pre>` défilants focalisables |
| axe portail / docs | VERT | 0 serious ; moderate inchangés (`landmark-unique`, `heading-order` sur `/docs/marque`) |
| Documentation (équivalent docs:check) | VERT | rendu vérifié à 1280 et 375 ; 0 lien interne cassé (51) ; « 6 pages prêtes sur 6 » |
| axe stories (185), clair et sombre, 375 | VERT | 0 serious ou critical |
| axe stories (185), clair et sombre, 1440 | VERT | 0 violation ; O5 (`document-title`) disparu |
| E3 — liens des exemples | ORANGE | liens `#` du pied de page et des stories (écart n° 2) |
| A1 — GitHub Pages préfixé | VERT | liens, images, polices, CSS, JS, parcours et logo préfixés ; `.nojekyll` et `.github/workflows/pages.yml` présents |
| A2 — 404 de préchargement / console | ORANGE | 0 erreur JS ; 404 `__next.!…txt` en prefetch RSC sous `serve` (probable artefact Windows), à revérifier sur le déploiement |
| Code React / Next.js (Vercel) | VERT | `Promise.all`, `use()`, pas de barrel ni de `forwardRef` ; remarque : Button cumule `loading`, `disabled`, `softDisabled`, `fullWidth` |
| BRIEF et règles d'or | VERT | casse de phrase, Lucide, aucune couleur en dur (un hexa en commentaire, `EmailSignup.module.scss` l. 23), durées via tokens. Titres en Red Hat Display au lieu de Clash Display (écart n° 3, à trancher) |
| Performance (non bloquant) | ORANGE | score 99, LCP < 1 s, CLS < 0,001, TBT < 35 ms, JS 288-294 Ko ; images accueil 227 Ko et liste 208 Ko > 200 Ko |

## Points orange (inchangés)
- **O1** — `tsconfig.json` l. 19 inclut `.next/dev/types/**/*.ts` : `npm run check` peut échouer quand `next dev` tourne. Retirer l'entrée, ou arrêter le dev et supprimer `.next/dev`.
- **O2** — `src/docs/Table.tsx` : mots coupés lettre par lettre dans les colonnes étroites (fiche Button à 1280). Largeur minimale ou `white-space: nowrap`.
- **O3** — `scripts/check-docs.mjs` et le script `docs:check` absents.
- **O4** — `tests/` vide : `test:ui` et `shots` ne tournent pas.
- **O6** — images accueil (227 Ko) et liste (208 Ko) au-dessus de `performance.imagesKo` (200). Non bloquant.

## Avertissements
- Après « Voir le panier » ou « Commander », le focus reste sur body : idéalement le placer sur le titre ou le main.
- `landmark-unique` : nommer les régions répétées de `/docs/pages` et de quelques fiches.
- Le workflow Pages lance `npm run build` mais pas `npm run check`.
- `suppressHydrationWarning` est sur `<html>` mais pas sur `<body>` (`src/app/layout.tsx`).
- `test-run` du MCP Storybook non appelé : blocage ouvert dans `workflow/blocages.md`, mais axe équivalent VERT (2 thèmes, 2 largeurs).
- Écarts n° 1 à 34 inchangés.

## Performance (Lighthouse desktop, médiane de 3)
| Page | Score | LCP | CLS | TBT | JS | Images |
|---|---|---|---|---|---|---|
| accueil | 99 | 970 ms | 0,0004 | 32 ms | 288 Ko | 227 Ko (⚠) |
| liste-produits | 99 | 921 ms | 0,0006 | 30 ms | 292 Ko | 208 Ko (⚠) |
| fiche-produit | 99 | 861 ms | 0,0005 | 29 ms | 290 Ko | 42 Ko |
| panier | 99 | 889 ms | 0,0009 | 32 ms | 291 Ko | 27 Ko |
| paiement | 99 | 809 ms | 0,0005 | 27 ms | 294 Ko | 0 Ko |
| compte | 99 | 834 ms | 0,0005 | 31 ms | 293 Ko | 0 Ko |

Seuils : score ≥ 85, LCP ≤ 2500 ms, CLS ≤ 0,1, TBT ≤ 300 ms, JS ≤ 300 Ko, images ≤ 200 Ko.

## Traces du contrôle
Aucun code modifié. Captures ajoutées dans `tmp-qa/passe5/captures/`. Copies de travail temporaires dans `%TEMP%\qacopy*` (à effacer).
