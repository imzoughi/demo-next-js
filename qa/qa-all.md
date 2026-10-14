# QA all — boutique-demo (14/10/2026, 8e passe, tour 2)

**Verdict global : VERT.** C1 (contraste Storybook), P1 (CLS du compte) et P2 (`lighthouserc.cjs`) sont corrigés et revérifiés de façon indépendante. Aucune régression. Restent des avertissements de performance non bloquants (`performance.bloquant` = false) : images accueil 227 Ko et liste-produits 208 Ko (seuil 200), JS de `/compte/magasin` 302 Ko (seuil 300 ; P3 non fait, accepté).

Environnement : Node 22.12, Windows, Chromium (Playwright). Site `out/` et `storybook-static` reconstruits, servis par un serveur Node de mon script. Aucun code modifié (seul `qa/perf.json` est mis à jour, à la demande). Serveurs arrêtés (ports 4000, 4100, 6007 libres). Captures : `qa/captures-passe12/` (88 captures, pages × largeurs × thèmes).

## Vérification des corrections
| Point | Statut | Preuve |
|---|---|---|
| C1 — contraste du lien Leaflet en sombre (Storybook) | VERT | story StoreFinder `Page` en sombre : fond de l'attribution `rgb(42, 37, 75)` (token) au lieu de `rgba(255,255,255,0.8)`, 0 violation axe à 300 ms, 1,5 s et 5 s. Les 18 stories `compte-store*` × 2 thèmes rejouées 4 fois sous charge (4 workers, attente 400 ms) : 0 échec (avant : 2 à 5 échecs par passage). Dont StoreFinder `Page` / `ShowOnMap` et StoreMap `SingleResult` / `AllStores` |
| P1 — CLS du compte | VERT | mesuré dans le navigateur (observateur de décalages) sur les 5 pages du compte, connecté et déconnecté, 375 et 1280 : 0,0002 à 0,0004 ; un seul pic isolé à 0,0154 (`/compte/commandes/` connecté, 1280, pied de page), très sous 0,1. Lighthouse : 0,0004 sur les 5 pages (avant : 0,172). Parcours connexion puis Commandes, Informations, Magasin : CLS total 0,0004, aucun saut |
| P2 — `lighthouserc.cjs` | VERT | `npm run perf` mesure bien les 10 pages (`/accueil/` … `/compte/commandes/10530/`, `/compte/informations/`, `/compte/magasin/`), 3 passages chacune |
| P3 — JS de `/compte/magasin` | NON FAIT, accepté | 302 Ko (309 561 octets) pour 300 Ko : avertissement non bloquant |

## Contrôles globaux (tour 2)
| Contrôle | Statut | Détail |
|---|---|---|
| `npm run check` | VERT | lint 0 erreur (1 avertissement `<img>` accepté), types, build, `docs:check` VERT |
| Storybook (build + 197 stories × 2 thèmes = 394 ouvertures) | VERT | 0 échec : rendu, play functions et axe (sérieux et critique) |
| Pages × 4 largeurs × 2 thèmes (88 passes, dont les 5 du compte, connecté, et le compte déconnecté) | VERT | 0 erreur JS, 0 requête en erreur (hors prélecture RSC du serveur statique), 1 h1, 0 image cassée, 0 débordement, 0 majuscule de style, 0 problème axe sérieux ou critique. Non-régression des 5 autres pages : identique à la passe 1 |
| Interactions (script ad hoc, `tests/` toujours vide) | VERT | 26 vérifications OK (mouvement normal et réduit) |
| Mouvement réduit, code React, règles du BRIEF | VERT | inchangés depuis le tour 1 |
| Écart connu : onglets du compte à 768–782 px | ACCEPTÉ | inchangé (8 px avec barre de défilement classique), mesuré au tour 1 |
| Documentation | VERT | `docs:check` VERT dans `npm run check` ; rendu contrôlé au tour 1, sans changement |

## Performance (`npm run perf`, médiane de 3, reportée dans `qa/perf.json`)
| Page | Score | LCP (ms) | CLS | TBT (ms) | JS (Ko) | Images (Ko) | Statut |
|---|---|---|---|---|---|---|---|
| accueil | 99 | 915 | 0,0004 | 4 | 291 | 227 | avertissement images |
| liste-produits | 99 | 892 | 0,0006 | 3 | 295 | 208 | avertissement images |
| fiche-produit | 99 | 861 | 0,0005 | 4 | 293 | 42 | OK |
| panier | 99 | 819 | 0,0009 | 0 | 294 | 27 | OK |
| paiement | 99 | 853 | 0,0005 | 0 | 296 | 0 | OK |
| compte | 99 | 885 | 0,0004 | 7 | 298 | 0 | OK |
| compte-commandes | 99 | 888 | 0,0004 | 1 | 298 | 0 | OK |
| compte-commande | 99 | 882 | 0,0004 | 0 | 298 | 0 | OK |
| compte-informations | 99 | 870 | 0,0004 | 4 | 300 (299,9) | 0 | OK, à la limite |
| compte-magasin | 99 | 916 | 0,0004 | 19 | 302 | 0 | avertissement JS (+2 Ko) |

Les poids sont les octets transférés (Lighthouse) ; les valeurs de `perf.json` des 6 premières pages sont légèrement plus hautes que celles d'avant (ex. accueil 288 → 291 Ko) : effet du layout du compte et de la mesure.

## Reste (non bloquant)
1. Images accueil et liste-produits au-dessus de 200 Ko ; JS compte-magasin 302 Ko et compte-informations 300 Ko (budget 300).
2. `tests/` vide : `npm run test:ui` et `npm run shots` ne testent rien (config Playwright pointée sur Storybook `:6006`).
3. Les composants du compte n'ont pas de fiche dans `/docs/composants/`.
4. Tuiles de carte chargées depuis `tile.openstreetmap.org`.
5. Écart accepté : débordement de 8 px des onglets du compte entre 768 et 782 px (`overflow-x: clip` possible).
6. EmailSignup sombre : correctif local à retirer après le prochain export de Claude Design.

## Captures de référence (`qa/captures-passe12/`)
Nom : `<page>-<light|dark>-<largeur>.png` ; `compte-out-*` = compte déconnecté.

---
# Historique : tour 1 (même journée)
**Verdict du tour 1 : ROUGE** (1 correction obligatoire, limitée à Storybook : contraste du bloc « Leaflet · OpenStreetMap » en thème sombre dans 4 stories du compte). Les 10 pages, le portail et la documentation sont VERTS. Reste en avertissement non bloquant : décalage de mise en page (CLS) sur les 5 pages du compte et poids JS de `/compte/magasin` à 302 Ko pour 300 Ko.

Environnement : Node 22.12, Windows, Chromium (Playwright). Site construit (`npm run check`, sans basePath), `out/` servi en statique ; Storybook construit (`build-storybook`) et servi par un petit serveur Node de mon script. Session du compte simulée par `sessionStorage` (Issam MZOUGHI). Aucun fichier du code modifié ; tous les serveurs lancés sont arrêtés (ports 4100 et 6007 libres). Captures : `qa/captures-passe11/` (110 fichiers).

## Contrôles globaux
| Contrôle | Statut | Détail |
|---|---|---|
| `npm run check` (lint, types, build, docs) | VERT | 0 erreur ; 1 avertissement lint (`<img>` au lieu de `next/image`, accepté : export statique, images non optimisées) ; 60 pages prérendues ; `docs:check` : 44 pages, VERT |
| Documentation (`docs:check`, rendu) | VERT | `/`, `/docs`, composants (Button), marque, pages, performance, tokens, versions, architecture à 375 et 1280 : 1 h1, 0 débordement, kit `doc-shell` présent, pas de Markdown brut, 0 axe sérieux. Captures `qa/captures-passe11/doc_*` |
| Pages × 4 largeurs × 2 thèmes (88 passes) | VERT | 375, 768, 1280, 1440 ; clair et `data-theme="dark"` : 0 erreur JS, 0 requête en erreur (hors prélecture RSC, voir note), 1 h1, 0 image cassée, 0 débordement horizontal (hors écart accepté), 0 texte en capitales |
| Accessibilité (axe wcag2a/2aa/21aa + best-practice) | VERT | 0 problème sérieux ou critique sur les 88 passes des pages |
| Mouvement (reduced motion émulé, 88 passes) | VERT | aucune animation > 1 ms ; restent des changements de couleur de 160 ms (niveau 3) |
| Interactions (`npm run test:ui` : dossier `tests/` vide, 0 test) | VERT par script ad hoc | 26 vérifications OK en mouvement normal et réduit : mini-panier (ouverture, focus dans la couche, Échap), connexion (erreurs, succès), recherche de magasin, favori + toast, bulle de carte, état vide, validation des informations, couche Filtres mobile. `npm run test:ui` ne teste rien aujourd'hui |
| Storybook (build + 197 stories × 2 thèmes = 394 ouvertures) | ROUGE | build OK ; 0 erreur de rendu, 0 exception de play (53 occurrences de `play:`), 0 erreur de page ; axe `color-contrast` en sombre sur 4 stories (voir C1) |
| Performance (`lhci`, 3 passages, médiane) | AVERTISSEMENTS | voir plus bas |
| Erreurs Next.js (`get_errors`) | NON JOUÉ | pas de serveur `next dev` : équivalent par build (0 erreur) et 0 erreur d'hydratation en console sur les 88 passes |
| Code React / Next (CRITICAL et HIGH) | VERT | Leaflet en import dynamique dans un effet (pas d'accès `window` au rendu) ; session par `useSyncExternalStore` ; horloge `useMinuteClock` sans écart d'hydratation ; pas de cascade de requêtes ; pas d'empilement de booléens (`fullWidth="mobile"` est une valeur). Mineur : commentaire en double au-dessus de `SERVICE_ICONS` dans `StoreFinder.tsx` |
| Règles du BRIEF | VERT | casse de phrase (aucun `text-transform` dans le site), icônes Lucide, aucun hexadécimal ni `rgb()` dans composants et pages (seuls ceux du kit portail `docs/` et un commentaire) ; mouvement sobre, règles `prefers-reduced-motion` présentes |

Note de mesure : le serveur statique `serve` répond 404 aux fichiers de prélecture `__next.!…txt` (Next retombe sur la navigation normale ; déjà ignoré aux passes précédentes).

## Tableau par page
Lien local : `npm run start` sert `out/` sur `http://localhost:4000` (ou `npm run dev` sur `:3000`). Statut : 375 / 768 / 1280 / 1440, clair et sombre.

| Page | Lien local | Visuel + a11y (8 passes) | Interactions | Perf (score / LCP / CLS / TBT / JS Ko / images Ko) | Statut |
|---|---|---|---|---|---|
| accueil | /accueil/ | VERT | menu, bandeau, lettre OK | 99 / 945 ms / 0,0004 / 4 / 291 / **227 (>200)** | VERT (perf : images) |
| liste-produits | /liste-produits/ | VERT | couche Filtres mobile, Échap OK | 99 / 965 / 0,0006 / 5 / 295 / **208 (>200)** | VERT (perf : images) |
| fiche-produit | /fiche-produit/ | VERT | ajout, mini-panier, focus, Échap OK | 99 / 815 / 0,0005 / 0 / 293 / 42 | VERT |
| panier | /panier/ | VERT | OK | 99 / 871 / 0,0009 / 9 / 294 / 27 | VERT |
| paiement | /paiement/ | VERT | OK | 99 / 855 / 0,0005 / 11 / 296 / 0 | VERT |
| compte | /compte/ | VERT (déconnecté et connecté) | connexion, erreurs OK | 91 / 885 / **0,172** / 14 / 298 / 0 | VERT (perf : CLS) |
| compte-commandes | /compte/commandes/ | VERT | OK | 91 / 849 / **0,172** / 3 / 298 / 0 | VERT (perf : CLS) |
| compte-commande | /compte/commandes/10530/ | VERT | OK | 91 / 919 / **0,172** / 5 / 298 / 0 | VERT (perf : CLS) |
| compte-informations | /compte/informations/ | VERT, écart accepté à 768 | validation OK | 91 / 859 / **0,172** / 5 / **300** / 0 | VERT (perf : CLS, JS limite) |
| compte-magasin | /compte/magasin/ | VERT | recherche, favori, carte, bulle OK | 91 / 934 / **0,172** / 1 / **302 (>300)** / 0 | VERT (perf : CLS, JS) |

## Performance
- `npm run perf` ne mesure que 6 pages (`accueil` à `compte`) : pour `compte-commandes`, `compte-commande`, `compte-informations`, `compte-magasin`, `lighthouserc.cjs` fabrique `/<nom>/` (404). Je n'ai pas lancé `npm run perf` tel quel (pour ne pas polluer `qa/lighthouse/`) ; j'ai lancé `lhci autorun` avec la même configuration (preset desktop, 3 passages, mêmes seuils) et les 10 vraies adresses, rapports bruts hors dépôt. Les 10 pages sont mesurées. À reporter dans `qa/perf.json` par la session principale (les 4 lignes `compte-*` sont nouvelles ; JS et images en Ko transférés, médianes).
- **CLS 0,172 identique sur les 5 pages du compte** (seuil 0,1) : le décalage est celui du `<footer>` (0,1716). Cause probable : la zone principale du compte est courte tant que la session n'est pas lue (`ready = false`), puis grandit. Correction : réserver la hauteur (min-height) ou un squelette pendant `ready = false`, dans `src/app/(site)/compte/layout.tsx` ou `AccountProvider`.
- **JS de `/compte/magasin`** : 302 Ko (Lighthouse : 309 541 octets) contre 300 Ko. Leaflet (import dynamique) ajoute environ 4 Ko aux 298 Ko des autres pages du compte, déjà plus lourdes que le reste du site (291 à 296 Ko). Non bloquant (`performance.bloquant` = false). Pistes : charger Leaflet à l'entrée dans la vue (`IntersectionObserver`) ou à la première interaction, alléger le layout du compte.
- Images accueil 227 Ko et liste-produits 208 Ko (seuil 200) : avertissement identique à la passe précédente.

## Blocages connus revérifiés
| Blocage | Résultat |
|---|---|
| Test des stories jamais fait sur l'ensemble | Fait : 197 stories × 2 thèmes. 1 problème (C1). Les stories Drawer, MiniCart, FiltersSheet, EmailSignup passent en clair et en sombre |
| Correctif local EmailSignup sombre | Toujours en place (`EmailSignup.module.scss`) et nécessaire ; la story EmailSignup sombre passe axe. À retirer quand Claude Design aura corrigé `color-feedback-error` |
| Débordement 8 px des onglets du compte entre 768 et 782 px | Confirmé avec barre de défilement classique : à 768, 775 et 782 px, contenu 8 px au-delà de la fenêtre (`/compte/informations/`) ; disparaît à 790 px. Écart accepté, inchangé. Correction possible : `overflow-x: clip` sur `.layout` ou `.page` dans `compte.module.scss` |
| Perf non mesurée sur les pages du compte | Mesurée ici ; reste à corriger `lighthouserc.cjs` (liste d'adresses réelle, ou `performance.urls`) pour que `npm run perf` les couvre |

## À corriger (ROUGE)
**C1 — Storybook, StoreFinder / StoreMap, thème sombre (obligatoire)**
- Stories touchées (intermittent, selon le chargement des tuiles) : `Sections de page/Compte/StoreFinder` (`Page`, `ShowOnMap`) et `Sections de page/Compte/StoreMap` (`SingleResult`, parfois `Default`).
- Constat : le lien d'attribution Leaflet a une couleur claire (#ebe8f4) sur le fond par défaut de Leaflet `rgba(255,255,255,0.8)` : contraste 1,13:1 (axe `color-contrast`, `a[href$="leafletjs.com"]`). Dans Storybook, la règle `.map :global(.leaflet-control-attribution) { background: var(--color-surface-default) }` (`store-finder.module.scss`, ligne 83) ne l'emporte pas sur `leaflet.css` : même spécificité, l'ordre des feuilles décide. Sur le site construit le fond est bien `rgb(42, 37, 75)` (vérifié en sombre à 1280 px) : pas d'écart visible sur les pages, mais le résultat dépend de l'ordre de chargement.
- Correction attendue : augmenter la spécificité (par ex. `.map:global(.leaflet-container) :global(.leaflet-control-attribution)` pour fond, couleur et lien), puis rejouer `test-run` sur ces 4 stories en sombre.
- Boucle à relancer : composants (StoreMap), puis page `compte-magasin`.

**Non bloquants (ne changent pas le verdict)**
1. CLS 0,172 sur `compte`, `compte-commandes`, `compte-commande`, `compte-informations`, `compte-magasin`.
2. JS 302 Ko sur `compte-magasin` et 300 Ko sur `compte-informations`.
3. `lighthouserc.cjs` : couvrir les 4 adresses `/compte/...`.
4. `tests/` est vide : `npm run test:ui` et `npm run shots` ne testent rien (la config Playwright pointe sur Storybook `:6006`) ; versionner les scénarios d'interaction ci-dessus comme tests permanents.
5. Commentaire en double dans `StoreFinder.tsx` au-dessus de `SERVICE_ICONS`.
6. Portail : `.portal__kicker` en `text-transform: uppercase` (kit `decade-portail`, hors site).
7. Les composants du compte (AddressesForm, StoreFinder, StoreMap, StoreStatus) ont des stories mais pas de fiche dans `/docs/composants/` : à décider avec le pilote.
8. Tuiles de carte chargées depuis `tile.openstreetmap.org` (appel externe) : à confirmer pour la démo.

## Captures de référence (`qa/captures-passe11/`)
Nom : `<page>-<light|dark>-<largeur>.png` ; `compte-out-*` = compte déconnecté ; `doc_*` = documentation ; `story-storefinder-page-dark.png` et `magasin-carte-dark-1280.png` = preuves de C1.
