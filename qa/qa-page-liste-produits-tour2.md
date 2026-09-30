# QA — page liste-produits, tour 2 (30/09/2026)

**Verdict : ROUGE** (une seule correction, petite : focus après « Tout effacer »).

## Écarts du tour 1
| Écart | Statut | Preuve |
|---|---|---|
| 1 image LCP sans priorité | CORRIGÉ | `<link rel=preload as=image img-20.jpg>` dans le HTML ; LCP 973 ms |
| 2 espace compteur→grille | CORRIGÉ | 40 px aux 4 largeurs |
| 3 landmark-unique | CORRIGÉ | nav .cats « Catégories de la boutique » ; axe 0 violation aux 4 largeurs |
| 4 focus après retrait de puce | CORRIGÉ pour la puce | 375 et 1440 : focus sur la puce suivante, puis sur le bouton « Filtres » (375) / « Catégorie » (1440) après la dernière |
| 4 bis « Tout effacer » (annoncé corrigé) | NON CORRIGÉ | après Entrée ou clic sur « Tout effacer », `document.activeElement` = BODY à 375 et 1440 (`Filters.tsx` : `onClear` ne pose pas `refocus`) |

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| lint, tsc, next build | VERT | |
| Captures | VERT | 2 col à 375/768, 4 à 1280/1440, hauteurs égales, aucun débordement |
| axe | VERT | 0 aux 4 largeurs |
| Un H1 | VERT | |
| Console | VERT | 0 erreur/warning |
| Stories Filters, FiltersSheet, Listings (Three/FilterListSpacing), ProductCard (Priority), TopNav | VERT | axe 0, pas de débordement |
| Code / règles d'or | VERT | |

## Correction attendue
`src/components/blocks/Filters/Filters.tsx` : au clic sur « Tout effacer », replacer le focus sur le premier bouton de groupe visible (ou sur le compteur `role=status` avec tabIndex -1), par exemple en armant `refocus` avec un index -1 et en gérant ce cas dans l'effet (qui aujourd'hui sort si `chips.length` = 0 seulement après le test de la puce). Vérifier à 375 et 1440.

## Perf (médiane de 3)
score 99 · LCP 973 ms · CLS 0,001 · TBT 6 ms · JS 288 Ko · images 208 Ko (avertissement, seuil 200)

## À valider par le pilote (inchangé)
Filtres Catégorie + Matière seulement ; « Voir la collection » retiré ; visuels réutilisés ; section « Join the club » du Figma desktop absente ; mobile : boutons « Filtres » / « Tri » ; « 0 produit » au singulier ; en-tête différent du Figma.
