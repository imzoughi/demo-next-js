# Retours sur le Figma — boutique-demo (30/09/2026)

Bonjour,

Merci pour le fichier. Nous démarrons l'intégration de l'accueil, de la liste produits, de la fiche produit et du panier. Voici nos retours, du plus urgent au moins urgent. Les numéros entre parenthèses sont les identifiants des calques dans le Figma.

## Bloquants

- [Bloquant] Paiement — écran absent — maquettes desktop (1440) et mobile (390) du tunnel : adresse, livraison, paiement, confirmation de commande, avec les messages d'erreur des champs.
- [Bloquant] Compte — écran absent — maquettes desktop et mobile : connexion, création de compte, mot de passe oublié, tableau de bord (commandes, adresses, informations).
- [Bloquant] Mini-panier — couche absente — aperçu du panier qui s'ouvre après « Add to cart » : liste des articles, sous-total, boutons « voir le panier » et « commander », fermeture, version mobile.
- [Bloquant] Stepper de quantité (52:275) — les signes « − » et « + » sont presque invisibles (contraste 1,2:1) et trop petits pour le doigt — contraste d'au moins 4,5:1 et zones cliquables de 44 × 44 px, avec états au minimum (1) et au maximum.
- [Bloquant] Boutons, champs, cases à cocher (52:237, 114:2370, 52:269, 52:304) — l'état « focus » ressemble à l'état normal — un contour de focus bien visible (au moins 3:1 sur le fond), pour la navigation au clavier.

## Majeurs

- [Majeur] Champ texte (52:269) — un seul état, pas de label, texte d'exemple à 20 % d'opacité (illisible) — label visible, états focus, erreur (message sous le champ), désactivé, et texte d'exemple lisible.
- [Majeur] Panier (27:1215, 119:3383) — pas de suppression d'article, pas d'état « panier vide », pas de lien « continuer mes achats » — ajouter ces trois éléments, desktop et mobile.
- [Majeur] Liste produits (45:242, 122:2990) — pas d'état « aucun résultat », pas de compteur de résultats, pas de filtres actifs ni de bouton « réinitialiser » — les ajouter.
- [Majeur] Liste produits mobile (122:3085) — « Filters » et « Sorting » ne montrent pas ce qui s'ouvre — maquette du panneau de filtres et de la liste de tri ouverts.
- [Majeur] En-tête mobile (122:4302) — le menu ne montre pas ce qui s'ouvre, ni la recherche — maquette du menu mobile ouvert et de la recherche.
- [Majeur] Fiche produit (11:123, 114:6708) — pas de retour après « Add to cart » (chargement, succès, rupture de stock) — états du bouton et message de confirmation (ou ouverture du mini-panier).
- [Majeur] Toutes les pages — pas de version tablette (768 px) — au moins une frame 768 par gabarit, ou une règle écrite de passage mobile → desktop.
- [Majeur] Nommage des frames — fiche produit, panier et à propos s'appellent toutes « Product v3 », l'accueil v2 s'appelle « Home v1 », titre « Product Listing » sur la fiche produit — un nom par page et par taille, par exemple « Fiche produit — v2 — Desktop ».
- [Majeur] Versions multiples — accueil, fiche, liste et panier existent en 2 ou 3 versions — indiquer la version retenue pour chaque page.
- [Majeur] Styles — pas de styles d'espacement, d'arrondi ni d'ombre ; plusieurs écarts à 14 ou 15 px ; prix en 24 px sans style de texte (22:261) — ajouter une échelle d'espacement (4 / 8 / 16 / 24 / 32…) et un style « prix ».
- [Majeur] Liste produits v2 (45:484) — l'en-tête est détaché de son composant (« Frame 1 », « Frame 143 ») — remettre l'instance Top Nav.

## Mineurs

- [Mineur] Cibles tactiles — icônes d'en-tête 16 px et cases à cocher environ 16 px — zone cliquable de 44 × 44 px.
- [Mineur] Textes — contenus en anglais, les 9 produits de la liste s'appellent « The Dandy chair — £250 » — textes en français et produits variés, avec un nom long pour tester le retour à la ligne.
- [Mineur] Panier (27:1215) — « Basic white vase » à £85 mais total de ligne à £125 — corriger le montant.
- [Mineur] Filtres (114:3148) — « Homeware » apparaît deux fois — supprimer le doublon.
- [Mineur] Fiche produit (22:284) — faute « Quantitity » — « Quantité ».
- [Mineur] Typographie (16:607) — le Style Guide affiche un interligne de 150 % alors que les titres sont à 1,4 — aligner la documentation sur la valeur réelle.
- [Mineur] En-tête — hauteur variable selon les pages (80, 132, 134 px) et icône panier absente sur l'en-tête mobile du panier (119:3384) — un seul en-tête par taille d'écran, avec l'icône panier partout.
- [Mineur] Texte courant — pied de page, filtres et cartes avantages en 14 px — passer le texte courant à 16 px.
- [Mineur] Propriétés des composants — « Property 1 », « Property 2 », « Defaul », « Variant2 », cadre « Hedaer » — des noms explicites (type, état, taille).
- [Mineur] Interactions — aucune animation décrite (survol des cartes, ouverture des couches, bandeau refermable 114:6043) — une note courte par interaction (durée, effet).
- [Mineur] Bordure « Border Dark » (114:2354) — la valeur n'est pas documentée — indiquer le code couleur.

Merci d'avance. Nous relancerons l'audit dès réception de la mise à jour.
