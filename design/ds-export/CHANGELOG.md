# Changelog

Toutes les évolutions du design system « Avion — boutique-demo ». Format inspiré de Keep a Changelog ; versions sémantiques.

## [1.0.0] — 2026-09-30

Première version livrée, construite depuis le pack boutique-demo (Figma 3OoNGDC710p5mgPCe6IkmN) et validée par le pilote.

### Ajouté

- **Fondations** : couleurs en thème clair (Figma) et sombre (dérivé de la palette), typographie h1–h6, body-large/medium/small, price, espacements 4/8 (`space-1` à `space-9`), rayons, ombres, tailles, z-index, breakpoints 375 / 768 / 1280 / 1440, opacités.
- **Mouvement** : famille `motion` du niveau sobre (durées, courbes, distances, échelle), `motion-duration-reduced`, `motion-duration-loop`, `motion-duration-toast` ; catalogue avec version réduite par composant (`motion-catalogue.md`).
- **37 composants** : Icon, Logo · Button, IconButton, TextLink · TextInput, Checkbox, Radio, Stepper · Toast, Skeleton, EmptyState, Badge, FilterChip · CartItem · Drawer, MiniCart, FiltersSheet · TopNav, Breadcrumb, Banner, Footer · EmailSignup, ProductCard, FeatureCard, HeroBlocks, Features, Listings, PageHeader, Filters, ProductDetails, ShoppingBasket, CheckoutProgress, OrderSummary, AuthForm, AccountMenu, OrderList.
- **Écrans non dessinés** (dans le design system en ligne) : mini-panier, paiement en 3 étapes, compte déconnecté et connecté, en 1440, 768 et 375.
- **Iconographie** : Lucide 1.49.0 ; logos sociaux Carbon du Figma conservés.
- **Contenus** : français, prix en euros (« 250 € »), cinq produits de démonstration dont un nom long.
- **Brand guide** (README) : ton, fondations, mouvement, formulaires, couches, retours et états, iconographie, logo, contrôle, anatomie des pages, écarts validés.

### Modifié

- **Polices** : Clash Display et Satoshi (absentes du pack) remplacées par Red Hat Display et Manrope (Google Fonts, OFL), intégrées à `bundle.css`.
- **Mise en page** : container queries partout (les composants suivent la largeur de leur conteneur).
- **24 corrections UX cochées** appliquées : placeholder à 70 %, focus visible, cibles 44 px, texte courant 16 px, labels visibles, Stepper lisible et borné, en-tête constant, fil d'Ariane, parcours d'annulation, états de chargement et vides.

### Corrigé (contrôle qualité des 37 composants)

- Tokens de trait, de focus, de longueur de ligne et de largeur : plus aucune valeur en dur.
- Plus aucune animation infinie : chargement et Skeleton bornés à 4,8 s.
- Textes d'information (bandeau, fil d'Ariane, erreurs, aides de choix, stock, étapes) passés à 16 px.
- États d'appui ajoutés aux liens et zones de navigation ; survol du bouton de récapitulatif.
- Bouton Fermer du Drawer et onglets du compte à 44 px ; « Trier par : pertinence ».
- Thème sombre : bouton White, survols Secondary et Opaque, messages sur fond sombre.

### Écarts au Figma validés

Tous validés par le pilote le 30/09/2026 ; liste complète dans le README, section « Écarts validés ».

### Livrable

- `version.json`, `CHANGELOG.md`, `tokens.json`, `motion-catalogue.md`, `bundle.css`, `README.md`, et par composant `components/<Composant>/<Composant>.jsx` + `README.md`.
- Les modules `.jsx` (React 18) sont la traduction exacte du bundle en ligne : rendu DOM identique vérifié sur les 42 aperçus.
