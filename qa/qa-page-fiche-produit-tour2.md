# QA — page fiche-produit, tour 2 (30/09/2026)

**Verdict : VERT.**

## Écarts du tour 1
| Écart | Statut | Preuve |
|---|---|---|
| B1 « Vous aimerez aussi » | CORRIGÉ | 3 cartes sur 3 colonnes dès 768, pleine largeur, 1 colonne à 375 ; plus de vide à droite |
| B2 image principale | CORRIGÉ | 1:1, chaise entière (375 / 328 / 512 / 592 px), bouton d'ajout remonté. Réserve : photo portrait en contain, d'où des bandes blanches latérales (le Figma est en pleine largeur) |
| B3 warning next/image | CORRIGÉ | console 0 erreur / 0 warning aux 4 largeurs |
| landmark-unique (TopNav) | CORRIGÉ | axe 0 violation aux 4 largeurs |

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| lint, tsc, next build | VERT | |
| Débordement 4 largeurs | VERT | |
| Un H1, image LCP en preload | VERT | |
| Stories ProductDetails, Listings, ProductCard, TopNav | VERT | axe 0 |
| Code / règles d'or | VERT | |

## Perf (médiane de 3)
score 99 · LCP 820 ms · CLS 0 · TBT 5 ms · JS 286 Ko · images 42 Ko

## À valider par le pilote (inchangé)
Favoris absent ; fil d'Ariane ajouté ; en-tête différent du Figma ; produit Chaise vs Fauteuil dans le panier de démo ; plafond 5 silencieux ; bandes blanches de l'image (réserve B2).
