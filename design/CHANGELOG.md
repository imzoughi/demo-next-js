# Journal des versions du design system

## Correctifs d'intégration

### Espace client : adresses, carte des magasins, statut, icônes, boutons (14/10/2026)
Projet boutique-demo, client de démo Issam MZOUGHI. Design system inchangé (1.0.0) : aucun nouvel export Claude Design.
- Icône (`ui/Icon`) : 6 noms ajoutés, en Lucide : `clock`, `messages-square`, `paintbrush`, `phone`, `receipt`, `star`. Story « AllLucide » à jour.
- Informations : bloc « Mes adresses » (livraison, facturation ; case « L’adresse de facturation est identique à l’adresse de livraison »). Composant de page `AddressesForm`, hors export.
- Magasin favori : carte des magasins Leaflet (fond OpenStreetMap), statut ouvert / fermé à l’heure de Paris, bouton « Voir sur la carte ». Composants de page `StoreMap`, `StoreStatus`, `StoreFinder`, hors export.
- Boutons : « Voir sur la carte » en secondary ; choix du magasin favori en primary, puis en secondary une fois choisi.
- Stories ajoutées pour les composants de l’espace client (`AddressesForm`, `StoreFinder`, `StoreMap`, `StoreStatus`).

### TopNav - États des liens de catégories (oct. 6)
Les liens de catégories desktop (.cat) ne doivent pas être affectés par la règle :active du menu mobile (.mcat:active). Correctif : sélecteur .cat retiré de la règle :active, qui ne vise maintenant que .mcat:active (menu mobile). Voir `/docs/composants/top-nav` section « États ».

## 1.0.0 - 2026-09-30 (premier import)

- Import du design system Avion 1.0.0 (source : `design/ds-export/`).
- 37 composants importés, avec leurs stories ; tokens générés dans `src/styles/tokens.css`.
- QA de l'import : 29 composants VERTS, 8 ROUGES (voir `qa/qa-import-1.0.0.md`).

### Écarts notables
- Polices Red Hat Display (titres) et Manrope (texte) dans l'export, au lieu de Clash Display et Satoshi du Figma. Écart déjà validé dans `design/ds-export/README.md`.

### À reprendre (8 composants ROUGES)
- IconButton : stories des tailles md et lg, et de l'état pressed.
- Radio : story de l'état Erreur.
- CartItem : lien du nom sous 44 px ; stories Page cassées à 768, 1280 et 1440 px.
- Badge : story du ton inverse.
- MiniCart : dépend de CartItem.
- Footer : stories des états d'inscription.
- EmailSignup : stories des états erreur, succès et échec serveur.
- ShoppingBasket : dépend de CartItem.
