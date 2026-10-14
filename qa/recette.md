# Recette pilote — boutique-demo

QA : `qa/qa-all.md` **VERT** (8e passe, tour 2, 14/10/2026) — mise à jour de l'espace client (adresses, carte des magasins, statut ouvert / fermé, icônes, boutons) et Storybook.
Site : `npm run build` puis `npm start` (http://localhost:4000), ou la version publiée sur GitHub Pages (`/demo-next-js/<page>/`).
Comparer chaque page à sa capture de référence : `qa/captures-passe12/<page>-light-<largeur>.png` (`compte-out` = compte déconnecté).
Connexion au compte : e-mail valide et mot de passe quelconques (démo, rien n'est envoyé). Le client de démo s'appelle maintenant **Issam MZOUGHI**.

## Nouveautés du 14/10 (à regarder en détail, ordinateur 1280 puis téléphone 375)
- [X] **Mes informations — adresses** — `/compte/informations/` · regarder : bloc « Mes adresses » (icône camion pour la livraison, facture pour la facturation) ; case « identique à la livraison » cochée par défaut ; la décocher fait apparaître la facturation ; vider deux champs puis « Enregistrer » → « 2 champs sont à corriger » ; enregistrer → « Vos adresses ont été enregistrées. » · réf. `compte-informations-light-1280.png` / `-375.png`
- [X] **Mon magasin — carte** — `/compte/magasin/` · regarder : carte à côté de la liste (ordinateur), au-dessus (téléphone) ; 7 repères ; le favori se distingue · réf. `compte-magasin-light-1280.png` / `-375.png`
- [X] **Mon magasin — « Voir sur la carte »** · regarder : le repère est au centre de la carte, la bulle s'ouvre en entier (nom et adresse lisibles sur téléphone), Échap la ferme
- [X] **Mon magasin — clic sur un repère** · regarder : le repère se centre, la fiche du magasin dans la liste se centre à l'écran ; « Choisir ce magasin » dans la bulle fonctionne
- [X] **Mon magasin — statut** · regarder : badge « Ouvert · ferme à 19 h » ou « Fermé · ouvre … » juste à l'heure actuelle ; icônes adresse, horaires, téléphone, services
- [X] **Mon magasin — boutons** · regarder : « Choisir ce magasin » plein, « Magasin favori » avec coche (cliquer le retire), « Voir sur la carte » à contour ; pleine largeur sur téléphone
- [X] **Thème sombre** sur Mon magasin · regarder : bulle, croix, zoom et mention « © OpenStreetMap » lisibles
- [X] **Nom de démo** — `/compte/` et `/compte/commandes/10530/` · regarder : « Issam MZOUGHI » partout, plus de « Camille »
- [X] **Storybook** — `npm run storybook` puis http://localhost:6006, « Sections de page / Compte » · regarder : statut du magasin, carte, Mes adresses, page Mon magasin

## Pages déjà recettées (contrôle rapide, aucune régression attendue)
- [X] **Accueil** — `/accueil/` · réf. `accueil-light-1280.png`
- [X] **Liste produits** — `/liste-produits/` · regarder : bouton « Filtres » sur téléphone · réf. `liste-produits-light-1280.png` / `-375.png`
- [X] **Fiche produit** — `/fiche-produit/` · réf. `fiche-produit-light-1280.png`
- [X] **Panier** — `/panier/` · réf. `panier-light-1280.png`
- [X] **Paiement** — `/paiement/` · réf. `paiement-light-1280.png`
- [X] **Compte, commandes, fiche de commande** — `/compte/`, `/compte/commandes/`, `/compte/commandes/10530/` · regarder : la page ne saute plus au chargement · réf. `compte-out-light-375.png`, `compte-light-1280.png`, `compte-commandes-light-1280.png`, `compte-commande-light-1280.png`

## À trancher (écarts non bloquants)
- [X] Mon magasin : JavaScript à 302 Ko pour un budget de 300 Ko (carte Leaflet ; le poids vient surtout du socle commun du compte).
- [X] Images de l'accueil (227 Ko) et de la liste produits (208 Ko) au-dessus du budget de 200 Ko (inchangé).
- [X] Menu du compte : débordement de 8 px entre 768 et 782 px de large avec barre de défilement Windows (inchangé).
- [X] Les fonds de carte viennent d'OpenStreetMap (service externe, gratuit, attribution affichée).

## Fin
- [X] Recette validée → mettre à jour « Recette du pilote » dans `BRIEF.md` (date du jour), puis lancer `/decade-front:publish`.
