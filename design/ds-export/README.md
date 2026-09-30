> **Export 1.0.0 du 2026-09-30.** Contenu : `tokens.json` (famille `motion` comprise), `bundle.css` (CSS complet : polices intégrées, tokens, classes de texte, composants), `motion-catalogue.md`, `CHANGELOG.md`, `version.json`, et pour chacun des 37 composants `components/<Composant>/<Composant>.jsx` + son `README.md`.
> Utilisation : charger `bundle.css`, puis importer les composants en modules React 18 (`import Button from './components/Button/Button.jsx'`). Les aides `formatPrice` (ProductCard), `cartLabel` (Badge), `iconNames` et `socialIconNames` (Icon) sont des exports nommés. Les mentions de `bundle.js` et `window.Avion` plus bas décrivent le design system en ligne ; les modules .jsx en sont la traduction exacte (rendu identique vérifié sur les 42 aperçus). Les images (groupe Images) et les SVG sources restent dans le design system en ligne.

Avion est une boutique en ligne de mobilier et de décoration. L'interface est calme, claire et précise : beaucoup de blanc, un violet profond, des angles droits, des photos de pièces posées dans la lumière. Ce guide dit comment écrire, composer et animer chaque écran de la boutique ; il fait foi pour tous les composants du système (espace de noms `Avion`).

## Ton

- Écrire en français, au « vous », en phrases courtes. On parle de la pièce, de la matière, du délai ; jamais de superlatifs gratuits ni d'urgence (« Dernière chance ! »).
- **Casse de phrase partout** : « Ajouter au panier », « Voir la collection », « Continuer mes achats », « Passer la commande ». Jamais de majuscules de style, ni de TOUT EN CAPITALES.
- Pas d'emoji, pas de point d'exclamation dans l'interface.
- Les boutons sont des verbes à l'infinitif (« Commander », « Retirer », « Effacer les filtres »). Les messages disent ce qui s'est passé puis ce qu'on peut faire : « Article retiré · Annuler », « Adresse e-mail invalide ».
- Prix en euros, espace insécable avant le symbole : « 250 € », « 1 250 € ». Pas de centimes quand ils valent zéro.
- Exemples de la marque : « Du mobilier pensé pour durer », « Livraison le lendemain — commandez avant 15 h et recevez votre commande le lendemain », « Fabriqué par de vrais artisans », « Emballages recyclés ».

### Contenus de démonstration

| Produit | Prix | Image |
| --- | --- | --- |
| Fauteuil Dandy | 250 € | `Images/img-01.png` |
| Canapé en velours Poplar | 980 € | `Images/img-04.jpg` (aucune photo de canapé en velours dans le pack) |
| Vase Graystone | 85 € | `Images/img-10.png` |
| Vase blanc classique | 95 € | `Images/img-06.png` |
| Table basse en chêne massif avec plateau amovible et rangement intégré | 420 € | `Images/img-03.png` — nom long : toujours tester le retour à la ligne avec lui |

Catégories : « Pots de plantes », « Céramiques », « Tables », « Chaises », « Vaisselle », « Couverts ». Ne jamais montrer quatre produits identiques dans une grille.

## Utiliser ce système

- Tout vient des tokens : aucune couleur, taille, marge, épaisseur de trait, longueur de ligne, durée ou courbe écrite en dur dans un composant (traits `size-border` / `size-border-strong`, focus `size-focus-ring` / `size-focus-offset`, lignes `size-measure-*`, colonnes `size-content-*`). Seules exceptions, faute de variable CSS possible : les seuils des container queries (valeurs de `breakpoint-*` recopiées) et le corps de texte de `body` (miroir de `body-medium`). Un besoin nouveau = un token proposé, noté dans « Écarts validés ».
- Les noms de `tokens.json` du pack (`color.text.default`) s'écrivent ici avec des tirets : `color-text-default`, soit `var(--color-text-default)` en CSS. Les styles de texte sont des classes : `.h1` … `.h6`, `.body-large`, `.body-medium`, `.body-small`, `.price`.
- Deux thèmes : **Clair** (celui du Figma, par défaut) et **Sombre (dérivé)**, construit avec les seules couleurs de la palette. Chaque token de texte nomme dans sa note les fonds sur lesquels il est lisible, dans les deux thèmes : ne jamais poser un texte sur un autre fond.
- Mise en page mobile d'abord : les styles s'écrivent pour 375 px puis s'élargissent en `min-width` à `breakpoint-md` (768), `breakpoint-lg` (1280) et `breakpoint-xl` (1440). Vérifier chaque composant à 375, 768, 1280 et 1440.
- Tous les composants se mettent en page selon la largeur de leur conteneur (container queries) : `bundle.css` fait de `body` le conteneur de référence, donc par défaut la largeur de l'écran. Un bloc plus étroit (colonne, cadre d'aperçu) peut devenir conteneur avec `container-type: inline-size`.
- Les sections de page (HeroBlocks, Features, Listings, Filters, ProductDetails, ShoppingBasket, AccountMenu, OrderList, EmailSignup…) se mettent en page selon **leur propre largeur** (container queries, mêmes seuils 768 et 1280 que `breakpoint-md` et `breakpoint-lg`) : elles restent justes dans une colonne, un aperçu ou une page plus étroite que l'écran.
- `components/bundle.css` fournit le socle : corps de texte, focus visible, `.av-visually-hidden`, `.av-container` (marges de page).
- Les composants sont des fonctions React 18 dans `components/bundle.js`, exposées sur `window.Avion` (`Avion.Icon`, `Avion.Logo`…). Charger React et ReactDOM 18, les tokens, `bundle.css` puis `bundle.js`. Chaque composant a son README : usage, variantes, états, accessibilité, animations, exemple.

## Fondations

### Couleur

L'identité tient en six couleurs, à ne pas modifier : Dark Primary `#2A254B`, Primary `#4E4D93`, Light Grey `#F9F9F9`, Border Grey `#EBE8F4`, Border Dark `#CAC6DA`, White `#FFFFFF`.

- Texte courant, titres, prix : `color-text-default` sur `color-surface-default` ou `color-surface-subtle`.
- Liens, navigation, sous-total : `color-text-brand`.
- Fonds sombres de marque (pied de page, bloc « histoire », bandeau) : `color-surface-inverse` avec `color-text-inverse` et, pour le focus, `color-focus-ring-inverse`. Ajouter la classe `av-on-inverse` au conteneur.
- Une seule action principale par zone : `color-action-primary` (libellé `color-text-inverse`), survol `color-action-primary-hover`.
- Boutons (composant `Avion.Button`) : Secondary `color-action-secondary` / `color-action-secondary-hover` avec `color-text-default` ; White `color-action-white` / `color-action-white-hover` avec `color-text-on-white` ; Opaque `color-action-opaque` / `color-action-opaque-hover` avec `color-text-on-opaque`. White et Opaque se posent uniquement sur `color-surface-inverse` ; sur le hero, l'action principale est le bouton White, pas l'Opaque.
- Désactivé : `opacity-disabled` (0,4) sur Button et IconButton, comme le kit Figma.
- Bordures : `color-border-default` et `color-border-strong` sont décoratives (1,21:1 et 1,67:1) ; la limite d'un champ, d'une case ou d'un radio est toujours `color-border-input` (7,48:1).
- Erreur et succès : `color-feedback-error` et `color-feedback-success`, toujours accompagnés d'une icône (`circle-alert`, `check`) et d'un texte, jamais de la couleur seule.
- Voile des couches : `color-overlay`.

**Paires interdites pour du texte** (contrastes.md et calcul du thème sombre) : `color-text-disabled` (2,33:1, réservé aux contrôles inactifs) ; `color-border-default` et `color-border-strong` comme couleur de texte ; en sombre, `color-text-placeholder` et `color-feedback-error` sur `color-surface-subtle` (4,07:1 et 4,38:1) — en thème sombre, champs et messages d'erreur se posent sur `color-surface-default`. `color-text-brand` sur `color-border-strong` (4,49:1) est aussi exclu.

### Typographie

- Titres en **Red Hat Display**, texte en **Manrope**, graisse 400 seule (celle du Figma) : la hiérarchie vient de la taille et de l'air, pas de la graisse.
- Ces deux polices Google Fonts (licence OFL) remplacent Clash Display et Satoshi (Fontshare), absentes du pack : Red Hat Display pour son grand œil, son espacement serré et ses fins de traits horizontales ; Manrope pour son dessin géométrique-grotesque et sa chasse proches de Satoshi. Les fichiers sont dans `fonts/` (latin, 400) et déclarés dans `tokens.json` (`type.fonts`) : aucun appel réseau. Chiffres tabulaires (`tnum`) disponibles dans les deux pour les prix.
- Échelle : `h1` 36, `h2` 32, `h3` 24, `h4` 20, `h5` 16, `h6` 14 (interligne 1,4) ; `body-large` 18, `body-medium` 16, `body-small` 14 (interligne 1,5) ; `price` 24.
- Un seul `h1` par page. Trois tailles de titre au plus par écran (le texte courant, le prix et les mentions `body-small` en plus) : vérifié sur les trois écrans et les pages composées.
- Texte courant ≥ 16 px (`body-medium`) : pied de page, filtres, cartes avantages, descriptions. `body-small` (14 px) est réservé aux mentions secondaires, liste fermée : copyright, aide sous un champ, note « Taxes et livraison calculées au paiement », étiquettes de colonnes et de dimensions, chiffre de la pastille Badge. Tout texte interactif ou porteur d'une décision (lien, fil d'Ariane, bandeau, message d'erreur ou de succès, aide d'un choix de livraison, stock, étape du tunnel) est en `body-medium`.
- Lignes de 45 à 75 caractères : borner les paragraphes à `size-measure-lg` (64ch) ; `size-measure-md` (48ch) pour un chapeau, `size-measure-sm` (40ch) pour un message court.
- En mobile, le titre du hero et les titres de section descendent d'un cran (`h2` → `h3`), sans nouvelle taille.

### Espacement et mise en page

- Échelle 4/8 : `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 24, `space-6` 32, `space-7` 48, `space-8` 64, `space-9` 96. Les écarts du Figma à 14 ou 15 px passent à 16 ; aucune autre valeur.
- Plus d'air entre sections qu'à l'intérieur : `space-9` entre sections en desktop, `space-8` en mobile ; `space-4` / `space-5` / `space-6` dans une pile (fiche produit : titre → prix 16, prix → description 24, dimensions → actions 32).
- Marges de page : `space-5` (24 px) en mobile, `space-6` en 768, `space-8` + `space-4` (80 px, comme le Figma) à partir de 1280 ; contenu limité à `size-container`.
- Grilles : 4 colonnes à partir de 1280, 2 colonnes de 768 à 1279, 1 ou 2 colonnes en mobile selon le gabarit ; gouttière `space-4` en mobile, `space-5` au-delà. Cartes à hauteurs égales, images au même ratio, actions alignées en bas.
- Tablette 768 (sans maquette) : grilles 4 → 2 colonnes, en-tête desktop compact, filtres dans un panneau (FiltersSheet).

### Rayons, ombres, tailles, couches

- Angles droits partout (`radius-none`). `radius-pill` sert uniquement à la pastille Badge et aux puces FilterChip.
- Pas d'ombre au repos (`shadow-none`). `shadow-card-hover` au survol d'une ProductCard, `shadow-overlay` pour Drawer, MiniCart et Toast. Jamais d'ombre lourde ni de dégradé.
- Zone cliquable ≥ `size-target-min` (44 px) pour tout élément interactif, y compris les icônes de l'en-tête (icône inchangée, zone agrandie). Boutons : `size-button-md` (56 px) ou `size-button-sm` (48 px) ; les champs prennent la hauteur md.
- Ordre des couches : `z-base` < `z-sticky` (en-tête) < `z-banner` < `z-overlay` (voile) < `z-drawer` < `z-toast`.

### États

Chaque élément interactif a défaut, survol, focus visible, actif et désactivé ; erreur et chargement quand c'est pertinent ; toute liste a son état vide.

- **Focus** : contour 2 px `color-focus-ring`, décalé de 2 px (`outline-offset`), sur tous les éléments cliquables ; `color-focus-ring-inverse` sur fond sombre. Jamais `outline: none` sans remplacement.
- **Désactivé** : `color-text-disabled` pour le texte et les signes (40 %), curseur par défaut, `aria-disabled` ou `disabled`.
- **Chargement** : bouton désactivé + indicateur `loader-circle`, libellé conservé ou remplacé par l'action en cours (« Ajout en cours »). La rotation dure au plus `motion-duration-loop` (4,8 s) puis s'arrête : le libellé porte l'état.
- **Appui** : chaque élément interactif a le sien. Boutons : échelle `motion-scale-press` ; liens et zones de navigation (fil d'Ariane, catégories, onglets, étapes, bouton de récapitulatif) : `color-text-default` + soulignement `size-border-strong` ; boutons carrés sur fond sombre (Toast, logos sociaux) : `color-action-primary-hover` ; carte produit : le soulèvement retombe.

### Images

Photos de pièces sur fond uni ou en situation, jamais recadrées différemment dans une même grille : ratio commun par gabarit, `object-fit: cover`. Toujours un texte alternatif qui nomme la pièce (« Fauteuil Dandy, coque noire et pieds en chêne »). Les images du groupe **Images** sont des photos de démonstration, à remplacer par les vraies photos produit.

## Mouvement

Niveau **sobre** : durées telles quelles, courbes `motion-ease-*`, distances `motion-distance-*`. Aucune apparition au défilement, aucun carrousel automatique (le hero est fixe), aucune parallaxe, aucun défilement détourné. Chaque composant applique sa ligne du catalogue et sa version `prefers-reduced-motion: reduce` : niveau 1 retiré (`motion-duration-reduced`), niveau 2 en fondu `motion-duration-fast` sans déplacement, niveau 3 gardé. Le détail et l'aperçu animé : section « Mouvement » et carte **Mouvement** (groupe Fondations).

**Aucun mouvement automatique de plus de 5 s.** Les seules boucles (indicateur de chargement, pulsation du Skeleton) sont jouées une fois sur `motion-duration-loop` (4,8 s) puis s'arrêtent ; pas de carrousel, pas de vidéo en lecture automatique. Le Toast n'est pas une animation : son délai `motion-duration-toast` (6 s) se met en pause au survol et au focus, et le bouton « Fermer » reste présent.

## Formulaires

- Un label visible au-dessus de chaque champ. Seule exception : la lettre d'information du pied de page, où le label est masqué visuellement (`.av-visually-hidden`) mais lu par les lecteurs d'écran.
- Placeholder en `color-text-placeholder` (Dark Primary à 70 %), comme exemple de format seulement, jamais à la place du label.
- Aide sous le champ en `body-small` ; erreur et succès sous le champ en `body-medium`, `color-feedback-error` avec icône, reliée par `aria-describedby`. Exemples : « Adresse e-mail invalide », « Ce champ est obligatoire », « Code postal invalide », « Numéro de carte invalide ».
- Bons claviers et autocomplete : `type="email"`, `type="tel"`, `inputmode="numeric"` pour code postal et carte, `autocomplete` renseigné (given-name, postal-code, cc-number…).
- En mobile, un champ par ligne. Dans le tunnel, étapes numérotées (1 Livraison, 2 Paiement, 3 Confirmation). À la soumission en erreur : résumé des erreurs en haut, focus sur le premier champ en erreur.
- Cases à cocher et radios : toute la ligne (case + libellé) est cliquable, hauteur ≥ 44 px, bordure `color-border-input`.
- Composants : `Avion.TextInput` (primary, ou opaque sur `color-surface-inverse` avec `color-border-input-inverse`, `color-text-placeholder-opaque` et les messages `color-feedback-*-inverse`), `Avion.Checkbox`, `Avion.Radio` (case et rond `size-control-box`, 16 px comme le Figma), `Avion.Stepper` (quantité bornée de 1 au stock, signes `color-text-default`).
- Grouper cases et radios dans un `fieldset` avec `legend`. Radio présélectionne l'option la moins chère dans le tunnel.
- Champs obligatoires par défaut ; seuls les facultatifs sont marqués « (facultatif) ». Valider à la sortie du champ ou à l'envoi, jamais à chaque frappe.

## Couches

Drawer, MiniCart, FiltersSheet et menu mobile suivent les mêmes règles, portées par `Avion.Drawer` : voile `color-overlay`, titre, croix « Fermer » ; focus piégé à l'intérieur ; fermeture par la croix, Échap et clic sur le voile ; retour du focus au déclencheur ; défilement de la page bloqué. Drawer à droite (`size-drawer`, 480 px) en desktop, plein écran en mobile ; FiltersSheet plein écran depuis le bas en mobile, à droite dès 768 px. Ouverture `motion-duration-slow` avec `motion-ease-enter`, fermeture avec `motion-ease-exit`.

- `Avion.MiniCart` s'ouvre à la fin de « Ajouter au panier » (après l'état de chargement du bouton) et depuis l'icône panier ; il ne contient que des composants du kit (CartItem, Button, EmptyState, Skeleton).
- Dans une couche ouverte, le message « … retiré · Annuler » s'affiche **dans** le panneau (focus piégé) ; sur la page panier, c'est le Toast.
- Le Toast (`role="status"`) disparaît après `motion-duration-toast` (6 s), en pause au survol et au focus, et propose « Annuler » quand l'action est réversible.

## Retours et états

- Chaque action donne un retour : bouton en chargement, puis `Avion.Toast` (« Ajouté au panier », « Article retiré · Annuler ») et, pour l'ajout, ouverture du MiniCart.
- Une seule zone Toast par page ; `motion-duration-toast` (6 s) d'affichage, en pause au survol et au focus ; « Annuler » pour tout retrait.
- Toute liste a son état de chargement (`Avion.Skeleton` au ratio des images, 4:5 pour les cartes produit) et son état vide (`Avion.EmptyState` : « Votre panier est vide », « Aucun produit ne correspond »).
- Le panier de l'en-tête porte `Avion.Badge` (masqué à 0, « 99+ ») et son nombre dans le nom du bouton (`Avion.cartLabel`).
- Les filtres actifs sont des `Avion.FilterChip` retirables, suivis de « Tout effacer » ; chaque retrait est annoncé et le focus passe à la puce suivante.

## Iconographie

- Toujours passer par le composant `Avion.Icon` (SVG en ligne, couleur héritée), jamais par un `<img>` d'icône.
- **Lucide uniquement** (groupe **Icones**), trait `currentColor`, 24 px par défaut (`size-icon-lg`), 20 px (`size-icon-md`) et 16 px (`size-icon-sm`) pour les petites tailles ; trait fin (`stroke-width` 1,5) pour rester proche du dessin Carbon du Figma. La couleur suit le texte (`color-text-default`, `color-text-inverse` sur fond sombre).
- Correspondance Carbon → Lucide : livraison `truck`, validé `circle-check`, paiement `credit-card`, recherche `search`, panier `shopping-cart`, compte `circle-user`, menu `menu`, fermer `x`, déplier `chevron-down`, matières `sprout`. Ajouts : retirer `trash-2`, quantité `minus` / `plus`, fil d'Ariane `chevron-right`, filtres `sliders-horizontal`, chargement `loader-circle`, succès `check`, erreur `circle-alert`, retour `arrow-left`, paiement sécurisé `lock`, adresse `map-pin`, commandes `package`.
- Une icône seule est décorative (`aria-hidden="true"`) quand un texte l'accompagne ; seule dans un bouton, le bouton porte le nom accessible (« Rechercher », « Panier, 2 articles »).
- **Réseaux sociaux** : les logos de marque n'existent pas dans Lucide ; le pied de page garde les SVG Carbon fournis (groupe **Reseaux**), tels quels, encre `#2A254B` d'origine.
- Le groupe **Carbon** conserve les pictos du Figma comme référence de dessin ; ne pas les utiliser dans l'interface.
- Pas d'emoji, pas d'icônes de sources mélangées.

## Logo

« Avion » est un mot, sans fichier logo : il se compose en texte Red Hat Display 400 (remplaçant de Clash Display), centré dans l'en-tête desktop, à gauche en mobile, en `color-text-default` (blanc `color-text-inverse` sur fond sombre). Ne jamais le redessiner, le vectoriser ou lui ajouter un symbole. C'est un lien vers l'accueil, avec son focus visible : toujours le composant `Avion.Logo` (tons `default` et `inverse`).

## Contrôle

Revue du 30/09/2026 sur les 37 composants, rendus en clair et en sombre à 1280 et 375 (sections à 1440, 768 et 375), avec mesure automatique des cibles, des tailles de texte, des contrastes texte et composants, des animations encore en cours après 5 s et des icônes. Les corrections sont faites dans les tokens et le socle (`bundle.css`, `bundle.js`), jamais composant par composant.

Règles : **R1** espacements 4/8 et tokens · **R2** hiérarchie · **R3** états (défaut, survol, focus, appui, désactivé, erreur, chargement, vide) · **R4** texte ≥ 4,5:1 · **R5** composants ≥ 3:1 · **R6** cibles ≥ 44 px · **R7** texte courant ≥ 16 px · **R8** animations (tokens, mode réduit, rien d'automatique au-delà de 5 s sans pause) · **R9** casse de phrase · **R10** français · **R11** Lucide seulement (logos sociaux exceptés).

Corrections systémiques de cette revue :

- **Tokens ajoutés** : `size-border`, `size-border-strong`, `size-focus-ring`, `size-focus-offset`, `size-measure-sm` / `-md` / `-lg`, `size-content-narrow`, `size-content-form`, `size-cart-thumb-lg`, `motion-duration-loop` (4,8 s), `motion-duration-toast` (6 s), `motion-scale-press` (0,98), `opacity-pulse` (0,4). Plus aucun trait, longueur de ligne, largeur, échelle ou délai écrit en dur dans `bundle.css`, `bundle.js` ni dans les styles des aperçus (R1, R8).
- **Boucles bornées** : rotation du chargement et pulsation du Skeleton jouées une fois sur `motion-duration-loop`, puis arrêt ; plus aucune animation `infinite`, y compris sur la page Mouvement (R8).
- **Texte ≥ 16 px** : `body-small` limité à une liste fermée (voir Typographie) ; messages d'erreur et de succès, aide d'un choix (Radio, Checkbox), stock, fil d'Ariane, bandeau, étape du tunnel passent en `body-medium` (R7).
- **Appui** : état commun ajouté aux liens et zones de navigation qui n'en avaient pas ; survol ajouté au bouton de récapitulatif (R3).
- **Cibles** : IconButton ne rétrécit plus dans une ligne flexible (`flex: none`, bouton Fermer du Drawer 42 → 44 px) ; onglets du compte ≥ 44 px de large (R6).
- **Casse** : « Trier par : pertinence » (valeur en minuscule après les deux-points) (R9).

| Composant | Statut | Règles concernées |
| --- | --- | --- |
| Icon | CONFORME | R8 corrigé (rotation bornée) · R11 Lucide 1.49, trait 1,5 |
| Logo | CONFORME | Red Hat Display 400 fournie dans `fonts/` en remplacement de Clash Display (écart validé) |
| Button | ÉCART VALIDÉ | R5 : fond Secondary 1,05:1 sur blanc, Ghost sans fond, Opaque 2,2:1 sur fond sombre (dessin du kit) ; le libellé ≥ 4,5:1 identifie le bouton (WCAG 1.4.11 ne demande pas de contour) · R8 corrigé (échelle et chargement en tokens) |
| IconButton | CONFORME | R6 corrigé (`flex: none`) |
| TextLink | ÉCART VALIDÉ | R6 : lien dans une phrase à la hauteur de la ligne (exception « en ligne » de WCAG 2.5.8) ; seul, 44 px |
| TextInput | CONFORME | R7 corrigé (erreur, succès 16 px ; aide 14 px, mention secondaire) · R4 placeholder 5,48:1 / opaque 4,55:1 |
| Checkbox | CONFORME | R3 appui ajouté · R7 corrigé (erreur 16 px) |
| Radio | CONFORME | R3 appui ajouté · R7 corrigé (aide 16 px) |
| Stepper | ÉCART VALIDÉ | R5 : fond `color-surface-subtle` 1,05:1 (kit) ; les signes à 14,34:1 identifient les boutons |
| Toast | CONFORME | R8 corrigé (délai `motion-duration-toast`, pause au survol et au focus, Fermer) · R3 appui ajouté |
| Skeleton | CONFORME | R8 corrigé (3 pulsations en 4,8 s puis arrêt ; réduit : fixe) |
| EmptyState | CONFORME | R1 corrigé (`size-measure-md`) |
| Badge | ÉCART VALIDÉ | R7 : chiffre 14 px dans une pastille de 20 px ; le nombre est aussi dans le nom du bouton panier |
| FilterChip | CONFORME | — |
| CartItem | CONFORME | R7 corrigé (stock 16 px) · R1 corrigé (`size-cart-thumb-lg`) · R3 appui du nom |
| Drawer | CONFORME | R6 corrigé (Fermer 44 × 44) |
| MiniCart | CONFORME | hérite des corrections Drawer, Skeleton, Toast |
| FiltersSheet | CONFORME | — |
| TopNav | CONFORME | R3 appui des catégories |
| Breadcrumb | CONFORME | R7 corrigé (14 → 16 px) · R3 appui |
| Banner | CONFORME | R7 corrigé (14 → 16 px) |
| Footer | CONFORME | R3 appui des logos sociaux · R11 logos sociaux Carbon (exception) · copyright 14 px, mention secondaire |
| EmailSignup | CONFORME | R1 corrigé (`size-content-form`, `size-measure-lg`) |
| ProductCard | CONFORME | R3 appui ajouté · R8 Skeleton borné |
| FeatureCard | CONFORME | — |
| HeroBlocks | CONFORME | R1 corrigé (`size-measure-md`) · pas de carrousel |
| Features | CONFORME | — |
| Listings | ÉCART VALIDÉ | R2 : 1 colonne à 375 px (demande) au lieu de 2 au Figma ; `mobileColumns: 2` disponible |
| PageHeader | CONFORME | R4 : texte sur photo sous voile `color-scrim`, ≥ 4,55:1 sur l'image la plus claire |
| Filters | CONFORME | R9 corrigé (« Trier par : pertinence ») |
| ProductDetails | CONFORME | R7 corrigé (stock 16 px) · R1 corrigé (`size-content-narrow`) |
| ShoppingBasket | CONFORME | en-têtes de colonnes 14 px, masqués aux lecteurs d'écran |
| CheckoutProgress | CONFORME | R7 corrigé (numéros et « Étape 2 sur 3 » 16 px) · R3 appui |
| OrderSummary | CONFORME | R3 corrigé (survol et appui du bouton repliable) |
| AuthForm | CONFORME | R3 appui des onglets · R1 corrigé (`size-content-narrow`) |
| AccountMenu | CONFORME | R6 corrigé (onglet « Profil » 40 → 44 px de large) |
| OrderList | CONFORME | — |

Bilan : 31 conformes, 6 écarts validés par le pilote le 30/09/2026, aucun à corriger (police du Logo remplacée). Contrastes de texte : aucune paire sous 4,5:1 hors états désactivés (exemptés). Français et casse de phrase : 277 textes affichés relus. Icônes : aucune image d'icône ni SVG hors `Avion.Icon` et logos sociaux.

## Anatomie des pages

| Page | Desktop 1440 | Mobile 390 | Composants, dans l'ordre | Contrôle |
| --- | --- | --- | --- | --- |
| Accueil (v2) | 114:5362 | 114:5761 | Banner, TopNav, HeroBlocks, Features, Listings, EmailSignup, Footer | conforme ; écart validé : grille Listings 1 colonne en mobile |
| Liste produits (v3) | 45:684 | 109:1661 | TopNav, PageHeader, Filters (FiltersSheet en mobile et en 768), FilterChip, Listings, EmailSignup, Footer | conforme ; « Trier par : pertinence » ; écart validé : grille mobile |
| Fiche produit (v2) | 11:123 | 114:6398 | Banner, TopNav, Breadcrumb, ProductDetails, Features, Listings, EmailSignup, Footer | conforme ; fil d'Ariane et stock à 16 px |
| Panier (v2) | 119:3539 | 119:3664 | TopNav, ShoppingBasket (CartItem, Stepper, OrderSummary), Footer ; EmptyState si vide | conforme ; écart validé : fond du Stepper et du bouton Secondary |
| Paiement (écran B, non dessiné) | formulaire à gauche, OrderSummary à droite | OrderSummary repliable en haut, un champ par ligne | TopNav, CheckoutProgress, résumé des erreurs, TextInput, Radio (livraison), Checkbox (facturation), Button « Payer 189 € », OrderSummary, Footer ; étape 3 : confirmation, numéro de commande, OrderSummary, « Continuer mes achats » | conforme ; étapes et messages à 16 px |
| Compte (écran C, non dessiné) | AccountMenu en onglets + contenu | AccountMenu en liste + contenu | TopNav, AuthForm (déconnecté) ou AccountMenu + OrderList / formulaire Profil / Adresses (connecté), Footer | conforme ; onglets ≥ 44 px, appui ajouté |
| Mini-panier (écran A, non dessiné) | drawer à droite, 480 px | plein écran | MiniCart (Drawer, CartItem, Stepper, Toast, EmptyState, Skeleton, Button), ouvert par « Ajouter au panier » (ProductDetails) et par l'icône panier (TopNav) | conforme ; bouton Fermer 44 px, Skeleton borné à 4,8 s |
| Tablette 768 | déduite | — | grilles 4 → 2 colonnes, en-tête desktop compact, filtres en panneau, récapitulatif de paiement repliable en haut | vérifiée à 768 (sections et écrans) |

## Écarts validés

Toutes les lignes ont été validées par le pilote le 30/09/2026. Chaque ligne change quelque chose par rapport au Figma (fichier 3OoNGDC710p5mgPCe6IkmN) ; elles viennent des 24 corrections UX cochées par le pilote ou des tokens « proposé » de `tokens.json`.

| Écart | Figma | Design system | Origine |
| --- | --- | --- | --- |
| Placeholder | Dark Primary à 20 % (1,5:1) | `color-text-placeholder` #6A6681, 70 % (5,48:1) ; 60 % ne faisait que 4,03:1 | correction UX + calcul |
| Survol Primary | non défini | `color-action-primary-hover` #1E1A38 ; valeur sombre #EBE8F4 dérivée ici | token proposé |
| Bordure des champs | Border Grey | `color-border-input` #4E4D93 (7,48:1) | token proposé |
| Erreur et succès | absents | `color-feedback-error` #B3261E, `color-feedback-success` #1E6B3A (sombre #F2B8B5, #A8DAB5) | tokens proposés |
| Bouton Opaque | couleur non nommée | `color-action-opaque` #6B679F (estimé sur capture) + `color-text-on-opaque` blanc dans les deux thèmes | contrastes.md + ajout |
| Thème sombre | absent | dérivé des seules couleurs de la palette | tokens.json |
| Polices | Clash Display (titres), Satoshi (texte), Fontshare, absentes du pack | Red Hat Display 400 et Manrope 400 (Google Fonts, OFL), fichiers dans `fonts/` ; métriques vérifiées sur les 42 aperçus, sans débordement | validé par le pilote |
| Prix | 24 px sans style | style `price` 24 px Manrope | token proposé |
| Interligne des titres | 150 % | 1,4 (tokens.json) | validé par le pilote |
| Pilule | aucun arrondi | `radius-pill` pour Badge et FilterChip | token proposé |
| Ombres | aucune | `shadow-card-hover`, `shadow-overlay` | tokens proposés |
| Espacements | 12 / 14 / 15 px | échelle 4/8, 14 et 15 → 16 | correction UX |
| Focus | invisible | contour 2 px Primary décalé de 2 px, blanc sur fond sombre | correction UX |
| Texte courant | 14 px (pied de page, filtres, avantages) | `body-medium` 16 px | correction UX |
| Label des champs | absent | label visible au-dessus (masqué visuellement dans la lettre d'information) | correction UX |
| Stepper | signes à 1,2:1, cibles minuscules | signes `color-text-default`, boutons 44 × 44, bornes 1 et stock max | correction UX |
| Cibles | icônes 16 px sans zone, cases ≈ 16 px | zone 44 × 44 autour des icônes, ligne de case entière cliquable | correction UX |
| Icônes | Carbon | Lucide ; logos sociaux gardés en SVG Carbon (fichiers facebook et linkedin, inversés dans le pack, renommés d'après leur dessin) | icons-map.md |
| Bouton du hero | Opaque sur fond sombre | White | correction UX |
| Textes | anglais, livres sterling, produits identiques | français, euros « 250 € », noms et prix variés, un nom long | correction UX |
| Parcours | pas de suppression, de sortie, de repère | « Retirer » annulable, « Continuer mes achats », fil d'Ariane, compteur et puces de filtres, « Tout effacer » | corrections UX |
| En-tête | hauteur 80 à 134 px, panier absent en mobile sur le panier | hauteur constante, même en-tête mobile partout (recherche, panier avec pastille, menu) | correction UX |
| Retours et états | aucun | chargement du bouton, MiniCart, panier vide, liste sans résultat, squelettes, messages de la lettre d'information | corrections UX |
| Écrans non dessinés | absents | trois écrans composés uniquement avec le kit, sans nouvelle couleur ni police : **A. mini-panier** (MiniCartScreen), **B. paiement** en 3 étapes (CheckoutScreen), **C. compte** déconnecté et connecté (AccountScreen), chacun en 1440, 768 et 375 | écart accepté par le pilote |
| Annulation dans le mini-panier | — | Toast « Article retiré · Annuler » affiché dans le panneau (le focus y est piégé) | accessibilité |
| Composants nouveaux | absents | IconButton, TextLink, Radio, Toast, Skeleton, EmptyState, Badge, FilterChip, Drawer, MiniCart, FiltersSheet, Breadcrumb, CheckoutProgress, OrderSummary, AuthForm, AccountMenu, OrderList | inventaire.md |
| Tailles d'icône | 16 px seulement | tokens `size-icon-sm` 16, `size-icon-md` 20, `size-icon-lg` 24 | ajout (Icon) |
| Survol Secondary en sombre | — | `color-action-secondary-hover` #6B679F en sombre (`color-surface-hover` y vaut le fond du bouton) | ajout (Button) |
| Bouton White | blanc sur fond sombre | tokens `color-action-white`, `-hover`, `color-text-on-white` ; en sombre, où le fond inversé devient blanc, le bouton s'inverse en Dark Primary | ajout (Button) |
| Survol Opaque | plus clair (libellé blanc sous 4,5:1) | `color-action-opaque-hover` #5B5897, plus foncé (6,39:1) | ajout (Button) |
| Désactivé | bouton estompé | token `opacity-disabled` 0,4 | ajout (Button, IconButton, Stepper) |
| Chargement | absent | indicateur `loader-circle` + `aria-busy`, bouton inactif | correction UX |
| Liens et actions discrètes | textes sans état | TextLink : survol souligné, focus, « Retirer » en bouton d'aspect lien | correction UX |
| Placeholder opaque | blanc à ≈ 70 % sur #6B679F (3,44:1) | `color-text-placeholder-opaque` #F0F0F5, 90 % (4,55:1) | ajout (TextInput) |
| Champ sur fond sombre | sans bordure | `color-border-input-inverse` #CAC6DA (8,6:1 ; 3,1:1 contre le champ opaque) | ajout (TextInput) |
| Messages sur fond sombre | absents | `color-feedback-error-inverse`, `color-feedback-success-inverse` (lettre d'information) | ajout (TextInput) |
| Radio | absent du kit | nouveau composant, gabarit de la case à cocher, rond `radius-pill` | inventaire.md |
| Taille de case | 16 px, zone ≈ 16 px | `size-control-box` 16 px gardé, ligne entière cliquable ≥ 44 px | correction UX |
| Stepper | fond Light Grey, signes 1,2:1 | fond `color-surface-subtle` gardé, signes 14,34:1, survol `color-action-secondary-hover`, bornes en `aria-disabled` | correction UX |
| Skeleton en mode réduit | — | opacité fixe (catalogue : pulsation gardée) | demande du pilote |
| Boucles | — | chargement et Skeleton joués une fois sur `motion-duration-loop` (4,8 s) puis arrêt ; aucune boucle infinie | contrôle (R8) |
| Tokens de trait et de mesure | 1 px, 2 px, largeurs libres | `size-border`, `size-border-strong`, `size-focus-ring`, `size-focus-offset`, `size-measure-*`, `size-content-*`, `size-cart-thumb-lg`, `motion-scale-press`, `opacity-pulse` | contrôle (R1) |
| Textes d'information | 14 px (bandeau) | bandeau, fil d'Ariane, messages sous les champs, aides de choix, stock, étapes en `body-medium` 16 px ; `body-small` en liste fermée | contrôle (R7) |
| Appui | non dessiné | état d'appui commun (texte `color-text-default` + trait `size-border-strong`, ou fond `color-action-primary-hover` sur fond sombre) | contrôle (R3) |
| Toast | absent | `motion-duration-toast` (6 s), pause au survol et au focus, « Annuler », fond `color-surface-inverse` (erreur : `color-feedback-error`) | correction UX |
| Badge | absent | pastille `radius-pill` 20 px, « 99+ », nombre porté par le nom du bouton | correction UX |
| Tailles des couches | — | tokens `size-drawer` 480 px, `size-cart-thumb` 96 px (image 4:5) | ajout (Drawer, CartItem) |
| Hauteur de l'en-tête | 80 à 134 px selon la page | constante : `size-header-bar` 72 px + `size-header-nav` 56 px (128 px desktop, 72 px mobile) | correction UX |
| Catégories | 7 en anglais (Crockery et Tableware en double) | 6 en français : Pots de plantes, Céramiques, Tables, Chaises, Vaisselle, Couverts | correction UX (contenus) |
| En-tête mobile | variable, panier absent sur la page panier | identique partout ; catégories dans un Drawer à gauche | correction UX |
| Fil d'Ariane | absent | Breadcrumb au-dessus du titre, lien de retour en mobile | correction UX |
| Pied de page | liens 14 px, copyright « Avion LTD » | liens 16 px, « © 2026 Avion », logos sociaux nommés | correction UX |
| Lettre d'information | fond photo (accueil), pas de retour | tons light et dark, messages sous le champ ; sans fond photo sur l'accueil (validé par le pilote) | correction UX |
| Hero | carte blanche sur photo (v2), bouton Opaque dans la version sombre | variante `dark` par défaut (bloc Dark Primary + bouton White) ; variante `card` pour la v2 du Figma | correction UX |
| Filtres desktop | menus déroulants (Category, Product type, Price, Brand) sans retour | même barre ; chaque entrée ouvre le FiltersSheet sur son groupe (cases à cocher, compteurs, « Voir les N résultats ») ; puces actives et « Tout effacer » sous la barre | correction UX |
| Texte sur photo | blanc sans voile | voile `color-scrim` (64 %) et `color-text-on-image` : ≥ 4,55:1 sur toute image | ajout (PageHeader) |
| Fiche produit | blocs posés à la main, « Save to favorites » en blanc sur gris | pile verticale 16 / 24 / 32, fil d'Ariane, « Enregistrer dans mes favoris » en Ghost (White est réservé aux fonds sombres) | correction UX |
| Grille mobile | 2 colonnes à 390 px | 1 colonne (demande) ; `mobileColumns: 2` pour revenir au Figma | validé par le pilote |
| Limite des boutons Secondary, Ghost, Opaque et du Stepper | fond Light Grey (1,05:1), sans fond, ou Opaque sur sombre (2,2:1) | dessin du kit gardé ; l'identification repose sur le libellé ou les signes (≥ 4,5:1) ; option : contour `color-border-input` | validé par le pilote (contrôle R5) |
| Chiffre du Badge | — | 14 px dans la pastille de 20 px, nombre répété dans le nom du bouton | validé par le pilote (contrôle R7) |
| Liens dans une phrase | — | cible à la hauteur de la ligne (exception « en ligne ») ; tout lien seul fait 44 px | validé par le pilote (contrôle R6) |
| Mouvement | aucune annotation | tokens `motion-*` du catalogue sobre, plus `motion-duration-reduced` (0.01ms) | catalogue.md |
| Tablette 768 | pas de maquette | déduite : grilles 2 colonnes, filtres en panneau | brief |

## Non repris

- Polices d'origine : Clash Display et Satoshi (Fontshare) ne sont pas dans le pack ; remplacées par Red Hat Display et Manrope (voir Typographie et Écarts validés). Pour revenir aux polices d'origine, déposer leurs `.woff2` dans `fonts/` et changer `type.fonts` et `type.families` : aucun composant ne nomme une police.
