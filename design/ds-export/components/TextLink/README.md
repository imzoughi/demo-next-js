Lien texte (« Continuer mes achats », liens du pied de page), ou bouton d'aspect lien pour une action discrète comme « Retirer », souligné au survol.

## Usage

`h(Avion.TextLink, { href: '/collection', tone: 'brand' }, 'Voir la collection')`. Sans `href`, il rend un `<button>` : c'est le cas des actions (« Retirer », « Annuler », « Tout effacer »). Le consommateur fournit le texte, `href` ou `onClick`, et le ton selon le fond.

- `inline` dans un paragraphe : toujours souligné, pour ne pas distinguer le lien par la couleur seule.
- À éviter : un lien pour l'action principale d'une zone (Button), « cliquez ici », un lien seul sans verbe ni destination claire.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `tone` | `default` (`color-text-default`) · `brand` (`color-text-brand`) · `inverse` (`color-text-inverse`, sur `color-surface-inverse`) | `default` |
| `inline` | lien dans un texte : hérite de la taille, souligné au repos, pas de hauteur minimale | `false` |
| `iconLeft` / `iconRight` | icône Lucide md (`arrow-left` pour « Continuer mes achats », `trash-2` pour « Retirer ») | aucune |
| `href` | lien `<a>` ; absent : `<button type="button">` | — |

Texte en `body-medium` (16 px, correction UX : plus de liens à 14 px dans le pied de page).

## États

| État | Rendu |
| --- | --- |
| Défaut | sans soulignement (sauf `inline`) |
| Survol | soulignement 1 px décalé de `space-1` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px ; `color-focus-ring-inverse` en ton inverse |
| Actif | soulignement 2 px |
| Visité | même couleur que le défaut (liens de boutique, pas d'article à relire) |

## Accessibilité

- Contrastes : default 14,34:1, brand 7,48:1 (clair) / 11,87:1 (sombre), inverse 14,34:1.
- Hauteur de zone ≥ 44 px hors `inline`.
- Un TextLink sans `href` est un vrai bouton : Entrée et Espace l'activent.
- « Retirer » : annoncer le retrait et proposer « Annuler » (Toast ou message `role="status"`).

## Animations

Ligne **IconButton, TextLink** du catalogue : couleur et soulignement en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h(Avion.TextLink, { href: '/collection', tone: 'brand', iconLeft: 'arrow-left' }, 'Continuer mes achats')
h(Avion.TextLink, { iconLeft: 'trash-2', onClick: remove }, 'Retirer')
h('p', null, 'Consultez notre ', h(Avion.TextLink, { inline: true, tone: 'brand', href: '/retours' }, 'politique de retour'), '.')
```
