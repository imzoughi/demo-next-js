# Recette pilote — boutique-demo

QA : `qa/qa-all.md` **VERT** (7e passe, 09/10/2026) — ajout de l'espace client (5 pages).
Site : `npm run build` puis `npm start` (http://localhost:4000), ou la version publiée sur GitHub Pages (`/demo-next-js/<page>/`).
Comparer chaque page à sa capture de référence : `qa/captures-passe7/<page>-<largeur>.png` (préfixe `co-` = compte connecté).
Connexion au compte : e-mail valide et mot de passe quelconques (démo, rien n'est envoyé).

## Pages déjà recettées le 06/10 (contrôle rapide, ordinateur 1440 puis téléphone 375)
- [x] **Accueil** — `/accueil/` · regarder : bandeau, cartes produit de même hauteur, panier depuis l'en-tête · réf. `accueil-1440.png` / `accueil-375.png`
- [x] **Liste produits** — `/liste-produits/` · regarder : filtre Catégorie (ordinateur), bouton « Filtres » puis Échap (téléphone) · réf. `liste-produits-1440.png` / `liste-produits-375.png`
- [x] **Fiche produit** — `/fiche-produit/` · regarder : « Ajouter au panier » ouvre le tiroir, « Voir le panier » mène au panier · réf. `fiche-produit-1440.png` / `fiche-produit-375.png`
- [x] **Panier** — `/panier/` · regarder : quantité, « Retirer », le panier reste après rechargement · réf. `panier-1440.png` / `panier-375.png`
- [x] **Paiement** — `/paiement/` · regarder : même total que le panier, erreurs si on valide à vide · réf. `paiement-1440.png` / `paiement-375.png`

## Espace client (nouveau — pas de maquette, composé avec le kit)
- [x] **Compte** — `/compte/` · regarder : erreurs en français si champs vides, puis connexion ; « Bonjour Camille », 3 cartes (dernière commande, magasin favori, informations), 2 adresses · réf. `compte-1440.png` (connexion), `co-compte-1440.png` / `co-compte-375.png`
- [x] **Menu du compte** — sur téléphone : bouton « Menu du compte », il s'ouvre, Échap le ferme, choisir une rubrique change de page et referme le menu
- [x] **Mes commandes** — `/compte/commandes/` · regarder : 3 commandes, statuts, lien vers chaque fiche · réf. `co-compte_commandes-1440.png`
- [x] **Fiche de commande** — `/compte/commandes/10530/` (aussi 10517 et 10482) · regarder : suivi « Préparation, Expédition, Livraison », articles, adresse, paiement, récapitulatif, retour « Mes commandes » · réf. `co-compte_commandes_10530-1440.png` / `-375.png`
- [x] **Mes informations** — `/compte/informations/` · regarder : modifier le nom puis « Vos informations ont été enregistrées. », nom repris sur l'accueil du compte ; mot de passe : règles affichées, erreurs · réf. `co-compte_informations-1440.png`
- [x] **Mon magasin** — `/compte/magasin/` · regarder : recherche « Lyon » ou « 75 », recherche sans résultat, « Choisir comme favori », magasin repris sur l'accueil du compte · réf. `co-compte_magasin-1440.png`
- [x] **Déconnexion** — retour au formulaire de connexion ; la connexion se perd à la fermeture de l'onglet (démo)

## Portail et documentation
- [x] **Portail** — `/` · regarder : 10 pages listées, groupe « Compte » (Commandes, Fiche de commande, Informations, Magasin favori) · réf. `portail-1280.png` / `portail-375.png`
- [x] `/docs/pages/` : les 10 aperçus s'affichent (aucune page « introuvable ») · réf. `docs-pages-1280.png`
- [x] Une fiche composant sur téléphone (`/docs/composants/checkout-progress/`) : pas de défilement de côté · réf. `docs-checkout-progress-375.png`

## À trancher (écarts acceptés par la QA, non bloquants)
- [x] Menu du compte : léger débordement (8 px) sur un écran d'ordinateur de 768 à 782 px de large avec barre de défilement Windows.
- [x] Vitesse des pages du compte non mesurée (l'outil de mesure ne vise pas encore les adresses `/compte/…`).
- [x] Libellés du suivi de commande « Préparation, Expédition, Livraison ».

## Publication
- [x] Sur GitHub Pages, les erreurs 404 « __next.!… » vues en local Windows ont disparu.

## Fin
- [x] Recette validée → mettre à jour « Recette du pilote » dans `BRIEF.md` (date du jour), puis lancer `/decade-front:publish`.
