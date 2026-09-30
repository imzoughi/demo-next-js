En-tête de page portant le seul H1 : sur photo (voile `color-scrim`) ou en texte seul centré.

## Usage

`h(Avion.PageHeader, { title: 'Chaises', text, image })`. Liste produits (« Tous les produits », catégorie), pages de contenu.

- À éviter : un deuxième H1 ailleurs dans la page, un texte blanc sur photo sans voile.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `title` | texte du H1 (style `h1`, 36 px) | — |
| `text` | chapeau `body-large` | — |
| `image` | photo de fond, décorative ; sans image : titre centré sur `color-surface-default` (liste v3 du Figma) | — |

Sur photo : voile `color-scrim` (Dark Primary à 64 %), texte `color-text-on-image`, aligné à gauche, marges `space-9` / `space-8`.

## États

Statique.

## Accessibilité

Unique H1. Contraste du texte sur photo ≥ 4,55:1 même sur une image blanche (le voile de 48 % ne donnait que 2,88:1).

## Animations

Aucune (pas de parallaxe).

## Exemple

```js
h(Avion.PageHeader, { title: 'Tous les produits' })
```
