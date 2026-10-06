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
- **Où** : Compte, AuthForm (onglets Connexion / Création de compte)
- **Code actuel** : `src/app/(site)/compte/AccountView.tsx` · `handleAuth(mode, values)` (attente 600 ms, connexion simulée, données de `getAccount()`)
- **Entrée** : connexion `{ "email", "password" }` · création `{ "firstName", "lastName", "email", "password" }`
- **Appel attendu** : `POST /auth/login` · `POST /auth/register`, puis `GET /me`
- **Réponse attendue** : session (cookie httpOnly) puis `Account`
- **Erreurs à gérer** : identifiants incorrects, e-mail déjà utilisé, mot de passe trop faible
- **Retour visuel prévu** : bouton en chargement · erreur, message sous le champ (AuthForm gère `errs`) · succès, espace compte

## Se déconnecter
- **Où** : Compte, AccountMenu (« Se déconnecter »)
- **Code actuel** : `AccountView.tsx` · `handleLogout()` (état local seulement)
- **Entrée** : aucune
- **Appel attendu** : `POST /auth/logout`
- **Réponse attendue** : 204
- **Erreurs à gérer** : réseau (déconnecter quand même côté client)
- **Retour visuel prévu** : retour au formulaire de connexion

## S’inscrire à la newsletter
- **Où** : Accueil et Fiche produit, EmailSignup
- **Code actuel** : `src/components/blocks/EmailSignup/EmailSignup.tsx` · `submit()` ; la prop `onSubscribe` n’est **pas encore passée** par les pages (succès affiché sans appel)
- **Entrée** : `{ "email": "string" }`
- **Appel attendu** : `POST /newsletter/subscriptions`
- **Réponse attendue** : 201
- **Erreurs à gérer** : e-mail invalide (déjà géré localement), déjà inscrit, réseau
- **Retour visuel prévu** : états `loading`, `success`, `failed` (« L’inscription n’a pas abouti. Réessayez. ») déjà en place : il suffit de passer `onSubscribe` depuis les pages
