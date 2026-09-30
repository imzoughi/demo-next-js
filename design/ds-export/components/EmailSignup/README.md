Inscription à la lettre d'information : titre, phrase, avantages facultatifs, champ e-mail (label masqué visuellement) et bouton, avec erreur, chargement et succès sous le champ.

## Usage

`h(Avion.EmailSignup, { tone: 'light', onSubscribe: subscribe })`. Le consommateur fournit `onSubscribe(email)` qui renvoie une promesse ; le composant valide l'adresse, gère le chargement, le succès et l'échec. Ton `dark` dans le Footer (avec `compact`).

- Accueil et fiche produit (ton light), pied de page (ton dark, compact).
- À éviter : une case pré-cochée d'accord marketing, un placeholder à la place du label, un message d'erreur en haut de la page.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `tone` | `light` (fond `color-surface-subtle`, TextInput primary, Button primary) · `dark` (fond `color-surface-inverse`, TextInput opaque, Button white) | `light` |
| `compact` | sans phrase, titre `h5`, sans fond (pied de page) | `false` |
| `title`, `text`, `benefits` | textes ; avantages avec `circle-check` | « Rejoignez notre lettre d'information » |
| `successText`, `errorText` | messages | « Merci, vous êtes inscrit », « Adresse e-mail invalide » |
| `headingLevel` | niveau du titre | 2 |

Mise en page selon la largeur de la section (container queries) : champ et bouton accolés dès 400 px (comme le Figma, y compris dans la colonne du pied de page), empilés en pleine largeur en dessous ; contenu centré dès 768 px ; formulaire ≤ 560 px.

## États

| État | Rendu |
| --- | --- |
| Défaut | champ vide, placeholder « vous@exemple.fr » |
| Erreur | « Adresse e-mail invalide » sous le champ, champ `aria-invalid` |
| Chargement | Button en chargement (« Inscription ») |
| Succès | « Merci, vous êtes inscrit », champ et bouton désactivés |
| Échec serveur | « L'inscription n'a pas abouti. Réessayez. » |

## Accessibilité

- Label « Adresse e-mail » masqué visuellement mais lu ; `type="email"`, `autocomplete="email"`.
- Messages reliés au champ et annoncés (`aria-live`).
- Contrastes des tons : ceux de TextInput et Button.

## Animations

Ligne **Message d'erreur / succès** : fondu + décalage `motion-distance-small`, `motion-duration-base` / `motion-ease-enter`, niveau 2 ; réduit : fondu `motion-duration-fast`. Bouton : lignes **Button** et **Button (chargement)**.

## Exemple

```js
h(Avion.EmailSignup, { tone: 'light', benefits: ['Offres exclusives', 'Événements gratuits', 'Remises importantes'], onSubscribe: api.subscribe })
```
