Formulaire de compte à deux modes, connexion et création de compte, avec erreurs sous les champs, résumé et erreur globale.

## Usage

`h(Avion.AuthForm, { mode: 'login', onSubmit: function (mode, values) { return api(mode, values); } })`. Le consommateur fournit `onSubmit` (promesse ; un rejet affiche l'erreur globale, son `message` la remplace), `forgotHref` ou `onForgot`.

- Connexion : e-mail, mot de passe, « Se souvenir de moi », « Mot de passe oublié », « Se connecter ».
- Création : prénom, nom (côte à côte), e-mail, mot de passe (8 caractères minimum), lettre d'information facultative, « Créer mon compte ».

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `mode` | `login` · `register` (bascule par onglets) | `login` |
| `onSubmit(mode, values)` | promesse | — |
| `forgotHref`, `onForgot` | lien | — |

Largeur 480 px au plus, écarts `space-5`, champs TextInput avec autocomplete (`email`, `current-password`, `new-password`, `given-name`, `family-name`).

## États

| État | Rendu |
| --- | --- |
| Défaut | onglet actif souligné |
| Erreur de champ | « Ce champ est obligatoire », « Adresse e-mail invalide », « Au moins 8 caractères » sous le champ ; focus sur le premier champ en erreur |
| Plusieurs erreurs | résumé « 2 champs sont à corriger. » en haut (`role="alert"`) |
| Erreur globale | « Adresse e-mail ou mot de passe incorrect. » |
| Chargement | Button en chargement (« Connexion ») |

## Accessibilité

Onglets `role="tab"`, labels visibles, messages reliés aux champs ; la case « Se souvenir de moi » n'est jamais cochée d'office.

## Animations

Messages (ligne **Message d'erreur / succès**, niveau 2), champs et onglets (ligne **TextInput**, niveau 3), Button (chargement).

## Exemple

```js
h(Avion.AuthForm, { mode: 'login', onSubmit: login, forgotHref: '/mot-de-passe' })
```
