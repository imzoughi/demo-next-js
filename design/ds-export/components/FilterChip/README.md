Puce d'un filtre actif, retirable d'un clic, d'un toucher ou au clavier sur une zone de 44 px, dont le retrait est annoncé.

## Usage

`h(Avion.FilterChip, { label: 'Céramiques', onRemove: remove })`. Le consommateur affiche une puce par filtre actif sous le compteur (« 24 produits »), suivie de « Tout effacer » (TextLink), et après chaque retrait :

- annonce « Filtre « Céramiques » retiré » dans une zone `role="status"` et le nouveau compteur ;
- remet le focus sur la puce suivante (ou « Tout effacer » s'il n'en reste pas).

`onRemove` est appelé à la fin du fondu de sortie.

- À éviter : une puce pour un filtre non actif, une puce sans croix, retirer au survol.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `label` | nom du filtre (« Céramiques », « Moins de 100 € ») | — |
| `onRemove` | retrait | — |
| `disabled` | puce inactive | `false` |

Pilule `radius-pill`, bordure `color-border-input`, fond `color-surface-default`, texte `body-medium`, icône `x` sm, hauteur `size-target-min`, écart entre puces `space-2`.

## États

| État | Rendu |
| --- | --- |
| Défaut | bordure `color-border-input` |
| Survol | fond `color-surface-hover` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px |
| Actif | texte `color-text-brand` |
| Retrait | fondu de sortie puis suppression |
| Désactivé | `opacity-disabled` |

## Accessibilité

- Toute la puce est un bouton nommé « Retirer le filtre Céramiques » (Entrée, Espace, toucher).
- Contrastes : texte 14,34:1, bordure 7,48:1 ; survol 11,87:1 (clair) et 7,48:1 (sombre).
- Le retrait est annoncé et le focus ne se perd pas (voir Usage).

## Animations

Ligne **FilterChip** du catalogue : fondu de sortie en `motion-duration-fast` / `motion-ease-exit`, niveau 3, gardé en mode réduit ; les puces suivantes reprennent leur place.

## Exemple

```js
active.map(function (f, i) { return h(Avion.FilterChip, { key: f, label: f, onRemove: function () { removeFilter(f, i); } }); })
```
