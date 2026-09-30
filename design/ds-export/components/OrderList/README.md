Liste des commandes du compte : numéro, date, statut, total et « Voir le détail », en tableau dès 768 px et en cartes empilées en mobile ; état vide et chargement.

## Usage

`h(Avion.OrderList, { orders, onOpen })`. Le consommateur fournit les commandes (`number`, `date` en toutes lettres, `status`, `total`, `href`).

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `orders` | commandes | `[]` |
| `loading` | lignes en Skeleton | `false` |
| `onOpen(order)`, `collectionHref`, `onBrowse` | actions | — |

Statuts : « En préparation » (`package`), « Expédiée » (`truck`), « Livrée » (`circle-check`), toujours écrits.

## États

Plein · chargement · vide (EmptyState « Aucune commande pour l'instant » + « Découvrir la collection »).

## Accessibilité

Vrai tableau avec légende et en-têtes (`scope`), numéro en en-tête de ligne ; lien nommé « Voir le détail de la commande AV-10482 » ; statut jamais porté par la couleur seule.

## Animations

TextLink (niveau 3) ; pulsation des squelettes (opacité fixe en mode réduit).

## Exemple

```js
h(Avion.OrderList, { orders: orders, onOpen: function (o) { go('/compte/commandes/' + o.number); } })
```
