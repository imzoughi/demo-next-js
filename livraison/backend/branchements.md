# Points de branchement — Avion, boutique démo

Toutes les pages lisent leurs données par **une seule couche** : `src/lib/api/index.ts`. Chaque fonction y renvoie aujourd’hui des données d’exemple (`src/mocks/`). Pour brancher le backend, **change seulement le corps de ces fonctions** (appel d’API, puis conversion vers l’entité du contrat). Les pages et les composants ne bougent pas.

| Page | Composant | Donnée (entité du contrat) | Fichier à remplacer · fonction | Appel d’API attendu | Chargement | Vide | Erreur |
|---|---|---|---|---|---|---|---|
| Accueil | HeroBlocks, Features, EmailSignup | HomeContent (un seul) | `src/lib/api/index.ts` · `getHomeContent()` | `GET /content/home` | rendu serveur (pas d’état) | — | page d’erreur Next.js (`error.tsx`, à créer) |
| Accueil | Listings | Product (liste, 4) | `src/lib/api/index.ts` · `getFeaturedProducts()` | `GET /products?featured=true&limit=4` | Skeleton (variante carte) | section masquée | Toast « Produits indisponibles » |
| Liste de produits | ProductList (Filters, FiltersSheet, Listings) | ListedProduct (liste), FilterGroup (liste), SortOption (liste) | `src/lib/api/index.ts` · `getProductList()` | `GET /products?category=&material=&sort=` + `GET /products/filters` | Skeleton (grille) | EmptyState « Aucun produit ne correspond » (déjà prévu par les filtres) | Toast d’erreur + bouton Réessayer |
| Fiche produit | ProductPurchase → ProductDetails, Breadcrumb | ProductPage (un seul : Product + related) | `src/lib/api/index.ts` · `getProductPage()` (à passer en `getProductPage(id)`) | `GET /products/{id}` + `GET /products/{id}/related` | Skeleton (fiche) | `notFound()` → page 404 | page d’erreur |
| Fiche produit | Listings, EmailSignup | Product (liste « Vous aimerez aussi »), HomeContent | `getProductPage()` · `getHomeContent()` | voir ci-dessus | Skeleton | section masquée | section masquée |
| Panier | BasketView → ShoppingBasket, CartItem, OrderSummary ; MiniCart (en-tête) | CartLine (liste) | `src/lib/api/index.ts` · `getCart()` (panier initial) + `src/app/(site)/_components/CartProvider.tsx` (état client, sessionStorage) | `GET /cart` | — (panier initial rendu côté serveur) | EmptyState « Votre panier est vide » (déjà prévu) | Toast d’erreur |
| Paiement | CheckoutView → CheckoutProgress, TextInput, Radio, OrderSummary | CartLine (liste, depuis le panier) | `src/app/(site)/paiement/CheckoutView.tsx` · `submitPayment()` (paiement simulé, numéro fictif `newOrderNumber()`) | `POST /orders` (voir actions.md) | bouton Payer en chargement (`paying`) | EmptyState « Panier vide » (déjà prévu) | alerte du formulaire (`role="alert"`) |
| Compte | AccountView → AuthForm, AccountMenu, OrderList | Account (un seul : profil, Order, adresses) | `src/lib/api/index.ts` · `getAccount()` + `AccountView.tsx` · `handleAuth()` | `GET /me` (après connexion) | bouton du formulaire en chargement | OrderList vide → EmptyState « Aucune commande » | message d’erreur du formulaire |
| Toutes | TopNav, Footer | Category (liste) | `src/lib/api/index.ts` · `getCategories()` | `GET /categories` | — (rendu serveur) | menu sans catégories | menu sans catégories |

Fonctions disponibles mais non utilisées par les pages aujourd’hui : `getProducts()`, `getProduct(id)`, `getFilterGroups()`, `getSortOptions()`, `getOrders()`. Garde-les cohérentes avec le contrat.

## Pages statiques (stack html uniquement)
Sans objet : projet Next.js.
