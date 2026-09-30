Pied de page sur fond sombre : colonnes Menu, Catégories et Notre entreprise, inscription à la lettre d'information (EmailSignup ton dark), réseaux sociaux et copyright.

## Usage

`h(Avion.Footer, { onSubscribe: subscribe })`. Le consommateur peut remplacer `columns`, `socials` (liens des comptes) et `copyright`, et fournit `onSubscribe(email)` (promesse). Liens en `TextLink` ton inverse.

- Sur toutes les pages, en dernier.
- À éviter : des liens en 14 px, des logos sociaux Lucide (ils n'existent pas : SVG Carbon du Figma), un deuxième formulaire d'inscription juste au-dessus sans raison.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `columns` | `[{ title, links: [label \| { label, href }] }]` | Menu, Catégories, Notre entreprise |
| `socials` | `[{ name, href }]`, noms `linkedin`, `facebook`, `instagram`, `skype`, `twitter`, `pinterest` | les six |
| `copyright` | texte | « © 2026 Avion » |
| `onSubscribe`, `onNavigate` | inscription ; clic sur un lien | — |

Gabarits : ≥ 1280 px, trois colonnes + inscription (2 fr) ; 768 à 1279, trois colonnes puis inscription sur toute la largeur ; mobile, liens sur deux colonnes (comme le Figma), puis entreprise, inscription et bas de page empilés en colonne. Marges `space-7` / `space-8`, titres `h5`, liens `body-medium` (16 px, correction UX), séparateur `color-text-brand`.

## États

| État | Rendu |
| --- | --- |
| Liens | survol souligné, focus `color-focus-ring-inverse` |
| Réseaux sociaux | zone 44 × 44, survol fond `color-brand-primary` |
| Inscription | défaut, erreur (« Adresse e-mail invalide »), chargement, succès (« Merci, vous êtes inscrit ») — voir EmailSignup |

## Accessibilité

- `footer` ; chaque colonne est un `nav` nommé par son titre ; titres `h2` au style `h5`.
- Logos sociaux nommés « Avion sur Instagram »… ; icônes décoratives.
- Contraste : 14,34:1 ; messages de la lettre en `color-feedback-*-inverse`.

## Animations

Ligne **IconButton, TextLink** pour les liens et icônes (niveau 3) ; messages de l'inscription selon **Message d'erreur / succès** (niveau 2, fondu court en mode réduit).

## Exemple

```js
h(Avion.Footer, { onSubscribe: function (email) { return api.subscribe(email); } })
```
