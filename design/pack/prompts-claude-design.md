# Prompts Claude Design — boutique-demo

Dans Claude (Cowork), demander un **design system** nommé « boutique-demo » et joindre `design/pack.zip`. Un message par bloc, dans l'ordre. Attendre la fin de chaque bloc avant le suivant.
12 prompts : 1 création · 2 à 9 les 8 groupes · 10 écrans absents du Figma · 11 contrôle · 12 export.

## 1. Création (un seul message)
```
Crée le design system « Avion — boutique-demo » à partir du pack joint. BRIEF.md fait foi.
- Marque : « Avion » (texte en Clash Display, sans fichier logo). Projet : boutique en ligne de mobilier et décoration, langue française, casse de phrase partout (« Ajouter au panier », « Voir la collection »).
- Tokens depuis tokens.json (thème clair et thème sombre dérivé), polices Clash Display (titres) et Satoshi (texte), pictos depuis assets/ tels quels (ne redessine rien). Le contraste de chaque paire est dans contrastes.md : n'utilise aucune paire marquée « insuffisant » pour du texte.
- Icônes : uniquement Lucide, selon assets/icons-map.md (les logos de réseaux sociaux gardent les SVG Carbon fournis).
- Les captures/ montrent le rendu attendu de chaque composant et gabarit : accueil, liste-produits, fiche-produit et panier en desktop 1440 et mobile 390 (versions retenues : accueil v2, liste-produits v3, fiche-produit v2, panier v2). Il n'y a pas de maquette tablette : déduis le 768 (grilles 4 → 2 colonnes, filtres en panneau). Largeurs à vérifier : 375, 768, 1280, 1440.
- Applique regles-or.md à chaque composant : tokens seulement, tous les états, mobile, accessible, un rôle un composant, nommage PascalCase, mouvement du catalogue, identité respectée, README complet.
- Mouvement (niveau sobre) : ajoute les tokens de motion/tokens-motion.json (durées, courbes, distances) et une page « Mouvement » avec un aperçu animé de chaque ligne de motion/catalogue.md et sa version en mode réduit (niveau 1 retiré, niveau 2 en fondu court, niveau 3 gardé). Aucune durée écrite en dur dans un composant. Pas d'apparition au défilement, pas de carrousel automatique.
- Textes de démonstration en français (jamais d'anglais) : produits « Fauteuil Dandy » 250 €, « Canapé en velours Poplar » 980 €, « Vase Graystone » 85 €, « Vase blanc classique » 95 €, « Table basse en chêne massif avec plateau amovible et rangement intégré » 420 € (nom long pour tester le retour à la ligne). Prix en euros, format « 250 € ».
- Le Figma a des faiblesses UI/UX. Applique, avec les skills impeccable et ui-ux-pro-max (ou regles.md joint), uniquement les corrections cochées de ux-corrections.md (24 corrections, toutes cochées par le pilote). Garde l'identité : logo, couleurs (#2A254B, #4E4D93, #F9F9F9, #EBE8F4, #CAC6DA, blanc), polices, ton. Note chaque écart au Figma dans le README, section « Écarts validés ». Deux précisions de calcul : le placeholder est à 70 % (pas 60 % : 60 % ne fait que 4,03:1) ; les tokens marqués « proposé » dans tokens.json sont des écarts à lister.
- README = guide de marque : ton, fondations, formulaires, couches, iconographie, et un tableau « anatomie des pages » (quels composants, dans quel ordre, sur chaque page : accueil, liste-produits, fiche-produit, panier, paiement, compte), repris de inventaire.md.
Commence par les fondations (couleurs clair et sombre, typographie, espacements 4/8, rayons, ombres, tailles, z-index, breakpoints) ; j'enverrai les groupes ensuite.
```

## 2. Groupe « Fondations et icônes » (2 composants)
```
Ajoute le groupe « Fondations et icônes » : Icon (Lucide, tailles 16 / 20 / 24, décoratif ou avec nom accessible, couleur héritée) et Logo (« Avion » en texte Clash Display, tons default et inverse, lien vers l'accueil, état focus).
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 3. Groupe « Actions » (3 composants)
```
Ajoute le groupe « Actions » :
- Button : type primary, secondary, white, opaque, ghost ; taille md (56 px) et sm (48 px) ; icône à droite en option ; états défaut, survol, focus (anneau 2 px Primary #4E4D93, décalé de 2 px ; blanc sur fond sombre), actif, désactivé et chargement (indicateur + désactivé). Pleine largeur en mobile pour l'action principale. Sur le fond sombre du hero, le bouton d'action est de type White (écart validé).
- IconButton : recherche, panier, compte, menu, fermer ; zone 44 × 44 px autour d'une icône inchangée ; nom accessible obligatoire ; tons default et inverse.
- TextLink : « Retirer », « Continuer mes achats », liens du pied de page ; tons default, brand, inverse ; survol souligné, focus visible.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 4. Groupe « Formulaires » (4 composants)
```
Ajoute le groupe « Formulaires » :
- TextInput : variantes primary et opaque (sur fond sombre) ; label visible au-dessus (masqué visuellement seulement dans la lettre d'information du pied de page, mais lu par les lecteurs d'écran), aide et message d'erreur ou de succès sous le champ ; placeholder Dark Primary à 70 % ; bordure Primary ; états défaut, survol, focus, rempli, désactivé, erreur, succès ; bons claviers (e-mail, téléphone, numérique pour code postal et carte) et attributs autocomplete. Exemple d'erreur : « Adresse e-mail invalide ».
- Checkbox : toute la ligne (case + libellé) cliquable, hauteur ≥ 44 px ; états défaut, survol, focus, cochée, désactivée, erreur ; compteur optionnel pour les filtres.
- Radio (nouveau, écart à lister) : choix unique pour le mode de livraison et le moyen de paiement, même gabarit que la case à cocher.
- Stepper : signes « − / + » en Dark Primary #2A254B (désactivé : 40 % d'opacité), boutons 44 × 44 px, bornes 1 et stock maximum, valeur annoncée aux lecteurs d'écran.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 5. Groupe « Cartes » (3 composants)
```
Ajoute le groupe « Cartes » :
- ProductCard : tailles sm (305 × 462) et lg (630 × 462), image, nom (Clash Display), prix ; hauteurs égales dans une grille, images au même ratio, toute la carte est un lien vers la fiche ; états défaut, survol (soulèvement de 4 px et ombre légère), focus, chargement (squelette au même ratio). Teste avec un nom long qui passe sur deux lignes sans casser la grille.
- FeatureCard : pictogramme 24 px, titre H4, texte en Body Medium 16 px ; avec ou sans fond Light Grey (propriété).
- CartItem : image, nom, description, prix, Stepper, total de ligne, lien « Retirer » ; contexte page ou drawer ; retrait en cours avec message annulable.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 6. Groupe « Retours et états » (5 composants)
```
Ajoute le groupe « Retours et états » (absent du Figma, corrections UX cochées) :
- Toast : tons info, success, error ; role="status" ; action « Annuler » ; disparition automatique après 6 s, en pause au survol et au focus ; exemples « Article retiré · Annuler » et « Ajouté au panier ».
- Skeleton : formes carte, ligne, image, au même ratio que l'élément remplacé ; pulsation d'opacité (version réduite : opacité fixe).
- EmptyState : titre, phrase courte, bouton. Deux exemples : panier vide (« Votre panier est vide » + « Découvrir la collection ») et liste sans résultat (« Aucun produit ne correspond » + « Effacer les filtres »).
- Badge : pastille de quantité sur l'icône panier, masquée à 0, « 99+ » au-delà.
- FilterChip : puce de filtre actif retirable (zone 44 px, clavier et toucher), annonce du retrait.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 7. Groupe « Couches » (3 composants)
```
Ajoute le groupe « Couches » (absent du Figma, corrections UX cochées) :
- Drawer : panneau latéral droit (plein écran en mobile) ou depuis le bas ; voile color.overlay ; titre, croix ; focus piégé à l'intérieur, fermeture par la croix, Échap et clic extérieur, retour du focus au déclencheur ; ouverture avec les tokens slow et enter / exit (niveau 2).
- MiniCart : s'ouvre après « Ajouter au panier » ; liste de CartItem, sous-total, « Voir le panier » (Button secondary) et « Commander » (Button primary) ; états plein, vide (EmptyState), chargement, article retiré avec annulation. Composé uniquement avec les composants du kit.
- FiltersSheet : panneau plein écran depuis le bas en mobile (interaction des boutons « Filtres » et « Tri » de la liste) ; groupes de Checkbox, tri, bouton « Voir les N résultats » (N mis à jour en direct), « Tout effacer », fermeture par la croix et Échap.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 8. Groupe « Navigation » (4 composants)
```
Ajoute le groupe « Navigation » (référence : captures/, gabarits desktop et mobile) :
- TopNav : desktop = recherche à gauche, logo « Avion » centré, panier avec Badge et compte à droite, rangée de catégories dessous (« Pots de plantes », « Céramiques », « Tables », « Chaises », « Vaisselle », « Couverts ») ; mobile IDENTIQUE sur toutes les pages : recherche, panier avec pastille de quantité, menu (ouvre un Drawer). Hauteur constante sur tous les gabarits (le Figma varie entre 80 et 134 px). Icônes à zone 44 × 44 px (IconButton).
- Breadcrumb : « Accueil › Catégorie › Produit » ; nav étiquetée ; page courante non cliquable ; sur mobile, troncature avec lien de retour.
- Banner : bandeau d'annonce fermable, focus visible.
- Footer : menu, catégories, entreprise, lettre d'information (EmailSignup ton dark), réseaux sociaux, copyright ; liens en Body Medium 16 px ; mobile en colonne.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 9. Groupe « Sections de page » (13 composants)
```
Ajoute le groupe « Sections de page » (chaque section montre desktop 1440, tablette 768 déduite et mobile 375) :
- HeroBlocks : titre, texte, bouton White sur fond sombre, image ; sans carrousel.
- Features : 4 FeatureCard (4, 2 puis 1 colonne).
- Listings : titre de section, grille de ProductCard (4, 2 puis 1 colonne), « Voir la collection » ; états chargement (Skeleton) et vide (EmptyState).
- EmailSignup : « Rejoignez notre lettre d'information », TextInput + Button, tons light et dark ; états erreur (« Adresse e-mail invalide »), succès (« Merci, vous êtes inscrit »), chargement.
- PageHeader : image + H1 (un seul H1 par page).
- Filters : groupes de Checkbox, compteur « 24 produits », puces de filtres actifs, « Tout effacer ».
- ProductDetails : pile verticale (Breadcrumb, titre, prix, description, dimensions, Stepper, « Ajouter au panier » en chargement puis ouverture du MiniCart), écarts 16 / 24 / 32, plus de position absolue.
- ShoppingBasket : en-tête de colonnes « Produit / Quantité / Total », CartItem, lien « Continuer mes achats » à côté du titre, sous-total, « Passer la commande » ; état vide.
- CheckoutProgress : 1 Livraison, 2 Paiement, 3 Confirmation ; étape faite, courante, à venir.
- OrderSummary : lignes, sous-total, livraison, total.
- AuthForm : connexion et création de compte ; erreurs sous les champs.
- AccountMenu : profil, commandes, adresses, déconnexion (onglets en desktop, liste en mobile).
- OrderList : numéro, date, statut, total, « Voir le détail » ; état vide.
Chaque composant : aperçu interactif, tous ses états, version mobile, ses animations du catalogue (tokens de mouvement, niveau, version réduite), README de règles.
Vérifie clair, sombre et mobile avant de me rendre la main.
```

## 10. Écrans absents du Figma : mini-panier, paiement, compte (à composer avec le kit)
```
Ces trois écrans n'existent pas dans le Figma (écart accepté par le pilote). Compose-les uniquement avec les composants du design system déjà créés, sans nouvelle couleur ni nouvelle police. Pour chacun : gabarits desktop 1440, tablette 768 (déduit) et mobile 375, tous les états, textes en français.

A. Mini-panier (drawer). Déclenché par « Ajouter au panier » sur la fiche produit et par l'icône panier de TopNav. Panneau à droite, plein écran en mobile. Titre « Votre panier (2) », deux CartItem (Vase Graystone 85 €, Vase blanc classique 95 €), sous-total 180 €, mention « Taxes et livraison calculées au paiement », Button secondary « Voir le panier », Button primary « Commander ». Fermeture : croix, Échap, clic extérieur ; focus piégé ; retour du focus au bouton d'origine. États : plein, vide (EmptyState « Découvrir la collection »), chargement, article retiré avec Toast « Article retiré · Annuler ».

B. Paiement (tunnel en 3 étapes numérotées avec CheckoutProgress : Livraison, Paiement, Confirmation). Desktop : formulaire à gauche, OrderSummary à droite ; mobile : OrderSummary repliable en haut, un champ par ligne. Étape 1 : contact (e-mail, téléphone), adresse (prénom, nom, adresse, complément, code postal, ville, pays) en TextInput avec label au-dessus, aide et erreur sous le champ, bons claviers et autocomplete ; mode de livraison en Radio (« Standard, 3 à 5 jours · gratuit », « Express, 24 h · 9 € »). Étape 2 : paiement par carte (numéro, nom, date d'expiration, code de sécurité, claviers numériques), case « Adresse de facturation identique », Button primary « Payer 189 € » avec état chargement. Étape 3 : confirmation, numéro de commande, résumé, Button « Continuer mes achats ». Erreurs : « Ce champ est obligatoire », « Code postal invalide », « Numéro de carte invalide » ; le focus va au premier champ en erreur, avec un résumé des erreurs en haut. Bouton « Retour » à chaque étape.

C. Compte. Deux états. Déconnecté : AuthForm avec choix « Connexion » / « Créer un compte » (e-mail, mot de passe, case « Se souvenir de moi », lien « Mot de passe oublié »). Connecté : AccountMenu (Profil, Commandes, Adresses, Déconnexion) et zone de contenu ; vue « Commandes » = OrderList (3 commandes de démonstration avec statuts « En préparation », « Expédiée », « Livrée ») et vue vide ; vue « Profil » = formulaire prénom, nom, e-mail, téléphone, avec succès « Vos informations ont été enregistrées ».

Ajoute ces trois écrans au tableau « anatomie des pages » et note-les dans « Écarts validés » (écrans non dessinés dans le Figma).
```

## 11. Contrôle (après le dernier groupe)
```
Relis tout le design system avec impeccable et ui-ux-pro-max : cohérence des espacements (échelle 4/8), hiérarchie, états manquants, contraste (aucune paire sous 4,5:1 pour du texte, 3:1 pour les composants), cibles tactiles ≥ 44 px, texte courant ≥ 16 px, animations (tokens utilisés, mode réduit, aucun mouvement automatique de plus de 5 secondes sans bouton pause), casse de phrase, textes en français, icônes uniquement Lucide (sauf logos de réseaux sociaux). Corrige dans les tokens et les composants, pas au cas par cas.
Rends un tableau de contrôle « Composant — CONFORME | À CORRIGER | ÉCART À VALIDER — règles concernées » pour les 37 composants, plus la liste complète des écarts au Figma.
Mets à jour l'index et le tableau « anatomie des pages ».
```

## 12. Export (dernier message)
```
Livre un zip ds-export contenant : version.json ({ version, date }), CHANGELOG.md, tokens.json (famille motion comprise), motion-catalogue.md, le CSS complet du design system (bundle.css), un fichier .jsx par composant, le README et les README de composants. Pas d'autre fichier.
```
Puis dézipper dans `design/ds-export/` du dépôt et lancer `/next-step`.

## Retouches pendant le projet
Toute retouche visuelle passe d'abord par Claude Design, puis on refait l'export et `/import-ds`. Le code et le design system restent ainsi alignés.
