# QA — page liste-produits, tour 4 (supplémentaire, 30/09/2026)

**Verdict : VERT.** Mesures sur out/ construit (npm run check) et servi, Chrome, attente 600 ms.

## Focus après « Tout effacer » — FiltersSheet mobile (375)
| Cas | Focus mesuré | Dialogue |
|---|---|---|
| Clic | FIELDSET « Trier par » (tabIndex=-1, dans le dialogue) | ouvert, filtres décochés |
| Entrée | FIELDSET « Trier par » (dans le dialogue) | ouvert |
| Échap (après l'un ou l'autre) | BUTTON « Filtres » | fermé |
Nom accessible du fieldset (arbre d'accessibilité) : rôle group, nom « Trier par » (via legend), état focused. Annonce sensée.

## Non-régression : VERT
| Contrôle | Résultat |
|---|---|
| Barre, Tout effacer 375 clic / Entrée | focus « Filtres » |
| Barre, Tout effacer 1440 clic / Entrée | focus « Catégorie » |
| Retrait de puce 375 / 1440 | Retirer Tables puis « Filtres » (375) / « Catégorie » (1440) |
| Tri (375 panneau, 1440 menu) | ordre modifié (Chaise Dandy → Vase Graystone) |
| Axe 375/768/1280/1440 | 0 violation |
| Mise en page | pas de débordement, cartes de même hauteur |
| Console | propre, sauf 404 favicon.ico (1re requête du navigateur), sans lien avec ce tour |
| npm run check | OK |
| Stories Filters / Listings / FiltersSheet (13, axe, 375 et 1440) | 0 problème |

Remarque mineure : /favicon.ico renvoie 404 (déclarer une icône dans le layout). Perf non remesurée (tour 2 : 99, LCP 973 ms, images 208 Ko en avertissement).
