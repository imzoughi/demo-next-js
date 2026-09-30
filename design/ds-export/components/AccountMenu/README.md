Navigation de l'espace client (Profil, Commandes, Adresses, Déconnexion) : onglets en desktop, liste en mobile.

## Usage

`h(Avion.AccountMenu, { active: 'commandes', onSelect: go, onLogout: logout })`. Le consommateur fournit la rubrique courante et les actions, et affiche le contenu de la rubrique en dessous.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `items` | `[{ id, label, icon, href }]` | Profil (`circle-user`), Commandes (`package`), Adresses (`map-pin`) |
| `active` | id courant | — |
| `onSelect(id)`, `onLogout` | actions | — |

Gabarits (largeur du conteneur) : dès 768 px, onglets `body-medium` alignés, « Déconnexion » à droite ; en dessous, liste de lignes de 56 px avec icône et chevron.

## États

| État | Rendu |
| --- | --- |
| Défaut | onglet `color-text-brand` / ligne `color-text-default` |
| Survol | onglet `color-text-default` ; ligne fond `color-surface-hover` |
| Actif | trait de 2 px sous l'onglet ou à gauche de la ligne, `aria-current="page"` |
| Focus | contour 2 px `color-focus-ring` |

## Accessibilité

`nav` « Mon compte » ; « Déconnexion » est un bouton ; lignes de 56 px.

## Animations

Ligne **IconButton, TextLink** : couleur et fond en `motion-duration-fast`, niveau 3.

## Exemple

```js
h(Avion.AccountMenu, { active: view, onSelect: setView, onLogout: logout })
```
