# QA — boucle /ds-component, tour 2 (30/09/2026)

Verdict global : **ROUGE** — CartItem VERT, EmailSignup ROUGE.
(Rapport transmis par le contrôleur QA, recopié par la session principale : l'outil d'écriture n'était pas disponible pour le contrôleur.)

## Exécuté
- `npm run check` vert ; `npm run build-storybook` vert.
- Rendu + axe (WCAG A/AA) via Playwright sur storybook-static : 5 stories CartItem, 8 EmailSignup, clair et sombre, 375 / 768 / 1280 / 1440 (axe à 375 et 1280).
- Next DevTools `get_errors` impossible (pas de MCP) : remplacé par build OK et 0 erreur console.

## CartItem — VERT
- Axe : 0 violation sur les 5 stories (clair et sombre, 375 et 1280) ; `list` / `listitem` de la story Tiroir corrigés (ul → li direct).
- Tiroir : `ul` max-width 480 px (`--size-drawer`) ; Page panier non bornée.
- 0 débordement, 0 erreur JS, 0 cible < 44 px aux 4 largeurs.

## EmailSignup — ROUGE
- Sombre, fond #4E4D93 : message Erreur et Échec serveur rendus en **blanc** (7,48:1), pas en couleur d'erreur.
- Cause : la règle sombre redéfinit `--color-feedback-error` avec `color-mix(... var(--color-feedback-error) ...)` → cycle CSS, valeur vide, héritage du blanc. La bordure du champ en erreur devient blanche aussi : l'erreur ne se distingue plus.
- Correction attendue : pas d'auto-référence (variable intermédiaire d'un autre nom ou mélange de tokens distincts) ; message rose (proche #F2B8B5), ≥ 4,5:1 sur #4E4D93, bordure du champ en couleur d'erreur.
- Variantes Sombre et Compact : `#f2b8b5` inchangé ; clair : `#b3261e` (6,21:1) inchangé. Aucune couleur en dur.
