# Livraison — Boutique démo

## Package de livraison

**Fichier** : `boutique-demo-v1.0.0.zip` (21.91 Mo, 701 fichiers)

**Contenu** :
- Toutes les sources du projet (`src/`, `public/`, `design/`)
- Build de production statique dans `out/` prêt pour GitHub Pages
- Passation backend : `livraison-backend/` (API mock, contrat, exemples, actions)
- Workflows GitHub Pages (`.github/`)
- Fichiers de configuration et documentation (package.json, tsconfig.json, README, AGENTS.md, etc.)

## Démarrage

```bash
npm ci
npm run dev
```

Ouvre http://localhost:3000 pour le site, http://localhost:3000/docs pour la documentation.

### Commandes npm

- `npm run dev` — serveur de développement
- `npm run build` — compilation production (export statique dans `out/`)
- `npm run docs:check` — vérification intégrité documentation

## Éléments livrés

### Pages (6)

| Page | Route | Statut |
|------|-------|--------|
| Accueil | `/accueil` | VERT |
| Liste de produits | `/liste-produits` | VERT |
| Fiche produit | `/fiche-produit` | VERT |
| Panier | `/panier` | VERT |
| Paiement | `/paiement` | VERT |
| Compte | `/compte` | VERT |

### Documentation (44 pages)

- Portail : `/` — vue d'ensemble, 6 pages, design system 1.0.0
- Démarrage : `/docs`
- Architecture : `/docs/architecture`
- Guide de marque : `/docs/marque`
- Tokens : `/docs/tokens`
- Composants (37 fiches) : `/docs/composants/[id]`
- Pages et maquettes : `/docs/pages`
- Journal des versions : `/docs/versions`
- Performance : `/docs/performance`

## Design system

**Version** : 1.0.0 (30 septembre 2026)

**Contenu** : tokens (couleurs, typo, espacements, ombres, durées), 37 composants, architecture React/Next.js.

**Build docs** : `npm run build` puis `npm run docs:check` — contrôle HTML + images + liens internes.

## Nouveautés de cette livraison

- **TopNav, correctif soulignement** : les liens de catégories desktop ne sont plus affectés par la règle `:active` du menu mobile. Voir `design/CHANGELOG.md`.

## Résultats QA

**Verdict global** : VERT (5e passe du 6 octobre 2026, R1 corrigé)

| Domaine | Statut | Détail |
|---------|--------|--------|
| Vérification R1 (aperçus préfixés) | VERT | Liens et images préfixés `/boutique-demo/` validés sur Edge |
| Compilation (`npm run check`) | VERT | `next build` en export statique : 54 routes, 0 erreur |
| Documentation (`docs:check`) | VERT | 44 pages contrôlées, 0 lien cassé |
| Interactions (panier, filtres, compte) | VERT | 28 / 28 validées |
| Accessibilité (axe) | VERT | 6 pages × 4 largeurs + portail/docs : 0 serious, violations mineures inchangées |
| Captures visuelles (24) | VERT | 6 pages × 4 largeurs (375, 768, 1280, 1440 px) : 0 débordement, 0 image cassée |
| Mouvement réduit | VERT | 6 pages × 4 largeurs : préférence `prefers-reduced-motion` respectée |
| Persistance panier | VERT | SessionStorage : survit au rechargement, cohérent fiche → tiroir → panier → paiement |

## Performance

**Verdict** : ORANGE (non bloquant pour livraison)

| Métrique | Seuil | Accueil | Liste | Fiche | Panier | Paiement | Compte |
|----------|-------|---------|-------|-------|--------|----------|--------|
| Lighthouse | 85 min | 99 | 99 | 99 | 99 | 99 | 99 |
| LCP | 2500 ms | 951 | 901 | 845 | 881 | 825 | 782 |
| CLS | 0,1 | 0,0004 | 0,0006 | 0,0005 | 0,0009 | 0,0005 | 0,0005 |
| TBT | 300 ms | 9 | 12 | 42 | 26 | 32 | 25 |
| JS | 300 Ko | 288 | 292 | 290 | 291 | 294 | 293 |
| Images | 200 Ko | 227 | 208 | 42 | 27 | 0 | 0 |

**Point orange** : images accueil et liste > 200 Ko (227, 208). Raison : images de produits de bonne qualité. Impact négligeable sur LCP (< 1 s) et CLS (< 0,001).

## GitHub Pages — Configuration requise

**Lien attendu** : `https://imzoughi.github.io/demo-next-js/`

**État du projet** : 
- `next.config.ts` : `output: 'export'` ✓ (export statique)
- `basePath` : configuré par variable `NEXT_PUBLIC_BASE_PATH` au build ✓
- Fichiers `.github/workflows/pages.yml` et `.nojekyll` : présents ✓

**Actions requises avant la mise en ligne** :
1. Accepter le déploiement GitHub Pages sur la branche `gh-pages` (via paramètres du dépôt)
2. À chaque push sur `main` : relancer `npm run build` avec `NEXT_PUBLIC_BASE_PATH=/demo-next-js` ; le workflow GitHub Actions le fait automatiquement via `pages.yml` (si configuré)

**Test local** :
```bash
NEXT_PUBLIC_BASE_PATH=/demo-next-js npm run build
npx serve out
# puis http://localhost:3000/demo-next-js/
```

## Points ouverts

### À corriger dans Claude Design

- **EmailSignup, thème sombre** : le token `color-feedback-error` (#F2B8B5) n'atteint que 4,38:1 sur fond sombre. Corrigé localement dans `src/components/blocks/EmailSignup/EmailSignup.module.scss` (#F9DCDA, 5,80:1). À corriger dans l'export du design system, puis retirer la surcharge locale.

### Tests à rejouer

- **Storybook et MCP Storybook** : le serveur a été arrêté avant la fin de la boucle composants. Commande à rejouer quand Storybook tourne (`npm run storybook`), puis `test-run` sur toutes les stories — vérifier surtout contrastes sombre + Drawer, MiniCart, FiltersSheet.

### Écarts acceptés (liste-produits)

- **Focus clavier dans FiltersSheet** (mobile) : le bouton « Tout effacer » se désactive après utilisation et perd le focus. Écart accepté par le pilote (tour 4, workflow/historique) — correction possible via `focus-manager` ou `aria-disabled`. Classé comme VERT.

### Réglages mineurs (orange)

- **O1** — `tsconfig.json` inclut `.next/dev/types/**/*.ts` : peut causer échec de `npm run check` si `next dev` tourne. Retirer l'entrée ou arrêter le dev et supprimer `.next/dev`.
- **O2** — `src/docs/Table.tsx` : texte des colonnes étroites coupé lettre par lettre. Ajouter `white-space: nowrap` ou largeur minimale.
- **O4** — `tests/` vide : `test:ui` et `shots` ne tournent pas. Scripts remplacés par Playwright dans la boucle QA.

## Brancher les données (backend)

### Couche API (mocks)

**Fichier** : `src/lib/api/index.ts`

Ce fichier expose l'API du site. Actuellement, il importe depuis des mocks typés dans `src/mocks/` :
- `getHomeContent()` — contenu accueil
- `getProducts()` — liste tous les produits
- `getProduct(id)` — détail 1 produit
- `getCategories()` — catégories
- `getFilterGroups()` — groupes de filtres (sur liste)
- `getSortOptions()` — options de tri
- `getCart()` — panier initial
- `getOrders()` — commandes du compte
- `getAccount()` — profil du compte

**Comment brancher** : remplacer les retours `return monMock;` par des appels API réels :
```typescript
export async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://votre-api.com/products');
  return response.json();
}
```

Les types TypeScript sont déjà prêts (`Product`, `CartLine`, `Order`, etc.). Aucune modification du reste du code n'est nécessaire.

### État du panier (client)

**Fichier** : `src/app/(site)/_components/CartProvider.tsx`

État du panier en React Context partagé partout le site. Basé sur l'état local du navigateur (`sessionStorage`) — le panier survit au rechargement de page, mais pas à la fermeture de l'onglet.

**Intégration backend** :
1. Remplacer la ligne `const [lines, setLines] = useState(initialCart);` (l. 35) par un appel serveur.
2. Ajouter `useEffect` pour synchroniser les changements (ajout, suppression, quantité) avec votre API.
3. Adapter `addLine`, `setQuantity`, `removeLine` pour appeler l'API backend avant de mettre à jour l'état local.

Exemple :
```typescript
const [lines, setLines] = useState(initialCart);

useEffect(() => {
  // Appel API pour charger le panier utilisateur connecté
  fetch('/api/cart').then(r => r.json()).then(setLines);
}, []);

const addLine = async (line: CartLine) => {
  await fetch('/api/cart/lines', { method: 'POST', body: JSON.stringify(line) });
  // puis mettre à jour l'état local
};
```

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/lib/api/index.ts` | Couche API, à brancher au backend |
| `src/mocks/` | Données de démonstration (typées) |
| `src/app/(site)/_components/CartProvider.tsx` | État du panier côté client |
| `src/app/(site)/layout.tsx` | Layout site + header + footer |
| `src/app/docs/` | Portail et documentation (automatisée) |
| `design/ds-export/` | Design system (version 1.0.0) : tokens, composants, README |
| `next.config.ts` | Config Next.js : export statique, basePath GitHub Pages |

## Support

- **Plugin Decade front** — voir `CLAUDE.md` pour les conventions et le workflow
- **Design system** — `design/ds-export/README.md` et `/docs/marque`
- **Conventions React/Next.js** — `plugins/decade-front/skills/decade-stack-nextjs/conventions.md`

## Commandes git (à lancer par le pilote)

```bash
git add src/components/blocks/TopNav/TopNav.module.scss design/CHANGELOG.md livraison/LIVRAISON.md
git commit -m "fix: soulignement de la barre de navigation"
```

Le commit inclut :
- Retrait du sélecteur `.cat` de la règle `:active` (TopNav.module.scss)
- Mise à jour du journal des versions (design/CHANGELOG.md)
- Cette livraison (LIVRAISON.md)

**Ne pas pousser** (`git push`) — le pilote le fera lui-même après validation locale.

---

Livraison du 6 octobre 2026, design system 1.0.0.
