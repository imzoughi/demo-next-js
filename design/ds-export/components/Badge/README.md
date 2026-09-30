Pastille de quantité posée sur l'icône panier : masquée à 0, « 99+ » au-delà de 99.

## Usage

`h(Avion.IconButton, { icon: 'shopping-cart', label: Avion.cartLabel(n) }, h(Avion.Badge, { count: n }))`. Le consommateur passe le nombre d'articles et met ce nombre dans le **nom accessible** du bouton (`Avion.cartLabel(n)` → « Panier, 2 articles », « Panier, vide ») : la pastille elle-même est décorative.

- En-tête desktop et mobile, sur toutes les pages (y compris le panier).
- À éviter : une pastille sans nombre, sur une autre icône que le panier, une couleur d'alerte.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `count` | entier ; 0 ou moins : rien n'est rendu ; > 99 : « 99+ » | 0 |
| `tone` | `default` (fond `color-action-primary`, texte `color-text-inverse`) · `inverse` (fond `color-action-white`, texte `color-text-on-white`, sur fond sombre) | `default` |

Pilule `radius-pill`, hauteur et largeur minimale `size-icon-md` (20 px), texte `body-small` en chiffres tabulaires (exception au texte ≥ 16 px : le nombre est aussi dans le nom du bouton), liseré `size-border-strong` couleur du fond pour la détacher de l'icône, en haut à droite de la zone 44 × 44 de l'IconButton.

## États

| État | Rendu |
| --- | --- |
| 0 | masquée |
| 1 à 99 | le nombre |
| ≥ 100 | « 99+ » |
| Changement | fondu de la nouvelle valeur |

## Accessibilité

- `aria-hidden="true"` : le nombre est porté par le nom du bouton, lu une seule fois.
- Contraste : 14,34:1 dans les deux tons et les deux thèmes.

## Animations

Ligne **Badge** du catalogue : fondu de la valeur en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h(Avion.IconButton, { icon: 'shopping-cart', label: Avion.cartLabel(count), href: '/panier' }, h(Avion.Badge, { count: count }))
```
