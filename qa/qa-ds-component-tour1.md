# QA boucle /ds-component, tour 1 (projet boutique-demo, stack nextjs)

Contrôleur QA indépendant. Aucun code modifié, backlog non coché. Date : 2026-09-30.

## Verdict global : ROUGE

6 composants VERTS, 2 ROUGES (CartItem, EmailSignup). MiniCart et ShoppingBasket dépendent de CartItem : leurs stories et leur rendu sont conformes (VERT), leur cible 44 px est corrigée par CartItem.

## Contrôles exécutés

| Contrôle | Statut | Détail |
| --- | --- | --- |
| `npm run check` | VERT sur le code | Lint, typecheck et build passent sur `src/` et `.storybook/` (`npx eslint src .storybook` propre). Un relancement tardif de `npm run check` a échoué à cause de fichiers temporaires d'une autre session, `tmp-qa/serve.cjs` (et plus tôt `tests/qa-ib.spec.cjs`), non liés au code : `require()` interdit par ESLint. Ces fichiers sont à supprimer par le pilote ou leur auteur, sinon `npm run check` reste rouge. |
| `npm run build-storybook` | VERT | Build réussi. 181 entrées (stories et docs). Storybook dev sur :6006 non utilisé : contrôles faits sur une copie de `storybook-static` servie ponctuellement. |
| Rendu à 375 / 768 / 1280 / 1440 des 8 composants (50 stories) | VERT | 0 erreur JS, 0 débordement horizontal, aucune cible sous 44 px (375 et 1280). CartItem : nom 131 px de large, description 215 à 224 px, plus de colonne écrasée à 768, 1280 et 1440 (correction du décorateur confirmée visuellement). Footer et EmailSignup : états erreur, chargement, échec lisibles à 375. |
| axe WCAG A/AA, thème clair | ROUGE | 49 stories sur 50 sans problème. Échec : CartItem `Tiroir` (voir CartItem). |
| axe, thème sombre | ROUGE | Mêmes constats, plus EmailSignup `Erreur` et `Échec serveur` : contraste 4,38:1 (minimum 4,5:1). |
| Cibles 44 px | VERT | Lien du nom CartItem : 44 px de haut (page et tiroir). Seul TextLink `inline` reste sous 44 px : exemption du design system. |
| Clavier | VERT | CartItem : Tab dans l'ordre nom, Retirer, Diminuer, Augmenter, anneau de focus visible. MiniCart et ShoppingBasket idem. Radio : un seul arrêt Tab par groupe. EmailSignup : champ puis bouton. Footer, IconButton : focus visible partout. Les stories avec `play` valident leurs textes (Erreur, Succès, Échec serveur). |
| Mouvement réduit | VERT | Seules les stories de chargement (EmailSignup, Footer) ont une animation de plus de 200 ms : pulsation bornée, comme au contrôle précédent (rotation retirée). |
| Non-régression des 29 autres composants (131 stories) | VERT | Le changement du décorateur global n'a rien cassé : clair et sombre à 375 et 1280, clair à 768 et 1440. 0 erreur JS, 0 débordement, 0 problème axe. Seule alerte : TextLink `Inline` 22 px (exempté). |
| Stories en français, casse de phrase | VERT pour les 8 | Noms passés en français. |
| Couleurs en dur, règles d'or | VERT | Rien de nouveau hors tokens dans les fichiers vus. |
| `get_errors` Next DevTools | IMPOSSIBLE | Pas de serveur ni de MCP dans cette session. Remplacé par : build OK, 0 erreur console sur les stories. |
| `npm run test:ui`, `shots`, `perf` | Non applicable | `tests/` vide. Perf jamais dans la boucle composants. |

## Verdict par composant

| Composant | Verdict | Détail |
| --- | --- | --- |
| Badge | VERT | Story `Inverse` sur fond inverse, axe clair et sombre OK. |
| IconButton | VERT | Stories `Taille sm (16 px)`, `Taille md (20 px)`, `Taille lg (24 px)` présentes, plus `Pressé`, `Ouvert`, inverse. Je ne peux pas dire si elles existaient déjà lors du contrôle précédent : le dépôt n'a aucun commit (tout est non suivi). Elles sont là et rendent bien, cibles 44 px OK. |
| Radio | VERT | Story `Erreur` avec message, axe clair et sombre OK. |
| Footer | VERT | Stories Par défaut, Copyright personnalisé, Inscription : erreur / chargement / succès / échec serveur, avec `play`. Axe clair et sombre OK. |
| MiniCart | VERT | Lien du nom à 44 px. Clavier et axe OK. |
| ShoppingBasket | VERT | Lien du nom à 44 px. Clavier et axe OK. |
| CartItem | ROUGE | Voir 1. |
| EmailSignup | ROUGE | Voir 2. |

## Ce qui reste rouge

### 1. CartItem : story `Tiroir` invalide pour axe (clair et sombre, 375 et 1280)
Erreurs `list` (« List element has direct children that are not allowed: div ») et `listitem` (« List item does not have a ul parent »), gravité sérieuse. Cause : dans `CartItem.stories.tsx`, le décorateur propre à `Tiroir` met un `<div style={{ maxWidth: 'var(--size-drawer)' }}>` entre le `<ul>` du décorateur global de la story et le `<li>` de CartItem. Or `a11y.test` vaut `error` dans `.storybook/preview.ts` : la story échouerait au test-runner.
Correction attendue : ne pas intercaler de `div` entre `ul` et `li`. Soit appliquer `maxWidth: 'var(--size-drawer)'` au `<ul>` du décorateur de `Tiroir` (décorateur qui remplace le global, ou paramètre `parameters` / `args`), soit placer le `div` borné autour du `<ul>`. Les autres stories CartItem sont propres.

### 2. EmailSignup : contraste insuffisant en thème sombre, stories `Erreur` et `Échec serveur`
Message d'erreur `#F2B8B5` sur fond `#4E4D93` : 4,38:1 (minimum 4,5:1), 12 px, à 375 et 1280. Le thème sombre est dérivé, le jeton `--color-feedback-error` y vaut `#F2B8B5`. Footer n'est pas touché (fond plus sombre).
Correction attendue : soit éclaircir le message d'erreur d'EmailSignup en thème sombre sur ce fond (jeton sombre de texte d'erreur plus clair, ou jeton `--color-feedback-error-inverse` adapté), soit assombrir le fond de la variante claire en thème sombre. Repasser axe sombre sur `Erreur` et `Échec serveur`. Si le pilote accepte l'écart, il doit le valider par écrit.

## Avertissements (non bloquants)
1. Fichiers temporaires hors périmètre (`tmp-qa/`, et plus tôt `.qa-tmp/`, `tests/qa-ib.spec.cjs`) : ils font échouer `npm run check`. À supprimer avant la fin de la boucle.
2. Noms de stories encore en anglais pour les 29 autres composants (`Not Dismissible`, `Long Name`...) : hors de ce tour.
3. Le build de `storybook-static` a été relancé par une autre session pendant mon contrôle : j'ai figé une copie (14:23) pour tous mes rendus.

## Méthode
Playwright + axe sur une copie de `storybook-static/`, Chromium local, scripts hors dépôt (dossier de travail de session). Rendus : 8 composants (50 stories) en clair à 375/768/1280/1440, en sombre à 375/768/1280/1440 ; 29 autres composants (131 stories) en clair et sombre à 375/1280 et clair à 768/1440 ; captures inspectées pour CartItem et Footer.
