# QA all — boutique-demo (09/10/2026, 7e passe)

**Verdict global : VERT.** R1 et R2 de la 6e passe sont corrigés et vérifiés sur un build préfixé `/boutique-demo` ; O7 et O8 aussi. Aucune régression sur les 10 pages, le portail et la doc.

Environnement : Node 22.12, Windows, Edge (Playwright). Copie propre du dépôt (`%TEMP%\qacopy7`, sans `.next`, sans `tsconfig.tsbuildinfo`), build préfixé `NEXT_PUBLIC_BASE_PATH=/boutique-demo` servi sous `http://localhost:4100/boutique-demo/`. Aucun code du dépôt modifié.

## Vérification des corrections de la 6e passe
| Point | Statut | Preuve |
|---|---|---|
| R1 — aperçus de `/docs/pages/` | VERT | `src/app/docs/pages/page.tsx` : `src={withBase(`${p.href.replace(/\/+$/, "")}/`)}`. L'export contient 10 `<iframe src="/boutique-demo/…/">`. Servi : les 10 documents répondent 200, chacun avec 1 h1 et son titre (Accueil, Tous les produits, Chaise Dandy, Votre panier, Paiement, Mon compte, Mes commandes, Commande N° 10530, Mes informations, Mon magasin) à 1280 et 375 ; 0 réponse >= 400 |
| R1 — historique git | CONFIRMÉ | `git log -S withBase -- src/app/docs` est vide : le correctif de la 5e passe n'avait jamais été commité (la 6e passe l'appelait à tort une régression du code ; elle était une absence de commit). Les modifications actuelles sont dans l'arbre de travail, **non commitées** : à commiter avant livraison |
| R2 — débordement à 375 px | VERT | `docs.scss` l. 35 : `overflow-wrap: anywhere` sur `:not(pre) > code`. Les 37 fiches composants + 8 pages (45) : `scrollWidth - clientWidth = 0` à 375 px |
| R2 — blocs de code intacts | VERT | `pre code` : `white-space: pre`, `overflow-wrap: normal`, `pre` en `overflow-x: auto` (défile sur 375 px) ; tous les `<pre>` qui défilent gardent `tabindex="0"` ; capture `docs-checkout-progress-375.png` |
| O7 — `typecheck` sans `.next` | VERT | script `next typegen && tsc --noEmit` ; `npm run check` complet réussi sur une copie sans `.next` |
| O8 — `docs:check` avec et sans préfixe | VERT | sans préfixe : VERT (44 pages). Build préfixé avec `NEXT_PUBLIC_BASE_PATH=/boutique-demo` : VERT sans option. Build préfixé vérifié sans variable ni `--base` : ROUGE, normal (le script ne peut pas deviner le préfixe) ; avec `--base /boutique-demo` : VERT |

## Contrôles rejoués
| Domaine | Contrôle | Statut | Détail |
|---|---|---|---|
| Build | `npm run check` (copie propre) | VERT | lint 0 erreur (1 avertissement `<img>` connu, `src/app/page.tsx` l. 23), `tsc`, `next build` 60 pages, `docs:check` VERT ; build préfixé aussi |
| Build | Next DevTools MCP | VERT | `get_compilation_issues` vide ; `get_errors` sans réponse (aucun navigateur connecté au serveur de dev), couvert par le build et par 0 erreur JS sur 152 passes |
| Préfixe | export (60 HTML, 3 050 références, 7 CSS) | VERT | 0 lien mort, 0 référence nue (seul le `preconnect href="/"` de Next, inoffensif) ; 55 liens internes distincts de la doc, 0 mort |
| Captures | 10 pages + 2 commandes × 375 / 768 / 1280 / 1440, compte déconnecté puis connecté (76 passes) | VERT | 0 débordement, 1 h1, 1 main, 0 image cassée, cartes de même hauteur |
| Captures | portail et doc (45 pages) à 375 | VERT | 0 débordement, 1 h1 |
| Accessibilité | axe, 76 passes site | VERT | 0 serious / critical ; 1 minor `aria-allowed-role` (AuthForm, connu) |
| Accessibilité | axe, portail et doc (45) | VERT | 0 serious / critical ; `landmark-unique` moderate sur des fiches, inchangé |
| Interactions | panier (tiroir, piège de focus, Échap, ajout 670 €, persistance, paiement), filtres, espace client complet, à 1440 et 375 | VERT | 51 OK sur 55. Les 4 « FAIL » sont une assertion de mon script (la valeur d'un champ n'est pas dans le texte de la page) ; refait à la main : « Vos informations ont été enregistrées. », « Camille Dupont » repris sur l'accueil du compte |
| Mouvement | `prefers-reduced-motion` émulé, même parcours | VERT | mêmes résultats, rien de bloqué |
| Règles du BRIEF | casse, Lucide, couleurs en dur, durées | VERT | inchangé depuis la 6e passe (aucun fichier concerné modifié, sauf `docs.scss` : une propriété ajoutée) |
| Portail | pages et liens | VERT | 10 pages listées, groupe « Compte » complet, 20 liens = 200 |
| Performance | `npm run perf` | NON LANCÉ (non bloquant) | `lighthouserc.cjs` ne vise pas `/compte/commandes/`, `/compte/commandes/10530/`, `/compte/informations/`, `/compte/magasin/` ; `qa/perf.json` de la 5e passe non rejoué |
| Écarts connus | menu du compte à 8 px (768 à 782 px, barre classique) ; 404 de préchargement RSC | ACCEPTÉ | seule source des 404 en console ; 0 erreur JS |

## Points orange restants (non bloquants)
- **Non commité** : les 4 correctifs (`package.json`, `scripts/check-docs.mjs`, `docs.scss`, `docs/pages/page.tsx`) sont dans l'arbre de travail seulement.
- O1 : `tsconfig.json` inclut `.next/dev/types` (peut gêner `npm run check` pendant `next dev`).
- O2 / O4 : tableau de doc ; `tests/` vide (`test:ui` et `shots` remplacés par des scripts Playwright, `playwright.config.ts` vise le port 6006).
- O6 : images accueil (227 Ko) et liste (208 Ko) au-dessus de 200 Ko (mesure de la 5e passe).
- Performance du compte non mesurée (voir ci-dessus).
- Données de démo : compte « Camille Durand » (ou nom saisi) et adresses « Camille Martin » (`src/mocks/account.ts`).
- Le workflow Pages lance `npm run build`, pas `npm run check`.

## Captures de référence
Dossier `qa/captures-passe7/` : `<page>-<largeur>.png` et `co-<page>-<largeur>.png` (compte connecté), plus `portail-*`, `docs-pages-*`, `docs-marque-*`, `docs-button-*`, `docs-checkout-progress-*`. Les captures de la 6e passe restent dans `qa/captures-passe6/`.

## Suite
VERT : le backlog peut être coché par la session principale. Recette : voir les points par page rendus avec ce rapport.

---

# Contrôle après publish étape 1 (09/10/2026)

**Verdict : ROUGE** (1 écart, serious pour axe, sur `/docs/pages/` à 375 et 768 px). Tout le reste est VERT. Le verdict VERT de la 7e passe ci-dessus ne vaut donc plus pour l'état actuel du dépôt tant que cet écart n'est pas corrigé.

Méthode : copie propre sans `.next` (`%TEMP%\qacopy8`), `npm run check` sans préfixe, puis build préfixé `/boutique-demo` servi sous `http://localhost:4100/boutique-demo/`. Aucun code modifié.

## Rouge

### R3 — tableau « Fiches des pages » non focalisable au clavier (axe serious `scrollable-region-focusable`)
- Page : `/docs/pages/`, à 375 px et 768 px (le tableau défile : 874 px de large pour 341 / 734 px visibles). À 1280 et 1440 px il tient, 0 violation.
- Fichier : `src/app/docs/pages/page.tsx`, section « Fiches des pages » : `<div className="doc-table">` n'a ni `tabIndex` ni rôle (relevé : `tabindex`, `role`, `aria-label` nuls). Le composant `src/docs/Markdown.tsx` l. 21 fait déjà le bon modèle pour ses tableaux.
- Correction attendue : `<div className="doc-table" role="region" tabIndex={0} aria-label="Fiches des pages">`. Contrôle : axe 0 serious / critical sur `/docs/pages/` aux 4 largeurs.
- Remarque de lisibilité (orange) : à 375 px, la première colonne laisse des lignes très hautes (~165 px) car les autres colonnes sont à droite (défilement horizontal) ; lisible mais long. Capture : `qa/captures-passe8/docs-pages-table-375.png`.

## Vérifié VERT
| Contrôle | Statut | Détail |
|---|---|---|
| `npm run check` sans préfixe (sans `.next`) | VERT | lint 0 erreur (1 avertissement connu), `typecheck` avec `next typegen`, build 60 pages, `docs:check` VERT (44 pages) |
| `docs:check:pages` sur build préfixé | VERT | 44 pages, 0 lien cassé |
| 45 pages de doc à 375 px | VERT | 0 débordement, 1 h1, 0 réponse >= 400 ; tous les `<pre>` qui défilent gardent `tabindex="0"` |
| R2 par `<wbr />` | VERT | `src/app/docs/composants/[id]/page.tsx` l. 35 : le chemin est coupé en `<span>…<wbr></span>` ; `textContent` et `innerText` = `src/components/blocks/CheckoutProgress/CheckoutProgress.tsx` ; copier-coller (Ctrl+C) donne le même chemin exact, sans caractère ajouté |
| `/docs/pages/` aperçus | VERT | 10 iframes `/boutique-demo/…/`, 10 documents en 200 avec 1 h1 chacun, 0 débordement de page aux 4 largeurs |
| `/docs/pages/` tableau et section « Espace client » | VERT sauf R3 | lisible à 1280 et 1440 (tient sans défilement) ; à 375 et 768 défile dans son cadre |
| Axe, 45 pages de doc | ROUGE | 0 serious / critical sauf R3 ; moderate `landmark-unique` et minor `aria-allowed-role` inchangés |
| Liens de la doc | VERT | 55 liens internes distincts, 0 mort |
| Rejeu rapide du site | VERT | 76 passes (10 pages + 2 commandes, 4 largeurs, compte déconnecté et connecté) : 0 débordement, 0 image cassée, 0 axe serious / critical ; interactions 51 OK sur 55 (les 4 « FAIL » sont l'assertion de mon script déjà expliquée en 7e passe) |

## État laissé
- `out/` du dépôt contient un build **préfixé** `/boutique-demo` (vérifié : `/boutique-demo/_next` dans `accueil/index.html`, iframes préfixées dans `docs/pages/index.html`). Il a été fabriqué dans la copie propre puis copié ; le dépôt n'a pas été reconstruit sur place (`next dev` tourne).
- Captures : `qa/captures-passe8/` (76 captures du site, plus `docs-pages-table-*.png`, `docs-checkout-progress-375.png`).
- Après correction de R3 : relancer ce contrôle ciblé (axe sur `/docs/pages/` aux 4 largeurs) avant de repasser VERT.

---

# Contrôle R3 (09/10/2026)

**Verdict global : VERT.** R3 est corrigé. Les contrôles de la 7e passe et du contrôle après publish étape 1 n'ont plus aucun point rouge. Aucun code modifié.

| Contrôle | Statut | Détail |
|---|---|---|
| Code et `out/` concordent | VERT | `src/app/docs/pages/page.tsx` l. 55 : `<div className="doc-table" role="region" tabIndex={0} aria-label="Fiches des pages">`. `out/docs/pages/index.html` contient `<div class="doc-table" role="region" tabindex="0" aria-label="Fiches des pages">`, 10 `<iframe src="/boutique-demo/…/">` (0 sans préfixe) et des ressources `/boutique-demo/_next/`. Le fichier de `out/` (10:53) est postérieur à la source (10:51) : build préfixé de l'état actuel |
| axe sur `/docs/pages/` à 375, 768, 1280, 1440 | VERT | 0 violation à chacune des 4 largeurs (R3 `scrollable-region-focusable` disparu) |
| Tab atteint le tableau | VERT | focus sur `.doc-table` aux 4 largeurs, anneau visible (contour plein de 2 px) |
| Flèches défilent le tableau | VERT | à 375 et 768 px (le tableau défile) : `ArrowRight` fait avancer `scrollLeft` ; à 1280 et 1440 il tient, rien à défiler |
| Débordement et réponses | VERT | 0 px de débordement de page, 0 réponse >= 400 hors préchargement RSC, aux 4 largeurs |

Captures : `qa/captures-passe9/docs-pages-table-375.png`, `-768.png`, `-1280.png`, `-1440.png`.

Réserves inchangées (orange, non bloquantes) : lignes hautes du tableau à 375 px (défilement horizontal), performance des pages du compte non mesurée, `landmark-unique` moderate sur la doc, éléments non commités à vérifier avant livraison.
