Bouton réduit à une icône (recherche, panier, compte, menu, fermer), dans une zone cliquable de 44 × 44 px autour de l'icône inchangée du Figma.

## Usage

`h(Avion.IconButton, { icon: 'search', label: 'Rechercher' })`. Le consommateur fournit `icon`, **`label` obligatoire** (nom accessible, casse de phrase), `onClick` ou `href`, et `expanded` quand le bouton ouvre une couche (menu, filtres). `children` accueille une pastille (Badge) sur l'icône panier.

- Libellés : « Rechercher », « Panier, 2 articles », « Mon compte », « Ouvrir le menu » / « Fermer le menu », « Fermer ».
- À éviter : une action sans équivalent visible ailleurs quand elle est principale (préférer Button), une icône agrandie pour « faire plus gros ».

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `icon` | nom Lucide (`search`, `shopping-cart`, `circle-user`, `menu`, `x`…) | — |
| `label` | nom accessible, obligatoire | — |
| `tone` | `default` (`color-text-default`) · `inverse` (`color-text-inverse`, sur `color-surface-inverse`) | `default` |
| `size` | taille de l'icône : `sm` 16 px (dessin Figma) · `md` 20 · `lg` 24 ; la zone reste `size-target-min` | `sm` |
| `expanded` / `pressed` | `aria-expanded` / `aria-pressed` | absent |
| `disabled` | désactivé | `false` |

## États

| État | default | inverse |
| --- | --- | --- |
| Survol, ouvert, pressé | fond `color-surface-hover` | fond `color-brand-primary` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px | `color-focus-ring-inverse` |
| Actif | icône `color-text-brand` | fond `color-brand-primary` |
| Désactivé | `opacity-disabled` | `opacity-disabled` |

## Accessibilité

- Toujours un `label` : un avertissement s'affiche en console s'il manque. L'icône est décorative (`aria-hidden`), le bouton porte le nom.
- Zone de 44 × 44 px (`size-target-min`) même quand l'icône fait 16 px ; espacer deux IconButton d'au moins `space-1`.
- Icône ≥ 3:1 : 14,34:1 au repos, 11,87:1 (clair) et 7,48:1 (sombre) au survol.

## Animations

Ligne **IconButton, TextLink** du catalogue : fond et couleur en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h(Avion.IconButton, { icon: 'menu', label: open ? 'Fermer le menu' : 'Ouvrir le menu', expanded: open, onClick: toggle })
h(Avion.IconButton, { icon: 'x', label: 'Fermer', onClick: close })
```
