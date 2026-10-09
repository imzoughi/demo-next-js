# Actions utilisateur — Avion, boutique démo

Aujourd’hui ces actions sont **simulées** côté navigateur (attente artificielle, aucune donnée envoyée). Le retour visuel est déjà en place : il suffit de remplacer la simulation par l’appel réel.

## Ajouter au panier
- **Où** : Fiche produit, ProductDetails (bouton « Ajouter au panier ») — aussi bouton d’ajout des cartes produit si activé
- **Code actuel** : `src/app/(site)/_components/ProductPurchase.tsx` · `onAdd(quantity)` (attente de 700 ms, puis `addLine()` du CartProvider et ouverture du MiniCart)
- **Entrée** : `{ "productId": "string", "quantity": 1 }` (quantité plafonnée à `Product.max`)
- **Appel attendu** : `POST /cart/lines`
- **Réponse attendue** : liste de `CartLine` (panier complet)
- **Erreurs à gérer** : stock insuffisant, produit retiré, réseau
- **Retour visuel prévu** : pendant l’appel, bouton en chargement · succès, MiniCart ouvert · erreur, Toast d’erreur (à ajouter)

## Modifier la quantité / retirer une ligne
- **Où** : Panier (CartItem, Stepper, bouton « Retirer ») et MiniCart
- **Code actuel** : `CartProvider.tsx` · `setQuantity(id, quantity)`, `removeLine(id)`, `restoreLine()` (annulation via Toast)
- **Entrée** : `{ "quantity": 2 }` · retrait : aucune
- **Appel attendu** : `PATCH /cart/lines/{id}` · `DELETE /cart/lines/{id}` (annuler = `POST /cart/lines` avec la ligne retirée)
- **Réponse attendue** : liste de `CartLine`
- **Erreurs à gérer** : quantité > stock, réseau
- **Retour visuel prévu** : Toast « Article retiré » avec Annuler (déjà en place) · erreur : Toast d’erreur

## Passer la commande (livraison + paiement)
- **Où** : Paiement, CheckoutView (formulaire livraison, puis formulaire paiement, bouton « Payer »)
- **Code actuel** : `src/app/(site)/paiement/CheckoutView.tsx` · `submitDelivery()` (validation locale) puis `submitPayment()` (attente 900 ms, numéro fictif `newOrderNumber()`)
- **Entrée** : coordonnées de livraison (champs du formulaire), mode de livraison (`standard`…), adresse de facturation identique ou non, lignes du panier. **Les données de carte ne doivent jamais transiter par ce front : utiliser le formulaire ou la redirection du prestataire de paiement.**
- **Appel attendu** : `POST /orders` (puis session de paiement du prestataire)
- **Réponse attendue** : `{ "number": "string", "total": 0, "email": "string" }` (affiché sur l’écran de confirmation) ; la commande apparaît ensuite comme `Order` dans le compte
- **Erreurs à gérer** : paiement refusé, stock épuisé entre-temps, champ invalide côté serveur (renvoyer le nom du champ)
- **Retour visuel prévu** : bouton Payer en chargement (`paying`) · succès, étape Confirmation · erreur, alerte en haut du formulaire et focus sur le champ concerné (déjà en place pour la validation locale)

## Se connecter / créer un compte
- **Où** : /compte/ (toute rubrique du compte affiche ce formulaire tant que la session est absente), AuthForm (onglets Connexion / Création de compte)
- **Code actuel** : `src/app/(site)/compte/_components/AccountShell.tsx` · `handleAuth(mode, values)` (attente 600 ms) puis `AccountProvider.tsx` · `signIn(mode, values)` (écrit un profil factice dans sessionStorage ; n’importe quel mot de passe est accepté)
- **Entrée** : connexion `{ "email", "password" }` · création `{ "firstName", "lastName", "email", "password" }`
- **Appel attendu** : `POST /auth/login` · `POST /auth/register`, puis `GET /me`
- **Réponse attendue** : session (cookie httpOnly) puis `Account`. `signIn` doit devenir asynchrone et renvoyer les erreurs à `handleAuth`, qui les affiche déjà via AuthForm
- **Erreurs à gérer** : 401 identifiants incorrects, 409 e-mail déjà utilisé, 422 mot de passe trop faible (renvoyer le nom du champ), réseau
- **Retour visuel prévu** : bouton en chargement · erreur, message sous le champ · succès, focus sur le titre de l’espace compte

## Se déconnecter
- **Où** : toutes les pages du compte, AccountMenu (« Se déconnecter »)
- **Code actuel** : `AccountShell.tsx` · `handleLogout()` puis `AccountProvider.tsx` · `signOut()` (efface sessionStorage), retour sur /compte/
- **Entrée** : aucune
- **Appel attendu** : `POST /auth/logout`
- **Réponse attendue** : 204 (cookie de session supprimé)
- **Erreurs à gérer** : réseau (déconnecter quand même côté client)
- **Retour visuel prévu** : retour au formulaire de connexion, focus sur le titre

## Lire une commande
- **Où** : /compte/commandes/ (OrderList) puis /compte/commandes/[numero]/ (OrderDetail : suivi, articles, livraison, adresse, paiement, total)
- **Code actuel** : `src/lib/api/index.ts` · `getOrder(number)` et `getAccount()` ; `generateStaticParams()` de `commandes/[numero]/page.tsx`
- **Entrée** : numéro de commande (paramètre d’adresse `numero`)
- **Appel attendu** : `GET /me/orders` · `GET /me/orders/{number}`
- **Réponse attendue** : `Order` (avec `items`, `shipping`, `shippingAddress`, `payment`) ; `total` = somme des articles + `shipping`
- **Erreurs à gérer** : 404 ou commande d’un autre client (même réponse, pour ne pas révéler son existence) → `notFound()` ; 401 → formulaire de connexion ; réseau
- **Retour visuel prévu** : Skeleton pendant le chargement · page 404 · lecture seule, aucun bouton d’action sur la commande

## Modifier ses informations
- **Où** : /compte/informations/, formulaire « Coordonnées » (InformationsForms)
- **Code actuel** : `InformationsForms.tsx` · `submitProfile()` (validation locale, attente 500 ms, puis `updateProfile()` du AccountProvider)
- **Entrée** : `ProfileUpdate` : `{ "firstName", "lastName", "email", "phone" }` (tous obligatoires ; e-mail valide ; téléphone à dix chiffres ou +33 et neuf chiffres)
- **Appel attendu** : `PATCH /me`
- **Réponse attendue** : `Account.profile` à jour (le front remplace le profil de la session)
- **Erreurs à gérer** : 422 champ invalide (renvoyer `{ "field": "email", "message": "…" }` pour afficher l’erreur sous le champ), 409 e-mail déjà utilisé, 401, réseau
- **Retour visuel prévu** : bouton en chargement · Toast « Vos informations ont été enregistrées. » · erreur sous le champ et focus sur le premier champ en erreur (déjà en place pour la validation locale). Brancher l’appel dans `submitProfile()` et placer les erreurs serveur dans `errors`

## Changer le mot de passe
- **Où** : /compte/informations/, formulaire « Changer le mot de passe »
- **Code actuel** : `InformationsForms.tsx` · `submitPassword()` (règles locales : 8 caractères, une majuscule, un chiffre ; attente 500 ms ; rien n’est vérifié ni stocké)
- **Entrée** : `PasswordChange` : `{ "currentPassword", "newPassword" }` (la confirmation reste côté front)
- **Appel attendu** : `POST /me/password`
- **Réponse attendue** : 204 ; l’API peut invalider les autres sessions
- **Erreurs à gérer** : 403 mot de passe actuel incorrect (afficher sous « Mot de passe actuel », champ `current`), 422 nouveau mot de passe trop faible ou identique (champ `next`), 429 trop de tentatives, réseau
- **Retour visuel prévu** : bouton en chargement · champs vidés et Toast « Votre mot de passe a été modifié. » · erreur sous le champ. Ne jamais journaliser ni conserver ces valeurs

## Choisir ou retirer le magasin favori
- **Où** : /compte/magasin/, bouton « Choisir comme favori » / « Retirer des favoris » sur chaque carte de StoreFinder ; l’accueil du compte l’affiche
- **Code actuel** : `StoreFinder.tsx` · `choose(id, name)` puis `AccountProvider.tsx` · `setFavoriteStore(id | null)` (sessionStorage)
- **Entrée** : `FavoriteStore` : `{ "storeId": "lyon-presquile" }` ou `{ "storeId": null }` pour retirer
- **Appel attendu** : `PUT /me/favorite-store`
- **Réponse attendue** : `FavoriteStore` à jour
- **Erreurs à gérer** : 404 magasin inconnu ou fermé, 401, réseau (le favori affiché ne change pas)
- **Retour visuel prévu** : Toast de confirmation déjà en place (à n’afficher qu’après la réponse) · erreur : Toast d’erreur (à ajouter)

## Rechercher un magasin
- **Où** : /compte/magasin/, champ de recherche (ville ou code postal)
- **Code actuel** : `StoreFinder.tsx` : filtre local de `getStores()` (ville sans casse ni accents, code postal par le début)
- **Entrée** : texte saisi
- **Appel attendu** : aucun tant que la liste est courte ; sinon `GET /stores?q=` (même règle de correspondance)
- **Réponse attendue** : liste de `Store`
- **Erreurs à gérer** : réseau
- **Retour visuel prévu** : EmptyState « Aucun magasin ne correspond » si la liste est vide

## S’inscrire à la newsletter
- **Où** : Accueil et Fiche produit, EmailSignup
- **Code actuel** : `src/components/blocks/EmailSignup/EmailSignup.tsx` · `submit()` ; la prop `onSubscribe` n’est **pas encore passée** par les pages (succès affiché sans appel)
- **Entrée** : `{ "email": "string" }`
- **Appel attendu** : `POST /newsletter/subscriptions`
- **Réponse attendue** : 201
- **Erreurs à gérer** : e-mail invalide (déjà géré localement), déjà inscrit, réseau
- **Retour visuel prévu** : états `loading`, `success`, `failed` (« L’inscription n’a pas abouti. Réessayez. ») déjà en place : il suffit de passer `onSubscribe` depuis les pages
