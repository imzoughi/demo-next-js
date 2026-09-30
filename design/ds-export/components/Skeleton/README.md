Squelette de chargement (carte, ligne, image) qui occupe exactement la place et le ratio de l'élément attendu, pour que la page ne saute pas quand le contenu arrive.

## Usage

`h(Avion.Skeleton, { shape: 'card', ratio: '4 / 5' })`. Le consommateur le pose à la place exacte du contenu (même grille, même colonne), marque le conteneur `aria-busy="true"` et ajoute un texte d'état pour les lecteurs d'écran (« Chargement des produits »), puis le remplace par le contenu.

- Liste produits, « Voir plus », Listings de l'accueil, OrderSummary, OrderList.
- À éviter : un squelette pour une attente de moins de 300 ms, un squelette d'une autre forme que le contenu, un indicateur rotatif à la place d'une grille.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `shape` | `card` (image + nom 70 % + prix 40 %, comme ProductCard) · `image` · `line` | `line` |
| `ratio` | ratio CSS de l'image (`'4 / 5'` pour les cartes produit, `'16 / 9'`…) | `'4 / 5'` |
| `lines` | nombre de lignes (`line`), la dernière à 40 % | 1 |
| `width` | largeur d'une ligne seule (`'60%'`) | 100 % |

Couleur `color-border-default`, angles droits. Une ligne mesure 1em du style de texte parent : poser le squelette dans un conteneur `body-medium`, `h3`… pour qu'il ait la hauteur du texte remplacé.

## États

| État | Rendu |
| --- | --- |
| Attente | 3 pulsations d'opacité (1 → `opacity-pulse` → 1) sur `motion-duration-loop` (4,8 s), puis forme fixe |
| Mode réduit | opacité fixe, aucune animation |
| Chargé | remplacé par le contenu, sans décalage de mise en page |

## Accessibilité

Le squelette est `aria-hidden` : c'est le conteneur (`aria-busy`) et le texte d'état `role="status"` qui informent. Le contraste n'est pas requis (élément décoratif).

## Animations

Ligne **Skeleton** du catalogue : 3 pulsations d'opacité jouées une fois sur `motion-duration-loop` (4,8 s ≤ 5 s, contrôle : aucun mouvement automatique de plus de 5 s), `motion-ease-standard`, niveau 3 ; ensuite la forme reste fixe. Mode réduit : **opacité fixe** (demande du pilote, plus stricte que le catalogue).

## Exemple

```js
h('div', { 'aria-busy': 'true' }, h('p', { className: 'av-visually-hidden', role: 'status' }, 'Chargement des produits'),
  [0, 1, 2, 3].map(function (i) { return h(Avion.Skeleton, { key: i, shape: 'card' }); }))
```
