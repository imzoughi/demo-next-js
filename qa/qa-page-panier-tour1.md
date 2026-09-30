# QA page panier, tour 1 : ROUGE

Contrôleur indépendant. Cible : /panier/ (dev :3000), largeurs 375 / 768 / 1280 / 1440.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check | VERT | lint, types, build OK (51 pages) |
| Captures 375/768/1280/1440 | VERT | pas de débordement (scrollWidth = largeur), mise en page conforme au Figma v2 (colonnes Produit/Quantité/Total dès 1280, empilé en dessous) |
| Quantités / sous-total / MiniCart | VERT | + sur Fauteuil : 420 € -> 670 €, pastille 3 -> 4, MiniCart « Votre panier (4) », 670 €, lignes identiques |
| Retrait + Toast | VERT | « Fauteuil Dandy retiré / Annuler », role=status ; pause au survol vérifiée (toujours affiché à 8 s, disparaît ~6 s après la sortie) ; sous-total et pastille mis à jour |
| Annuler : position | ROUGE | ligne remise en fin de liste (ordre après annulation : Vase, Fauteuil) |
| Panier vide (EmptyState) | VERT | H2 « Votre panier est vide », CTA « Découvrir la collection » -> /liste-produits/ ; annuler depuis le vide restaure la ligne |
| Liens | VERT | Continuer mes achats -> /liste-produits/ ; Passer la commande -> /paiement/ |
| Axe | ORANGE | 375 : 0 problème. 768/1280/1440 : landmark-unique (moderate) : deux <nav> portant le même nom « Catégories » (en-tête TopNav et pied de page), composants partagés hors panier |
| Clavier | ROUGE | ordre logique, anneau de focus visible partout ; mais après « Retirer » au clavier le focus tombe sur <body> |
| Un seul H1 | VERT | « Votre panier » ; H2 seulement à l'état vide |
| Console | ORANGE | 0 erreur hydratation ; 1 erreur 404 = /favicon.ico (toléré) ; 1 avertissement Next « image img-01.png détectée comme LCP, ajouter loading="eager" » (375 et 1280) |
| Mouvement réduit | VERT | retrait et Toast fonctionnent avec reducedMotion: reduce |
| Code React (Vercel) | VERT | pas de waterfall, imports directs, état dérivé au rendu ; pas d'empilement de booléens |
| Perf / test:ui / get_errors | NON EXÉCUTÉS | perf laissé à la session principale |

## Écarts bloquants
1. Annuler remet la ligne en fin de liste. Correction : conserver l'index d'origine au retrait (dans BasketView, mémoriser { line, index }) et le réinsérer à cet index ; ajouter dans CartProvider une action du type restoreLine(line, index) (ou addLine avec index), sans cumuler la quantité.
2. Focus perdu après retrait (WCAG 2.4.3). Correction : à la fin du retrait, déplacer le focus sur le « Retirer » de la ligne suivante ou précédente, sinon sur le H1 (tabIndex -1) ; après Annuler, sur la ligne restaurée.

## Écarts à corriger ou signaler (non bloquants)
- Avertissement LCP : passer priority / loading="eager" à la première image du panier (CartItem/Image).
- Boutons du Stepper : « Diminuer la quantité » / « Augmenter la quantité » identiques d'une ligne à l'autre ; ajouter le nom de l'article dans le label (composant partagé).
- Retirer deux articles à la suite : le Toast est remplacé, la première annulation est perdue (comportement à valider).

## À faire valider par le pilote
- Les liens des articles pointent vers /produits/fauteuil-dandy et /produits/vase-graystone (mocks catalog.ts) : ces routes n'existent pas (404). À rediriger vers /fiche-produit/ ou à créer.
- Landmark dupliqué « Catégories » (en-tête / pied) : correction à faire dans TopNav ou Footer, hors périmètre panier.
- Langue et contenus (Fauteuil Dandy, € au lieu de £, « Retirer ») s'écartent du Figma v2 anglais : cohérent avec ux-corrections.md, à confirmer.
