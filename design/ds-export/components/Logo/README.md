La marque « Avion », composée en texte Red Hat Display (remplaçant de Clash Display), qui renvoie toujours à l'accueil.

## Usage

`h(Avion.Logo, { tone: 'default' })`. Il n'existe pas de fichier logo : ne jamais le redessiner, le vectoriser, l'animer ou lui ajouter un symbole. Le consommateur fournit `href` si l'accueil n'est pas `/`, `tone: 'inverse'` sur un fond sombre, et `current` sur la page d'accueil.

- Desktop : centré dans l'en-tête, entre la recherche et le panier.
- Mobile : à gauche, recherche, panier et menu à droite (même en-tête sur toutes les pages).
- Pied de page : ton `inverse`.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `tone` | `default` (`color-text-default`), `inverse` (`color-text-inverse`, sur `color-surface-inverse`) | `default` |
| `href` | adresse de l'accueil | `/` |
| `current` | booléen : `aria-current="page"` sur l'accueil | `false` |
| `label` | nom accessible | « Avion, accueil » |

Taille : style de texte `h3` (Red Hat Display 24 px, 400), identique en desktop et en mobile. Zone cliquable ≥ `size-target-min`.

## États

- **Défaut** : `default` en `color-text-default`, `inverse` en `color-text-inverse`.
- **Survol** : soulignement 1 px décalé de `space-1` ; le ton `default` passe en `color-text-brand`.
- **Focus** : contour 2 px `color-focus-ring` décalé de 2 px ; `color-focus-ring-inverse` pour le ton `inverse`.
- **Actif** : retour à la couleur de repos pendant l'appui.
- Pas d'état désactivé : le logo est toujours un lien.

## Accessibilité

- Lien nommé « Avion, accueil » : le nom commence par le texte visible.
- Contraste : 14,34:1 dans les deux tons et les deux thèmes ; survol `color-text-brand` 7,48:1 (clair) et 11,87:1 (sombre).
- Ne jamais mettre le logo dans un `h1` : le seul H1 de la page est son titre.

## Animations

Suit la ligne **IconButton, TextLink** du catalogue : couleur et soulignement en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé tel quel en mode réduit.

## Exemple

```js
h(Avion.Logo, { current: true })
h('footer', { className: 'av-on-inverse' }, h(Avion.Logo, { tone: 'inverse' }))
```
