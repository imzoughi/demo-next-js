# Livraison — Boutique démo (espace client)

**Date** : 9 octobre 2026
**Version du package** : 1.0.0 · **Design system** : 1.0.0 (inchangé, 30 septembre 2026)
**Livraison précédente** : 6 octobre 2026 (6 pages, sans espace client)

## Lien public

- **Site** : https://imzoughi.github.io/demo-next-js/
- **Documentation** : https://imzoughi.github.io/demo-next-js/docs/

Le site est servi sous le nom du dépôt (`demo-next-js`), pas sous `/boutique-demo/`. Vérifié de deux façons :
- `.github/workflows/pages.yml` construit avec `NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}`, soit `/demo-next-js` ; `next.config.ts` lit cette variable.
- Contrôle en ligne (9 octobre) : `https://imzoughi.github.io/demo-next-js/`, `/accueil/` et `/docs/pages/` répondent 200 ; `https://imzoughi.github.io/boutique-demo/` répond 404.

**État de la mise en ligne** : le site publié ne contient pas encore l'espace client. `/compte/commandes/`, `/compte/commandes/10530/`, `/compte/informations/` et `/compte/magasin/` répondent 404 aujourd'hui. Ils apparaîtront après le `git push` du pilote (voir « Commandes git » plus bas) et le déploiement GitHub Pages.

## Package de livraison

**Fichier** : `livraison/boutique-demo-v1.0.0.zip`
**Taille** : 43,7 Mo compressé (43 739 848 octets), 53,3 Mo non compressés
**Contenu** : 891 fichiers

| Inclus | Contenu |
|---|---|
| Sources | `src/`, `public/`, `design/` (dont `design/ds-export/`, lecture seule) |
| Build de production | `out/` (367 fichiers), construit pour `https://imzoughi.github.io/demo-next-js/` (`NEXT_PUBLIC_BASE_PATH=/demo-next-js`) |
| Passation | `AGENTS.md`, `livraison/backend/` (contrat, exemples, branchements, actions) |
| Déploiement | `.github/` (workflow Pages), `.nojekyll` |
| Configuration | `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `playwright.config.ts`, `lighthouserc.cjs`, `.storybook/`, `.claude/`, `.mcp.json`, `decade.config.json`, `BRIEF.md`, `CLAUDE.md` |
| Suivi | `scripts/`, `workflow/` (sans les journaux), `audit/` |
| QA | `qa/*.md` (rapports), `qa/captures-passe7/` (86 captures de référence de la recette), `qa/perf.json` |

| Exclus | Raison |
|---|---|
| `node_modules/`, `.next/`, `.env*`, `.git/` | Installés ou générés, ou secrets |
| `storybook-static/`, `test-results/`, `.lighthouseci/`, `*.tsbuildinfo`, `next-env.d.ts` | Artefacts générés, ignorés par git |
| `tmp-qa/`, `qa/captures-passe6/`, `qa/captures-passe8/`, `qa/captures-passe9/`, `qa/lighthouse/` | Captures et rapports de passes intermédiaires |
| `workflow/logs/` | Journaux de travail |
| `livraison/LIVRAISON.md`, anciens zip | Lettre de livraison distribuée à part ; zip précédent remplacé |

Contrôle des secrets : aucun fichier `.env` dans le package, et aucune clé, token ou clé privée détectés dans la liste des fichiers. Les seules occurrences du mot « password » concernent le champ mot de passe des formulaires.

**Pas de `README.md` à la racine du dépôt.** Cette lettre (`livraison/LIVRAISON.md`) en tient lieu ; à décider par le pilote.

## Pages

Dix routes. Toutes les pages sont au statut VERT de la 7e passe QA (`qa/qa-all.md`).

| Page | Route | Statut QA | Sur le lien public (9 octobre) |
|---|---|---|---|
| Accueil | `/accueil/` | VERT | 200 |
| Liste de produits | `/liste-produits/` | VERT | 200 |
| Fiche produit | `/fiche-produit/` | VERT | 200 |
| Panier | `/panier/` | VERT | 200 |
| Paiement | `/paiement/` | VERT | 200 |
| Compte (accueil de l'espace client, connexion) | `/compte/` | VERT | 200 (contenu à revérifier après mise en ligne) |
| Mes commandes | `/compte/commandes/` | VERT | 404 (pas encore en ligne) |
| Fiche de commande | `/compte/commandes/[numero]/` (10530, 10517, 10482) | VERT | 404 (pas encore en ligne) |
| Mes informations | `/compte/informations/` | VERT | 404 (pas encore en ligne) |
| Mon magasin | `/compte/magasin/` | VERT | 404 (pas encore en ligne) |

Portail : `/`. Documentation : 44 pages contrôlées (`/docs/`, architecture, marque, tokens, 37 fiches composants, pages et maquettes, versions, performance).

L'espace client n'a pas de maquette Figma : il est composé avec les composants du kit (écart accepté dans `BRIEF.md`).

## Nouveautés de cette livraison

- **Espace client** (5 pages sous `/compte/`) : connexion simulée (la session est gardée pendant la visite), accueil du compte, mes commandes avec fiche détaillée (suivi, articles, adresse, paiement, récapitulatif), mes informations (profil et mot de passe), mon magasin (recherche par ville, choix du magasin favori). Menu du compte sur téléphone.
- **Corrections de la documentation** :
  - les aperçus de `/docs/pages/` sont préfixés et s'affichent ;
  - les chemins longs des fiches composants se coupent sur téléphone, sans défilement de côté ;
  - le tableau « Fiches des pages » est accessible au clavier (zone nommée, focalisable, défilable aux flèches).
- **Scripts** :
  - `npm run typecheck` lance `next typegen` puis `tsc --noEmit` ;
  - `npm run docs:check` contrôle la doc d'un build sans préfixe ;
  - `npm run docs:check:pages` contrôle la doc du build livré, préfixé `/demo-next-js` (`--base /demo-next-js`) : c'est la vérification à utiliser pour ce package ;
  - `npm run check` enchaîne lint, typecheck, build et `docs:check`.

## Résultats QA

**Verdict global** : VERT (7e passe du 9 octobre, puis contrôles après publication : R3 corrigé, contrôle VERT). Source : `qa/qa-all.md`.

| Domaine | Statut | Détail |
|---|---|---|
| Build (`npm run check`, copie propre) | VERT | lint 0 erreur (1 avertissement connu), typecheck, build 60 pages, doc VERT |
| Préfixe | VERT | QA faite sur un build `/boutique-demo` (export complet, 0 lien mort, 0 référence nue) ; `out/` livré reconstruit en `/demo-next-js`, doc VERT (`docs:check:pages`) |
| Captures | VERT | 10 pages + 2 commandes × 375 / 768 / 1280 / 1440 px, compte déconnecté puis connecté (76 passes) ; portail et doc à 375 px : 0 débordement |
| Accessibilité (axe) | VERT | 0 serious / critical, site et doc ; 1 mineur connu (`aria-allowed-role`, formulaire de connexion) |
| Interactions | VERT | panier, filtres, espace client : 51 sur 55 ; les 4 écarts viennent de l'assertion du script de test, vérifiés à la main |
| Mouvement réduit | VERT | `prefers-reduced-motion` respecté sur le même parcours |
| Règles du BRIEF | VERT | casse de phrase, icônes Lucide, couleurs en dur, durées |
| Portail et documentation | VERT | 10 pages listées, groupe « Compte » complet ; aperçus de `/docs/pages/` (10 documents, 1 titre chacun), tableau accessible (R3) |
| Performance | NON LANCÉ (non bloquant) | voir section suivante |

## Performance

Mesures du 6 octobre 2026 (`qa/perf.json`), seuils du projet : score 85 min, LCP 2 500 ms, CLS 0,1, TBT 300 ms, JS 300 Ko, images 200 Ko.

| Page | Score | LCP (ms) | CLS | TBT (ms) | JS (Ko) | Images (Ko) | Verdict |
|---|---|---|---|---|---|---|---|
| Accueil | 99 | 951 | 0,0004 | 9 | 288 | 227 | images au-dessus du seuil |
| Liste de produits | 99 | 901 | 0,0006 | 12 | 292 | 208 | images au-dessus du seuil |
| Fiche produit | 99 | 845 | 0,0005 | 42 | 290 | 42 | OK |
| Panier | 99 | 881 | 0,0009 | 26 | 291 | 27 | OK |
| Paiement | 99 | 825 | 0,0005 | 32 | 294 | 0 | OK |
| Compte | 99 | 782 | 0,0005 | 25 | 293 | 0 | OK |

Les 4 sous-pages du compte (`/compte/commandes/`, `/compte/commandes/[numero]/`, `/compte/informations/`, `/compte/magasin/`) ne sont pas mesurées : `lighthouserc.cjs` ne vise pas les adresses `/compte/…`. Les mesures n'ont pas été refaites depuis l'ajout de l'espace client. La performance n'est pas bloquante (`performance.bloquant` = false).

## Points à trancher avant mise en ligne

1. **`.claude/settings.json`** : la version du dépôt et celle de travail ne contiennent plus les entrées du plugin `decade-front` (marketplace et `enabledPlugins`). À vérifier avant tout commit ; voir la note après les commandes git.
2. **Nom de marque** : `src/data/site.ts` affiche « Avion — Boutique démo », comme `livraison/backend/AGENTS.md`, `actions.md` et `branchements.md`, alors que le brief parle de « Démo e-commerce ». À confirmer.
3. **Configuration des pages** : `decade.config.json` ajoute les 4 pages du compte (`compte-commandes`, `compte-commande`, `compte-informations`, `compte-magasin`) à la liste `pages`. À confirmer par le pilote.

## Réserves QA (non bloquantes)

- **Menu du compte** : débordement de 8 px entre 768 et 782 px de large avec barre de défilement Windows. Correctif possible : `overflow-x: clip` sur `.layout` ou `.page` (`src/app/(site)/compte/_components/compte.module.scss`).
- **Tableau « Fiches des pages »** à 375 px : lignes hautes (défilement horizontal de la première colonne).
- **404 de préchargement RSC** : seule source des 404 en console ; 0 erreur JavaScript. À confirmer sur GitHub Pages.
- **Images** : accueil (227 Ko) et liste (208 Ko) au-dessus du seuil de 200 Ko.
- **Storybook** : les `test-run` des stories (contrastes en thème sombre, Drawer, MiniCart, FiltersSheet) restent à rejouer depuis l'import du design system 1.0.0 ; Next DevTools MCP n'a pas servi à l'import.
- **EmailSignup, thème sombre** : le token `color-feedback-error` (#F2B8B5) n'atteint que 4,38:1 ; surcharge locale en place (#F9DCDA, 5,80:1). À corriger dans Claude Design au prochain export, puis retirer la surcharge.
- **Réglages mineurs** : `tsconfig.json` inclut `.next/dev/types/**` (peut gêner `npm run check` pendant `next dev`) ; `tests/` vide.

## Passation backend

Voir `livraison/backend/AGENTS.md` (à lire en premier), puis `contrat-donnees.json`, `exemples/`, `branchements.md` et `actions.md`. Les données sont des mocks dans `src/mocks/` ; la couche d'accès est `src/lib/api/index.ts`. La session du compte est simulée (`AccountProvider.tsx`). Le site est un export statique : une API avec session demande de quitter l'export statique (point à décider avec Decade).

## Commandes git (à lancer par le pilote)

Claude ne fait ni commit ni push. Les commandes ci-dessous sont à lancer par le pilote, depuis la racine du dépôt.

```bash
# Retirer du commit les journaux de travail déjà en zone de préparation
git restore --staged workflow/logs

# Fichiers et dossiers modifiés ou nouveaux de cette livraison
git add BRIEF.md decade.config.json next.config.ts package.json livraison/LIVRAISON.md livraison/boutique-demo-v1.0.0.zip livraison/backend qa/qa-all.md qa/recette.md qa/qa-page-compte.md qa/qa-page-compte-commande.md qa/qa-page-compte-commandes.md qa/qa-page-compte-informations.md qa/qa-page-compte-magasin.md qa/captures-passe7 scripts src/app/docs src/data/site.ts src/docs/catalog.tsx src/lib/api/index.ts src/mocks "src/app/(site)/compte" workflow/backlog.md workflow/blocages.md

# Contrôle avant commit
git status --short

git commit -m "feat: espace client et corrections de la documentation" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

# À lancer par le pilote, après relecture du commit
git push
```

**Note sur `.claude/settings.json`** : le pilote avait déjà mis ce fichier en préparation, il n'est donc pas dans la liste `git add` ci-dessus. S'il ne veut pas l'inclure dans le commit, il doit le retirer de la préparation avec `git restore --staged .claude/settings.json` (à lancer avant le `git commit`). Le fichier a été vérifié (point 1 ci-dessus) avant tout commit.

Le zip fait 43,7 Mo : sous la limite de 50 Mo de GitHub, mais il sera lourd à chaque version. Le `out/` n'est pas suivi par git ; le zip n'est donc pas reproductible depuis git seul.

---

Livraison du 9 octobre 2026, design system 1.0.0. Précédente : 6 octobre 2026.
