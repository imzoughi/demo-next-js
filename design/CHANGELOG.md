# Journal des versions du design system

## Correctifs d'intégration

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
