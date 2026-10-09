# Blocages et écarts

## Import du design system 1.0.0 (premier import)

- **Storybook et MCP Storybook indisponibles** pendant l'import : le serveur Storybook a été arrêté par le système (mémoire basse). Les commandes `docs-list` (réutilisation) et `test-run` (tests et accessibilité des stories) n'ont pas été exécutées. À rejouer par la boucle composants dès que Storybook tourne : `npm run storybook`, puis `test-run` sur toutes les stories (vérifier surtout les contrastes en thème sombre et les stories Drawer, MiniCart, FiltersSheet).
- **Next DevTools MCP** non utilisé (pas de serveur `npm run dev` lancé) : vérification faite par `npm run build` (prérendu statique de tous les composants sur une page temporaire, supprimée ensuite) et `npm run typecheck`.

## Boucle composants (30/09/2026)

- **Écart à l'export — EmailSignup, thème sombre** : le token `color-feedback-error` sombre (#F2B8B5) n'atteint que 4,38:1 sur `surface-subtle` (#4E4D93). Corrigé localement dans `EmailSignup.module.scss` (mélange de tokens, #F9DCDA, 5,80:1). À corriger dans Claude Design au prochain export, puis retirer la règle locale.

## Boucle pages (30/09/2026)

- ~~**liste-produits — ROUGE après 3 tours**~~ Résolu au tour 4 accordé par le pilote (qa/qa-page-liste-produits-tour4.md) — (qa/qa-page-liste-produits-tour3.md) : dans le panneau « Filtres et tri » mobile, « Tout effacer » fait perdre le focus clavier (BODY) car le bouton se désactive. Correction identifiée dans `FiltersSheet.tsx` (focus replacé dans le panneau, ou `aria-disabled`). Décision du pilote : un tour de plus, ou accepter l'écart.

## Espace client (08/10/2026)

- **Écart accepté par le QA (tour 3, non bloquant)** : entre 768 et ~782 px de fenêtre avec une barre de défilement classique, les onglets du compte débordent de 8 px (barre de défilement horizontale). Cause : marge négative de `.menuWrap` dans `src/app/(site)/compte/_components/compte.module.scss`. Correction possible : `overflow-x: clip` sur `.layout` ou `.page`. Voir `qa/qa-page-compte.md`.
- **Mesure de vitesse non faite pour les 5 pages du compte** : `lighthouserc.cjs` transforme chaque nom de page en adresse `/<nom>/`, or les pages du compte sont sous `/compte/…` (`/compte/commandes/`, `/compte/commandes/10530/`, `/compte/informations/`, `/compte/magasin/`). À adapter avant `npm run perf`. Mesure non bloquante (`performance.bloquant` = false).
