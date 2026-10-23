# Banc d'essai : comparaison 1.8.2 / Base UI / Tailwind

Même point de départ (commit `be61ca7`), mêmes éléments retirés, même configuration, même modèle de boucle.
Seule la version du plugin change d'un dossier à l'autre.

| Dossier | Branche | Plugin |
| --- | --- | --- |
| bench-ref | bench/ref-1.8.1 | decade-front 1.8.2 (marketplace `decade`) |
| bench-base-ui | bench/base-ui | decade-front 1.9.0-beta (marketplace `decade-beta`), option Base UI |
| bench-tailwind | bench/tailwind | decade-front 1.9.0-beta (marketplace `decade-beta`), options Tailwind + Base UI |

## Éléments retirés (implémentation et styles vidés, props et stories conservées)
| Élément | Type | Pourquoi dans le banc |
| --- | --- | --- |
| Button | composant simple | témoin : peu de comportement, beaucoup de styles |
| CartItem | composant | témoin : contraste et structure de liste (rouge en tour 1 sur Avion) |
| Drawer | composant interactif | focus piégé, Échap, retour du focus |
| FiltersSheet | composant interactif | focus perdu après « Tout effacer » (4 tours sur Avion) |
| AuthForm | composant interactif | onglets sans navigation aux flèches (écart Avion) |
| liste-produits | page | assemblage, captures, performance |

Les stories de chaque composant restent en place : elles servent de cahier des charges et de tests, identiques pour les trois dossiers.

## Déroulé (identique dans chaque dossier)
1. `npm ci`
2. Dans un 2e terminal : `npm run storybook` ; dans un 3e : `npm run dev`.
3. `npm run test:stories -- -g "Badge"` : doit passer (vérifie que Storybook et les tests de stories marchent).
4. `./scripts/loop.ps1 composants` (Button, CartItem, Drawer, FiltersSheet, AuthForm, dans cet ordre)
5. `./scripts/loop.ps1 pages` (liste-produits)
6. `/decade-front:qa all`
7. Prévenir Claude : il relève les mesures ci-dessous.

Début des mesures : entrées de `workflow/logs/` postérieures au 2026-10-14T13:56:12Z (dernière entrée avant le banc).

## Mesures
| Mesure | Source | bench-ref (1.8.2) | bench-base-ui | bench-tailwind |
| --- | --- | --- | --- | --- |
| Tours de QA, composants (total / max) | `qa/qa-*-tour*.md` | | | |
| Tours de QA, page | `qa/qa-page-liste-produits-tour*.md` | | | |
| Éléments VERTS / 6 | `workflow/backlog.md` | | | |
| Tokens (sortie, et cache écrit) | `workflow/logs/tokens.jsonl` | | | |
| Durée active des agents | `workflow/logs/agents.jsonl` | | | |
| Lighthouse liste-produits (score, LCP, CLS) | `qa/perf.json` | | | |
| Problèmes d'accessibilité sérieux | rapport `/qa all` | | | |
| Clavier : focus piégé, Échap, retour, flèches dans les onglets | rapport `/qa all` | | | |
| Écarts au Figma | rapport `/qa all` | | | |

Premier essai du 22/10 annulé : il a révélé les défauts corrigés en 1.8.2 (commandes refusées en boucle, VERT sans test). Mesures reprises avec la 1.8.2.

Un seul passage par dossier : un écart de moins de 20 à 30 % entre deux colonnes n'est pas significatif.
