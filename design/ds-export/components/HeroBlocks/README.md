Hero de l'accueil : titre (le H1 de la page), texte, une action et une image, sans carrousel.

## Usage

`h(Avion.HeroBlocks, { title, text, image, imageAlt, action: { label: 'Voir la collection', href } })`. Le consommateur fournit un titre court (deux lignes au plus en desktop), une phrase, une action et une image en situation.

- `variant: 'dark'` (défaut, correction UX) : bloc `color-surface-inverse` et bouton **White** à côté de l'image.
- `variant: 'card'` : la version retenue du Figma (accueil v2) — photo pleine largeur et carte blanche avec bouton Secondary.
- À éviter : plusieurs diapositives, une vidéo en lecture automatique, deux boutons principaux.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `variant` | `dark` · `card` | `dark` |
| `title`, `text` | titre (style `h2`), chapeau `body-large` | — |
| `action` | `{ label, href, onClick }` → Button White (dark) ou Secondary (card), pleine largeur en mobile | « Voir la collection » |
| `image`, `imageAlt` | photo | — |
| `headingLevel` | 1 sur l'accueil | 1 |

Gabarits (largeur de la section) : ≥ 1280 px, texte et image côte à côte (dark) ou carte à droite sur la photo (card) ; 768, empilés avec marges `space-6` (dark) ; mobile, texte puis image.

## États

Statique ; le bouton porte ses états.

## Accessibilité

Titre = H1 de la page. Contrastes : blanc sur `color-surface-inverse` 14,34:1, bouton White 14,34:1.

## Animations

Aucune : pas de carrousel, pas d'apparition au défilement (niveau sobre).

## Exemple

```js
h(Avion.HeroBlocks, { title: 'Du mobilier et de la décoration pensés pour durer', text: 'Découvrez la nouvelle collection…', image: url, imageAlt: '…', action: { label: 'Voir la collection', href: '/collection' } })
```
