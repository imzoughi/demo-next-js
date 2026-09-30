# QA — page liste-produits, tour 3 (dernier, 30/09/2026)

**Verdict : ROUGE.** (Rapport du contrôleur QA, recopié par la session principale.) Mesures sur out/ servi, Chrome, 600 ms d'attente.

## Focus après « Tout effacer » — barre de filtres (corrigé)
| Largeur | Déclencheur | Focus |
|---|---|---|
| 375 | clic / Entrée | bouton « Filtres » |
| 1440 | clic / Entrée | bouton « Catégorie » |

## Focus après « Tout effacer » — FiltersSheet mobile (375) : ROUGE
Clic et Entrée : focus sur **BODY**, dialogue toujours ouvert.
Cause : `FiltersSheet.tsx` l. 66, `<Button type="ghost" disabled={!nActive} onClick={onClear}>` : le bouton devient désactivé et perd le focus.
Correction attendue : replacer le focus dans le dialogue avant la désactivation (1er fieldset, déjà tabIndex=-1, ou « Voir les N résultats »), ou utiliser `aria-disabled` au lieu de `disabled`. Échap reste correct.

## Non-régression : VERT
Retrait de puce, filtres et tri, npm run check, axe 4 largeurs (0), mise en page, console, stories Filters / FiltersSheet / Listings. Perf non remesurée (tour 2 : 99, LCP 973 ms, images 208 Ko en avertissement).
