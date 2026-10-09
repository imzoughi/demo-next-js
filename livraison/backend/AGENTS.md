# Avion, boutique démo — passation backend

> Fichier pour toute IA de développement (Claude Code, Codex, Cursor…) et pour les développeurs backend.
> Front livré par Decade le 6 octobre 2026, mis à jour le 9 octobre 2026 (espace client : commandes détaillées, informations, magasins) · design system Avion v1.0.0 · stack Next.js 16 (App Router, export statique) + React 19 + SCSS modules.

## Ce que tu reçois
- Un front **terminé et contrôlé** : 6 pages (Accueil, Liste de produits, Fiche produit, Panier, Paiement, Compte), 37 composants, documentation : `/docs` (en local) ou https://imzoughi.github.io/demo-next-js/docs/.
- Toutes les données affichées sont des **données d’exemple** (`src/mocks/`), servies par une couche d’accès unique : `src/lib/api/index.ts`.
- Ton travail : remplacer ces données par les vraies et brancher les actions utilisateur, **sans changer l’apparence**.

## Lis dans cet ordre
1. `contrat-donnees.json` — la forme exacte de chaque donnée attendue (JSON Schema, 16 entités ; noms identiques aux types de `src/mocks/types.ts`).
2. `exemples/` — les données d’exemple actuelles, conformes au contrat (utilisables comme réponses factices d’API).
3. `branchements.md` — page par page : quelle fonction de `src/lib/api/index.ts` remplacer, quels états gérer.
4. `actions.md` — panier, commande, connexion, espace client (profil, mot de passe, magasin favori, lecture d’une commande), newsletter : ce que chaque action doit appeler.

## Règles à respecter
- **Ne modifie pas** : les styles (`*.scss`, `src/styles/`), les tokens (`src/styles/tokens.css`), les composants de `src/components/`, la documentation (`src/app/docs/`, `src/docs/`).
- Modifie le corps des fonctions de `src/lib/api/index.ts` ; pour les actions, les gestionnaires listés dans `actions.md`.
- Garde la forme des données du contrat. Si l’API renvoie autre chose, convertis dans `src/lib/api/`, pas dans les composants.
- Chaque donnée chargée gère ses 3 états avec les composants prévus dans `branchements.md` (Skeleton, EmptyState, Toast).
- Pas de secret dans le code : variables d’environnement (`.env.local`, jamais commité).
- Le site est aujourd’hui un **export statique** (`output: "export"`, GitHub Pages) : brancher une API au rendu serveur, des cookies de session ou des routes `/api` demande de quitter l’export statique (Vercel ou serveur Node). À décider avec Decade.

## Espace client (/compte/…)
5 routes : accueil + connexion, commandes, fiche commande (statique via `generateStaticParams`), informations, magasin. La session est **simulée** dans `src/app/(site)/compte/_components/AccountProvider.tsx` : c’est le point de branchement principal (voir `branchements.md`, section « Session simulée »). Les écrans ne lisent que le hook `useAccount()` : garde son interface.

## Commandes
| But | Commande |
|---|---|
| Installer | `npm install` |
| Lancer en local | `npm run dev` |
| Tout contrôler (lint, types, build, doc) | `npm run check` |

Le travail est fini quand `npm run check` est vert et que les tests visuels n’ont pas bougé.

## Points ouverts
- Authentification : la session est un faux profil en sessionStorage et le layout `compte/layout.tsx` lit `getAccount()` pour tous les visiteurs. Avec une vraie session, `getAccount()`, `getOrder()` et la page fiche commande doivent lire le client connecté (cookie) : impossible en export statique. Après changement, `generateStaticParams` de `/compte/commandes/[numero]/` est à retirer.
- `getOrder(number)` cherche dans les mocks ; prévoir un contrôle de propriété (une commande d’un autre client donne 404).
- Aucune fonction d’accès n’existe pour les entrées `ProfileUpdate`, `PasswordChange`, `FavoriteStore` : créer dans `src/lib/api/index.ts` `updateProfile()`, `changePassword()`, `setFavoriteStore()`, `login()`, `register()`, `logout()` et les appeler depuis `AccountProvider` et `InformationsForms` (ne pas modifier le rendu).
- Le magasin favori n’est pas dans `AccountData` : ajouter `favoriteStoreId` (voir entité Account).
- Les adresses du compte sont en lecture seule : aucune action d’édition n’est livrée.
- `Order.href` est calculé par le front (`orderHref`) : ne pas le renvoyer.
- `getProductPage()` ne prend pas d’identifiant : la fiche produit affiche toujours le même produit. Passer à `getProductPage(id)` et à une route `/fiche-produit/[id]`.
- `Order.date` est un texte déjà formaté : préférer une date ISO 8601 côté API et formater dans `src/lib/format.ts`.
- Le panier vit dans le navigateur (`CartProvider`, sessionStorage) : décider s’il devient un panier serveur (`/cart`) ou reste local jusqu’au paiement.
- `EmailSignup` : passer `onSubscribe` depuis les pages Accueil et Fiche produit.
- Aucune page d’erreur (`error.tsx`) ni page « produit introuvable » dédiée : à créer avec les composants existants (EmptyState).
- Paiement : choisir le prestataire ; les données de carte ne doivent jamais passer par ce front.
