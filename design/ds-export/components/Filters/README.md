Filtres de la liste produits : une entrée par groupe (desktop) ou « Filtres » et « Tri » (tablette, mobile), compteur « 24 produits », puces des filtres actifs et « Tout effacer », avec le FiltersSheet pour choisir.

## Usage

`h(Avion.Filters, { groups, selected, onChange, onClear, resultCount, sortOptions, sort, onSortChange })`. Le consommateur recalcule `resultCount` et les compteurs à chaque changement. Les choix se font dans le FiltersSheet (panneau à droite dès 768 px, plein écran depuis le bas en mobile), ouvert sur le groupe demandé.

- Desktop : reprend la barre du Figma (Catégorie ▾, Prix ▾… et « Trier par » à droite), chaque entrée ouvrant le panneau sur son groupe.
- À éviter : des filtres qui rechargent la page, un filtre actif invisible.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `groups`, `selected`, `onChange`, `onClear` | comme FiltersSheet | — |
| `resultCount` | « N produits » (annoncé) | — |
| `sortOptions`, `sort`, `onSortChange` | tri | — |

Gabarits (largeur de la section) : ≥ 1280 px, boutons Ghost sm par groupe ; 768 à 1279, « Filtres » + « Trier par » ; mobile, « Filtres » et « Tri » en Secondary pleine largeur.

## États

Aucun filtre · filtres actifs (puces + « Tout effacer ») · panneau ouvert · aucun résultat (dans le panneau).

## Accessibilité

Compteur `role="status"`, retrait des puces annoncé, boutons `aria-haspopup="dialog"`, retour du focus sur le bouton qui a ouvert le panneau.

## Animations

FilterChip (fondu de sortie, niveau 3) ; FiltersSheet (glissement + voile, niveau 2).

## Exemple

```js
h(Avion.Filters, { groups: groups, selected: sel, onChange: setSel, onClear: clear, resultCount: n, sortOptions: SORT, sort: sort, onSortChange: setSort })
```
