Carte d'avantage (livraison, artisans, prix, emballages) : pictogramme Lucide, titre H4 et texte 16 px, avec ou sans fond Light Grey.

## Usage

`h(Avion.FeatureCard, { icon: 'truck', title: 'Livraison le lendemain', text: 'Commandez avant 15 h…' })`, groupées par quatre dans Features.

- À éviter : plus de deux lignes de titre, un lien caché dans la carte, un pictogramme d'une autre source que Lucide.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `icon` | nom Lucide (`truck`, `circle-check`, `credit-card`, `sprout`), 24 px | — |
| `title`, `text` | textes (texte en `body-medium`, correction UX : 16 px au lieu de 14) | — |
| `filled` | fond `color-surface-subtle` | `true` |
| `headingLevel` | niveau du titre (style `h4`) | 3 |

Marges `space-6`, écarts `space-3`, hauteur égale dans la grille.

## États

Statique.

## Accessibilité

Pictogramme décoratif ; titre de niveau réel. Contraste 13,62:1 (clair) et 7,48:1 (sombre) sur le fond.

## Animations

Aucune.

## Exemple

```js
h(Avion.FeatureCard, { icon: 'sprout', title: 'Emballages recyclés', text: 'Nos emballages sont recyclés à 100 %.' })
```
