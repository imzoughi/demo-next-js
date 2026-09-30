Carte produit (image, nom, prix) entièrement cliquable vers la fiche, à hauteur égale dans une grille, avec survol soulevé et état de chargement.

## Usage

`h(Avion.ProductCard, { name: 'Fauteuil Dandy', price: 250, image, imageAlt, href: '/fauteuil-dandy' })`. Le consommateur fournit les données et l'URL de la fiche ; la grille (Listings) garantit des colonnes égales.

- À éviter : un bouton « Ajouter au panier » dans la carte (une action = la fiche), des images de ratios différents dans une même grille, un prix sans « € ».

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `size` | `sm` (image 4:5, carte 305 × 462 du Figma) · `lg` (image 5:3, 630 × 462) | `sm` |
| `name`, `price`, `image`, `imageAlt`, `href` | données ; prix via `Avion.formatPrice` | — |
| `loading` | Skeleton au même ratio | `false` |

Nom `h4` (Red Hat Display 20 px), prix `body-large`, écarts `space-2` / `space-3`, fond `color-surface-default`, image sur `color-surface-subtle`.

## États

| État | Rendu |
| --- | --- |
| Défaut | sans ombre |
| Survol | soulèvement `motion-distance-small`, `shadow-card-hover`, nom souligné |
| Focus | contour 2 px `color-focus-ring` décalé de `space-1` autour de la carte |
| Chargement | squelette carte (image + deux lignes) |
| Nom long | passe à la ligne ; le prix reste aligné en bas |

## Accessibilité

- Un seul lien par carte ; son nom accessible est « nom + prix ». L'image a un texte alternatif qui décrit la pièce.
- Contrastes : nom et prix 14,34:1.

## Animations

Ligne **ProductCard** du catalogue : ombre + soulèvement en `motion-duration-fast` / `motion-ease-standard`, niveau 2. Mode réduit : soulèvement retiré, fondu d'ombre gardé.

## Exemple

```js
h(Avion.ProductCard, { name: 'Vase Graystone', price: 85, image: url, imageAlt: 'Vase Graystone en céramique grise', href: '/vase-graystone' })
```
