Section de produits : titre, grille de ProductCard (4, 2 puis 1 colonne) et « Voir la collection », avec états chargement et vide.

## Usage

`h(Avion.Listings, { title: 'Vous aimerez aussi', products, action: { label: 'Voir la collection', href } })`. Le consommateur fournit les produits, `loading` pendant l'appel (et `count` pour le nombre de squelettes), et le contenu de l'état vide.

- À éviter : une grille de 3 en desktop, des cartes de tailles différentes dans une même rangée, « Voir plus » qui charge sans squelette.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `title` | titre de section (style `h3`) | — |
| `products` | données de ProductCard | `[]` |
| `loading`, `count` | squelettes | `false`, 4 |
| `action` | bouton Secondary centré, ou `false` | « Voir la collection » |
| `empty` | props d'EmptyState | liste sans résultat |
| `mobileColumns` | 1 (demande) · 2 (comme le Figma à 390 px) | 1 |

Colonnes selon la largeur de la section : 4 dès 1280 px, 2 dès 768 px, 1 en dessous ; gouttières `space-4` à `space-7`.

## États

Plein · chargement (Skeleton carte 4:5, `aria-busy`) · vide (EmptyState « Aucun produit ne correspond »).

## Accessibilité

Liste `ul` de cartes ; message « Chargement des produits » lu pendant l'attente.

## Animations

Survol des cartes (ligne **ProductCard**) ; pulsation des squelettes (ligne **Skeleton**, opacité fixe en mode réduit).

## Exemple

```js
h(Avion.Listings, { title: 'Nos nouveautés', products: items, loading: loading })
```
