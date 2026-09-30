# QA — page fiche-produit, tour 1 (30/09/2026)

**Verdict : ROUGE.** (Rapport du contrôleur QA, recopié par la session principale.)

## Contrôles
| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check | VERT | |
| Débordement 375 / 768 / 1280 / 1440 | VERT | |
| Fidélité Figma / design system | ROUGE | B1, B2 |
| Ajout au panier | VERT | chargement, MiniCart ouvert avec la ligne, compteur à jour, plafond stock 5 |
| Stepper clavier | VERT | 44×44, blocage à 5 avec message |
| MiniCart | VERT | focus piégé, Échap, retour du focus, clic extérieur |
| axe | ORANGE | 1 `landmark-unique` (moderate) dès 768 px sur la nav des catégories du TopNav (partagé) |
| H1 / next/image priority | VERT | |
| Console | ROUGE | B3 ; favicon 404 toléré ; pas d'erreur d'hydratation |
| Accueil après CartProvider | VERT | |
| test:ui, perf, get_errors | non exécutés | tests/ vide ; perf hors contrôle ; pas de MCP |
| Code React / règles d'or | VERT | |

## Écarts bloquants
- **B1 — « Vous aimerez aussi » (Listings)** : à 1440, 3 cartes dans une grille de 4 colonnes (vide à droite) ; à 768, 3ᵉ carte seule. Pour 3 éléments : 3 colonnes pleine largeur en desktop ; comportement 768 explicite.
- **B2 — image principale** : Figma ≈ 1:1 chaise entière ; code 4:5 très haut (≈ 585 px à 1440), recadré à 768 et 375, éloigne le bouton d'ajout. Ratio proche du Figma, cadrage de la chaise (`ProductDetails.module.scss`).
- **B3 — console** : avertissement next/image « width or height modified » sur l'image principale. `height: auto` ou `fill` dans un conteneur de ratio fixe.

## À valider par le pilote
1. Suggestions de même taille (Figma : une plus large) — dépend de B1.
2. Bouton « Enregistrer dans mes favoris » absent (`onFavorite` non branché).
3. Fil d'Ariane ajouté (couvert par ux-corrections).
4. En-tête différent du Figma (catégories en 2ᵉ ligne, recherche à gauche, pastille panier) — à valider une fois pour toutes les pages.
5. Données : panier de démo « Fauteuil Dandy » vs produit « Chaise Dandy ».
6. Cumul plafonné à 5 en silence dans le panier après ajout : message souhaité ?
