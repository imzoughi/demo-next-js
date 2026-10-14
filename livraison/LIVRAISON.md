# Livraison : boutique démo, espace client

**Date** : 14 octobre 2026
**Version du package** : 1.1.0
**Design system** : 1.0.0 (inchangé, 30 septembre 2026, aucun nouvel export Claude Design)
**Livraison précédente** : 9 octobre 2026 (package 1.0.0)
**Client de démo** : Issam MZOUGHI

## Liens publics

- Site : https://imzoughi.github.io/demo-next-js/
- Documentation : https://imzoughi.github.io/demo-next-js/docs/

Le site est servi sous le nom du dépôt (`demo-next-js`), pas sous `/boutique-demo/`. Le build est fait avec `NEXT_PUBLIC_BASE_PATH=/demo-next-js` (voir `.github/workflows/pages.yml`).

**Mise en ligne** : les pages du compte (`/compte/commandes/`, `/compte/commandes/10530/`, `/compte/informations/`, `/compte/magasin/`) n'apparaîtront sur le lien public qu'après le `git push` du pilote et le déploiement GitHub Pages. Elles répondaient 404 à la livraison du 9 octobre. À vérifier après déploiement.

## Contenu du package

**Fichier** : `livraison/boutique-demo-v1.0.0.zip`
**Taille** : 50 880 369 octets (environ 50,9 Mo, 48,5 Mio), **921 fichiers**.

| Inclus | Contenu |
|---|---|
| Build de production | `out/` (378 fichiers), construit pour `https://imzoughi.github.io/demo-next-js/` |
| Sources | `src/`, `public/`, `design/` (dont `design/ds-export/`, lecture seule) |
| Passation | `AGENTS.md` (à la racine), `livraison/backend/` (contrat v1.2.0, exemples, branchements, actions) |
| Déploiement | `.github/` (workflow Pages), `.nojekyll` |
| Configuration | `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `playwright.config.ts`, `lighthouserc.cjs`, `.storybook/`, `.claude/`, `.mcp.json`, `decade.config.json`, `BRIEF.md`, `CLAUDE.md` |
| Suivi | `scripts/`, `workflow/` (sans les journaux), `audit/` |
| QA | `qa/*.md` (rapports), `qa/perf.json`, `qa/captures-passe12/` (88 captures de la recette) |

| Exclus | Raison |
|---|---|
| `node_modules/`, `.next/`, `.git/`, fichiers `.env` | Installés, générés, ou secrets : aucun n'est présent dans le package |
| `storybook-static/`, `test-results/`, `.lighthouseci/`, `*.tsbuildinfo`, `next-env.d.ts` | Artefacts générés |
| `tmp-qa/`, `qa/lighthouse/`, `qa/captures-passe6` à `11` | Captures et rapports de passes intermédiaires |
| `workflow/logs/` | Journaux de travail |
| `livraison/LIVRAISON.md`, anciens zip | Lettre distribuée à part ; zip 1.0.0 remplacé |

Contrôle fait avant livraison : aucune clé privée, jeton ou clé d'API détectés dans les fichiers texte ou dans `out/` ; aucun chemin local ni adresse e-mail personnelle.

## Pages

Dix pages, toutes au statut VERT dans `qa/qa-all.md`.

| Page | Route |
|---|---|
| Accueil | `/accueil/` |
| Liste de produits | `/liste-produits/` |
| Fiche produit | `/fiche-produit/` |
| Panier | `/panier/` |
| Paiement | `/paiement/` |
| Compte (connexion, accueil de l'espace client) | `/compte/` |
| Mes commandes | `/compte/commandes/` |
| Fiche de commande | `/compte/commandes/[numero]/` (10530, 10517, 10482) |
| Mes informations | `/compte/informations/` |
| Mon magasin | `/compte/magasin/` |

Portail : `/`. Documentation : `/docs/` (44 pages contrôlées par `docs:check`, dont les fiches des 37 composants du design system, les pages et maquettes, le journal des versions et la performance).

L'espace client n'a pas de maquette dans le Figma de l'agence : il est composé avec les composants du kit (écart accepté dans `BRIEF.md`).

## Nouveautés du 14 octobre

- **Mes informations** : bloc « Mes adresses » avec adresse de livraison et adresse de facturation. La case « L'adresse de facturation est identique à l'adresse de livraison » masque les champs de facturation. Bloc « Changer le mot de passe » séparé.
- **Mon magasin** : carte des magasins (Leaflet, fond OpenStreetMap), en plus de la liste. Recherche par ville ou code postal, choix d'un magasin favori, bouton « Voir sur la carte ».
- **Statut ouvert / fermé** de chaque magasin, calculé à l'heure de Paris et mis à jour chaque minute.
- **Icônes** : 6 noms ajoutés au composant Icon (Lucide) : `clock`, `messages-square`, `paintbrush`, `phone`, `receipt`, `star`.
- **Boutons** : « Voir sur la carte » en secondary ; choix du magasin favori en primary, puis en secondary une fois choisi.
- **Stories** : composants de l'espace client documentés en stories (`AddressesForm`, `StoreFinder`, `StoreMap`, `StoreStatus`). Hors export Claude Design, car ce sont des composants de page.
- **Documentation** : fiches des pages compte mises à jour, journal des versions daté du 14 octobre (`design/CHANGELOG.md`).

## Résultats QA

**Verdict** : VERT, tour 2 de la 8e passe (`qa/qa-all.md`, 14 octobre 2026). Recette du pilote validée le 14 octobre (`qa/recette.md`).

- Build : lint, typecheck, build de production, `docs:check` VERTS. Un avertissement lint accepté (`<img>` au lieu de `next/image`, export statique).
- Storybook : **197 stories** × 2 thèmes, 0 échec (rendu, play, axe).
- Pages : **10 pages** × 375, 768, 1280, 1440 px × 2 thèmes, compte connecté et déconnecté : 0 erreur JavaScript, 0 image cassée, 0 débordement, 0 problème axe sérieux ou critique.
- Accessibilité : 0 problème sérieux ou critique sur les 88 passes.
- Mouvement réduit et règles du BRIEF (casse de phrase, icônes Lucide, pas de couleur en dur) : VERTS.
- Contraste du lien OpenStreetMap en thème sombre : corrigé (fond du token) et revérifié.
- CLS du compte : 0,0004 mesuré sur les 5 pages (avant correction : 0,172).

## Performance

Source : `qa/perf.json`. Seuils du projet : score 85 minimum, LCP 2 500 ms, CLS 0,1, TBT 300 ms, JS 300 Ko, images 200 Ko. La performance n'est pas bloquante (`performance.bloquant` = false).

- **Score** : 99 sur les 10 pages.
- **Écarts acceptés en recette** :
  - JS de `/compte/magasin/` : 302 Ko (seuil 300 Ko), à cause de la carte Leaflet ;
  - images de l'accueil : 227 Ko, et de la liste de produits : 208 Ko (seuil 200 Ko) ;
  - onglets du compte : débordement de 8 px entre 768 et 782 px avec une barre de défilement classique.

## Points ouverts

1. **EmailSignup en thème sombre** : le token d'erreur (#F2B8B5) ne donne que 4,38:1 de contraste. Une surcharge locale (#F9DCDA, 5,80:1) est en place. À corriger dans Claude Design au prochain export, puis retirer la surcharge.
2. **OpenStreetMap** : les tuiles sont chargées depuis les serveurs publics d'OpenStreetMap. À revoir en production (conditions d'usage, fréquence de chargement).
3. **Tests** : le dossier `tests/` est vide. Les contrôles reposent sur les stories (Storybook) et sur la QA (`qa/`).
4. **Réglages mineurs** : `tsconfig.json` inclut `.next/dev/types/**`, ce qui peut gêner `npm run check` pendant `next dev`.

## Passation backend

Lire `livraison/backend/AGENTS.md` en premier, puis `contrat-donnees.json` (version 1.2.0), `exemples/`, `branchements.md` et `actions.md`. Ce document ne recopie pas la passation.

Les données sont des mocks dans `src/mocks/` ; la couche d'accès est `src/lib/api/index.ts`. La session du compte est simulée (`AccountProvider.tsx`). Le site est un export statique : une API avec session demande de quitter l'export statique (point à décider avec Decade).

## Commandes git (à lancer par le pilote)

Claude ne fait ni commit ni push. Lancer depuis la racine du dépôt :

```bash
cd "C:/Users/Issam-Mzoughi/Desktop/PROJETS/DECODE/figma-to-code/Demo-store-front-nextjs/demo-next-js"

# Fichiers de cette livraison (sans workflow/logs, sans captures des passes 6, 8, 9, 10, 11)
git add -A -- BRIEF.md design/CHANGELOG.md lighthouserc.cjs package.json package-lock.json livraison src qa/perf.json qa/qa-all.md qa/qa-page-compte-informations.md qa/qa-page-compte-magasin.md qa/qa-storybook-compte.md qa/recette.md qa/captures-passe12 workflow/backlog.md workflow/blocages.md

# Contrôle avant commit
git status --short

git commit -m "feat: espace client, carte des magasins et livraison v1.1.0" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

# À lancer par le pilote, après relecture du commit
git push
```

**Points d'attention** :
- Le zip `boutique-demo-v1.0.0.zip` (nommé d’après le design system 1.0.0) remplace celui du 9 octobre : il pèse 50,9 Mo, au-dessus du seuil d’avertissement de 50 Mo de GitHub (sans blocage). Décider s'il faut le suivre dans git ou le garder hors dépôt.
- Les captures de la passe 12 (28 Mo) sont ajoutées. La passe 7 est déjà suivie par git et n'est pas touchée. Les passes 6 et 8 à 11 ne sont pas suivies et ne sont pas ajoutées.
- `workflow/logs/` n'est pas ajouté : le commit précédent n'en contenait pas.
- `.claude/` et `.mcp.json` ne sont pas modifiés depuis le dernier commit : rien à ajouter pour eux.
