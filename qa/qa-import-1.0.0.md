# QA import du design system 1.0.0 (projet boutique-demo, stack nextjs)

Contrôleur QA indépendant. Aucun code modifié, backlog non coché. Date : 2026-09-30.

## Verdict global : ROUGE

29 composants VERTS, 8 ROUGES (détail plus bas). Le backlog ne doit cocher que les VERTS.

## Contrôles exécutés

| Contrôle | Statut | Détail |
| --- | --- | --- |
| `npm run check` (lint + typecheck + build) | VERT | 0 erreur. Le build ne prérend que la page `/` : les 37 composants n'y sont pas montés. |
| `npm run build-storybook` | VERT | Storybook statique produit, 162 stories, tous les composants du backlog ont des stories. |
| Rendu des 162 stories à 375, 768, 1280, 1440 px | VERT | 0 erreur JS, 0 débordement horizontal. Seule trace : `favicon.ico` en 404 (artefact du serveur statique). |
| Accessibilité axe (WCAG A et AA, 2.0 à 2.2) | VERT | 162 stories en thème clair (375 et 1280), puis en thème sombre (375 et 1280) : aucun problème, contrastes inclus. Menu mobile et Drawer ouverts (clair, sombre, mouvement réduit) : aucun problème. Seule alerte brute : `document-title` sur le `html` de l'iframe Storybook (artefact Storybook). |
| Interactions clavier | VERT | Drawer : rôle dialog, aria-modal, nom, focus dedans, Tab et Maj+Tab piégés, Échap ferme, focus rendu au déclencheur, défilement page bloqué puis rendu, croix 44 x 44 px. TopNav 375 : menu Drawer, aria-expanded, Échap, retour du focus. Stepper, Checkbox, Radio au clavier ; TextInput (aria-invalid, aria-describedby, label) ; Button chargement (aria-busy) et désactivé ; Toast (role status). |
| Mouvement réduit (émulé) | VERT | Drawer : glissement de 0,36 s remplacé par un fondu de 0,16 s (niveau 2, 200 ms ou moins). Icône de chargement : rotation remplacée par 3 pulsations, bornée à 4,8 s (moins de 5 s). Rien de bloqué. |
| Aucune couleur en dur | VERT | Aucune valeur hexadécimale, `rgb()` ou `hsl()` dans `src/components` et `src/app` (hors `tokens.css`). Durées en variables `--motion-*`. |
| Casse de phrase, français, Lucide | VERT | `lang="fr"`, textes en casse de phrase, pas de capitales de style, icônes uniquement via Icon (`lucide-react`). Polices Red Hat Display et Manrope : écart déjà validé dans `ds-export/README.md`. |
| Code React et Next.js (CRITICAL et HIGH Vercel) | VERT | Pas de cascade async, pas d'import baril, pas de composant défini dans un composant, `useSyncExternalStore` pour le montage du portail, `next/image` avec `sizes`, `priority` seulement sur hero et en-tête. Variantes en énumérations, peu de booléens. |
| Cartes de même hauteur (Listings) | VERT | 375 : 4 rangées de 492 px ; 1280 : 4 cartes de 411 px. |
| Cibles 44 px | ROUGE | Lien du nom de produit dans CartItem : 22 à 28 px de haut. Les liens `inline` de TextLink sont exemptés par le design system. |
| Stories : une par variante et par état | ROUGE | Manques : Badge, IconButton, Radio, EmailSignup, Footer. |
| Mise en page des stories CartItem (Page) à 768, 1280, 1440 | ROUGE | Rendu cassé, voir CartItem. |
| Erreurs Next.js `get_errors` (Next DevTools MCP) | IMPOSSIBLE | Pas de serveur `npm run dev` ni de MCP dans cette session. Remplacé par : build OK et 0 erreur console sur 162 stories. L'hydratation dans une vraie page Next n'est pas vérifiée. |
| `npm run test:ui`, `npm run shots` | IMPOSSIBLE | Le dossier `tests/` est vide (aucun test Playwright dans le projet) et `playwright.config.ts` vise un Storybook lancé sur le port 6006. Remplacés par des scripts ponctuels sur `storybook-static`. |
| `npm run perf` | Non applicable | Se joue sur les pages, jamais sur les composants. |

## Composants VERTS (29)

Icon, Logo, Button, TextLink, TextInput, Checkbox, Stepper, ProductCard, FeatureCard, Toast, Skeleton, EmptyState, FilterChip, Drawer, FiltersSheet, TopNav, Breadcrumb, Banner, HeroBlocks, Features, Listings, PageHeader, Filters, ProductDetails, CheckoutProgress, OrderSummary, AuthForm, AccountMenu, OrderList, et Choice (aide interne, base de Checkbox et Radio, hors backlog).

Les états survol, focus et appui sont écrits en CSS (pseudo-classes) sans story dédiée ; le focus visible global est défini dans `globals.scss` (contour 2 px). Non bloquant.

## Composants ROUGES (8)

### CartItem
1. Les stories `Page`, `AtMaxStock`, `Removing` et `WithoutLink` sont cassées à 768, 1280 et 1440 px : le nom du produit s'affiche une lettre par ligne (colonne de 14 px sur 336 px de haut), la description un mot par ligne. Cause : le décorateur de la story borne la largeur à `--size-drawer`, alors que les `@container` du contexte `page` (480 et 720 px) se calculent sur le conteneur global de `globals.scss` (largeur de la fenêtre). La grille à 4 colonnes s'applique donc dans 432 px. Le rendu est bon dans ShoppingBasket, qui a son propre conteneur.
   Correction attendue : dans `CartItem.stories.tsx`, ne pas borner la largeur pour le contexte page (décorateur propre à chaque story) et donner à `.root` un `container-type: inline-size` pour que les seuils suivent la largeur réelle de la ligne.
2. Règle d'or 3 (zones cliquables d'au moins 44 px) : le lien du nom (`a.name`) fait 22 px (drawer) à 28 px (page) de haut.
   Correction attendue : `min-height: var(--size-target-min)` avec `display: inline-flex; align-items: center` sur `a.name`. Si le pilote préfère garder le dessin, il doit valider l'écart (la fiche `ds-export` de CartItem ne parle pas de cette cible).

### MiniCart
Embarque des CartItem dont le lien du nom fait 22 px de haut (règle d'or 3). Se corrige dans CartItem, puis à re-tester. Le reste (Drawer, états Filled, Empty, Loading, ItemRemoved, axe clair et sombre) est conforme.

### ShoppingBasket
Même cause : liens de nom de produit de 28 px de haut. Se corrige dans CartItem, puis à re-tester.

### Badge
Pas de story pour `tone="inverse"` (fond `color-action-white`, sur fond sombre). Correction attendue : story `Inverse` sur fond `color-surface-inverse`, avec le même décorateur que Logo.

### IconButton
Pas de story pour la propriété `size` (`sm`, `md`, `lg`). Correction attendue : stories pour `md` et `lg` (ou une story qui montre les trois) ; vérifier aussi que `pressed` a sa story.

### Radio
L'état Erreur (bordure 2 px `color-feedback-error` et message) n'a pas de story, alors que Checkbox a la sienne. Correction attendue : story `Error` avec un message d'erreur.

### EmailSignup
Trois états de la fiche n'ont pas de story : Erreur (« Adresse e-mail invalide »), Succès (« Merci, vous êtes inscrit »), Échec serveur (« L'inscription n'a pas abouti. Réessayez. »). Correction attendue : stories `Error`, `Success` et `ServerFailure`, par une fonction `play` qui saisit une adresse et valide, ou par un `onSubscribe` qui résout ou rejette.

### Footer
Les états d'inscription de la fiche (erreur, chargement, succès, échec) n'ont pas de story : seules `Default` et `CustomCopyright` existent. Correction attendue : stories pour ces états, même méthode qu'EmailSignup.

## Avertissements (non bloquants)

1. Noms de stories en anglais et en casse de titre (`Not Dismissible`, `Field Errors`, `Long Name`, `With Icon`...) alors que le BRIEF impose le français et la casse de phrase. À corriger avec la propriété `name` de chaque story. Concerne les 37 composants.
2. FilterChip : l'état Retrait (fondu de sortie puis suppression) n'a pas de story.
3. Aucun test Playwright dans `tests/` : à écrire pour que `npm run test:ui` et `npm run shots` servent à la boucle des pages.
4. `workflow/blocages.md` note que le MCP Storybook (`test-run`) n'a pas tourné. Les contrôles équivalents ont été faits ici sur Storybook statique, sauf `get_errors` de Next DevTools.

## Méthode
Playwright sur `storybook-static/` servi ponctuellement (pas de serveur long), Chromium local, axe (`@axe-core/playwright`), captures des cas suspects. Scripts hors dépôt.
