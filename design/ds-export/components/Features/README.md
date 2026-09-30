Rangée de quatre FeatureCard sous un titre de section (« Ce qui rend notre marque différente »), en 4, 2 puis 1 colonne.

## Usage

`h(Avion.Features, {})` avec les quatre avantages par défaut, ou `items` pour les remplacer. Accueil et fiche produit (anatomie des pages).

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `title` | titre centré (style `h3`), ou `false` | « Ce qui rend notre marque différente » |
| `items` | `[{ icon, title, text }]` | livraison, artisans, prix, emballages |
| `filled` | fond des cartes | `true` |

Colonnes selon la largeur de la section : 1 (mobile), 2 (dès 768 px), 4 (dès 1280 px) ; gouttières `space-4` / `space-5`.

## États

Statique.

## Accessibilité

Titre `h2`, cartes en `h3`.

## Animations

Aucune.

## Exemple

```js
h(Avion.Features, {})
```
