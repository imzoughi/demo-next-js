# QA — page liste-produits, tour 1 (30/09/2026)

**Verdict : ROUGE (provisoire).** Aucun défaut fonctionnel ; next build non vérifié (verrou d'un autre build) ; 4 corrections légères. (Rapport du contrôleur QA, recopié par la session principale.)

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| npm run check | NON CONCLUANT | lint + tsc OK ; next build bloqué par un autre build en cours |
| Captures 375 / 768 / 1280 / 1440 | VERT | 4 / 4 / 2 / 2 colonnes, pas de débordement, hauteurs égales |
| Fidélité Figma / DS | VERT avec réserves | |
| Filtres (OU / ET), puces, Tout effacer, compteur, tri, état vide | VERT | |
| FiltersSheet mobile | VERT | dialog modal, focus piégé, Échap, retour du focus, « Voir les N résultats » |
| Mouvement réduit | VERT | |
| axe | VERT avec réserve | `landmark-unique` (moyen) sur TopNav .cats dès 768 |
| Clavier, H1 | VERT | |
| Console | VERT avec réserve | 404 ponctuel non reproduit ; warning LCP (écart 1) |
| get_errors, perf | non faits | pas de MCP ; build bloqué |
| Code React, règles d'or | VERT | |

## Écarts à corriger
1. Image LCP (1ʳᵉ carte, img-20.jpg) sans priorité : prop de priorité sur la 1ʳᵉ image de la grille (ProductCard / Listings).
2. Espace compteur → grille trop grand (88 px à 375, 120 px à 1280) : ramener à 32–48 px (Filters ou Listings).
3. `landmark-unique` : `aria-label` distinct (« Catégories ») sur le nav .cats de TopNav.
4. Focus perdu (body) après retrait d'une puce : replacer sur la puce suivante ou le bouton du groupe.

## À valider par le pilote
- Filtres Catégorie + Matière seulement ; « Voir la collection » retiré ; 3 visuels réutilisés ; cartes sans identifiant (annoncés).
- **Non annoncé** : section « Join the club » (visuel + inscription) du Figma desktop absente.
- Mobile : boutons compacts « Filtres » / « Tri » et panneau unique « Filtres et tri » au lieu des bandeaux gris du Figma.
- « 0 produit » au singulier.
