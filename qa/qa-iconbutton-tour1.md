# QA IconButton, tour 1 sur 3

**Verdict : ROUGE.** Un seul écart bloquant : le lien désactivé échoue à axe (WCAG A). Le reste est conforme.

Contrôleur QA indépendant. Aucun code modifié, backlog non coché. Date : 2026-09-30.

## Contrôles

| Contrôle | Statut | Détail |
| --- | --- | --- |
| `npm run check` | VERT | 0 erreur, 47 pages statiques. |
| `npm run build-storybook` | VERT | 15 stories IconButton + docs. |
| Story par variante et par état | VERT | Tailles sm, md, lg et pressé présents (motif du ROUGE précédent levé). |
| Rendu 375 / 768 / 1280 / 1440, clair et sombre | VERT | 0 erreur, 0 débordement. |
| Axe WCAG A/AA, clair et sombre | ROUGE | 14/15 stories OK. `disabled-link` : `aria-prohibited-attr`. |
| Zone 44 × 44 | VERT | Mesurée sur les 15 stories. |
| Clavier | VERT sauf lien désactivé | Tab, Entrée, Espace, aria-pressed, aria-expanded, focus visible OK. |
| Couleurs en dur | VERT | Tokens uniquement. |
| Casse, français, Lucide | VERT avec réserve | Termes anglais entre parenthèses dans des noms de stories. |
| Mouvement réduit | VERT | Transition 0,16 s gardée (niveau 3). |
| `get_errors` Next DevTools | IMPOSSIBLE | Pas de serveur dev ; remplacé par build + 0 erreur console. |

## Écarts

1. **Bloquant** — lien désactivé : `<a aria-label aria-disabled>` sans `href` = rôle générique, `aria-label` interdit (WCAG 4.1.2). Correction : `role="link"` + `aria-disabled="true"` sans `href`, pas de `tabindex`, ne pas exécuter `onClick` si `disabled`. Même défaut dans `ds-export/IconButton.jsx` : à signaler à Claude Design.
2. **Mineur** — retirer les termes anglais entre parenthèses des noms de stories.

## Méthode

Playwright temporaire sur `storybook-static` (port 6123), Chromium local, `@axe-core/playwright` (wcag2a, 2aa, 21a, 21aa, 22aa). Dossier `test-results/` laissé (suppression à faire par le pilote).
