# QA Storybook — stories de l'espace client

Verdict : **VERT** (tour 2). Tour 1 : ROUGE, `WithErrors` sans résumé role=alert (une seule erreur).

Méthode : `npm run build-storybook`, `storybook-static` servi par un serveur statique lancé dans un script Playwright (Chromium, 1280 px), chaque story ouverte dans `iframe.html?id=…`, thèmes clair puis sombre (`globals=theme:light|dark`), événements du canal Storybook (rendu, exception de play), erreurs console, axe (sérieux/critique). 48 ouvertures (24 stories x 2 thèmes). Serveurs arrêtés.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| `npm run build-storybook` | VERT | build terminé sans erreur |
| `npm run lint` | VERT | 0 erreur, 1 avertissement existant (`<img>` dans `src/app/page.tsx`, hors périmètre) |
| `npm run typecheck` | VERT | aucune erreur |
| Console (48 ouvertures) | VERT | aucune erreur console hors l'échec de play ci-dessous |
| axe sérieux/critique | VERT | aucune violation, clair et sombre |
| StoreStatus (4 stories) | VERT | « Ouvert · ferme à 19 h », « Fermé · ouvre à 10 h », « Fermé · ouvre mardi à 10 h », vide (Pending) ; identique en clair et en sombre, dates fixes |
| StoreMap (3 stories) | VERT | rendu sans erreur, heure fixée par `now` |
| AddressesForm Default | VERT | |
| AddressesForm SeparateBilling | VERT | play réussie, « Adresse de facturation » visible |
| AddressesForm WithErrors | **ROUGE** | play échoue : `Unable to find role="alert"` (clair et sombre) |
| StoreFinder Page | VERT | |
| StoreFinder ShowOnMap | VERT | play réussie, `.leaflet-popup` présent, thèmes clair et sombre |
| Icon AllLucide | VERT | clock, messages-square, paintbrush, phone, receipt, star présents |
| Anciennes stories (AccountMenu x3, OrderList x3, AuthForm x5) | VERT | rendu correct, play sans exception |
| Thème clair / sombre | VERT | barre d'outils `theme` pilotée par l'URL, vérifiée sur toutes les stories |

## Corrections attendues (ROUGE)

1. `src/app/(site)/compte/_components/AddressesForm.stories.tsx`, story `WithErrors` : le résumé `role="alert"` (composant `Summary` dans `formUtils.tsx`) ne s'affiche qu'à partir de 2 erreurs (`if (n < 2) return null`). La play ne vide que le prénom de facturation : une seule erreur, donc erreur en ligne « Ce champ est obligatoire » mais pas de résumé. Corriger la story : vider aussi un second champ de facturation (par exemple `getAllByLabelText(/^Nom/)[1]` ou l'adresse) avant le clic sur « Enregistrer mes adresses ». Le comportement du composant est conforme (le résumé à partir de 2 erreurs est voulu ; pas de changement de composant).
2. Après correction, relancer ce contrôle : seule `WithErrors` doit être rejouée.

Remarque : les tuiles de carte viennent d'OpenStreetMap (réseau requis) ; aucune erreur console constatée dans cet environnement.

## Tour 2

Rebuild Storybook OK. `WithErrors` et `SeparateBilling` rejouées en clair et en sombre : play réussie, résumé `role="alert"` visible (WithErrors), facturation visible (SeparateBilling), console propre, axe sans violation sérieuse ou critique. Correction du tour 1 validée, pas de régression. Verdict : VERT. Serveur arrêté.
