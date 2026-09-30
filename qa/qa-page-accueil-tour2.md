# QA — page accueil, tour 2 (30/09/2026)

**Verdict : VERT** (avertissement perf non bloquant : images 227 Ko > 200 Ko, `performance.bloquant` = false).

## Écarts du tour 1
| Écart | Statut | Preuve |
|---|---|---|
| E1 grille mobile 1 col | CORRIGÉ | 2 colonnes à 375 et 768, 4 à 1280/1440, cartes de même hauteur |
| E2 warning next/image img-17 | CORRIGÉ | console 0 erreur / 0 warning aux 4 largeurs (un 404 ponctuel vu 1 fois à 375, non reproduit : favicon) |
| E3 poids images | PARTIEL | img-17 1600 px, 109 Ko ; total page 227 Ko (seuil 200) : avertissement |

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| lint, tsc, next build | VERT | 51 pages |
| Captures 375/768/1280/1440 | VERT | aucun débordement ; hero ratio conservé (250/432/720/810 px) |
| axe (wcag2a/aa/21aa/22aa + best-practice) | VERT | 0 violation aux 4 largeurs |
| Un H1, un main, lang=fr | VERT | |
| Console | VERT | 0 erreur hors favicon |
| Stories HeroBlocks, Listings, ProductCard, TopNav | VERT | axe 0, pas de débordement |
| Code / règles d'or | VERT | modifications limitées (height auto, mobileColumns) |

## Perf (Lighthouse desktop, out/ sur port 4000, 3 passages, médiane)
score 99 · LCP 869 ms · CLS 0 · TBT 4 ms · JS 284 Ko · images 227 Ko (avertissement)

## À valider par le pilote (inchangé)
Lettre d'information sans photo ; bandeau « Livraison offerte » inventé ; 6 catégories, titre « Notre sélection du moment », bloc histoire ; deux formulaires S'inscrire ; liens # du pied de page.
