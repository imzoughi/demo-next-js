# QA page « compte-commandes » : VERT (tour 3)

Page hors Figma (écart accepté), jugée contre le design system, le reste du site et le BRIEF (ligne « Espace client »). Site construit (out/) servi sur :4010, largeurs 375, 768, 1280, 1440. Contrôle indépendant du 8 octobre 2026.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| Spécifique | VERT | Liste des 3 commandes, plus récente en tête ; statuts avec icônes Lucide ; tableau à 1440, liste empilée à 375 ; lien « Voir le détail » ouvre la fiche (testé) ; menu : « Commandes » en aria-current |
| npm run typecheck / build / docs:check | VERT | tsc sans erreur ; build OK (60 pages statiques, 3 fiches de commande prérendues) ; docs:check VERT (44 pages) |
| Captures 375 / 768 / 1280 / 1440 (connecté) | VERT | aucun débordement horizontal, aucune image cassée, rendu cohérent avec le reste du site (en-tête, pied de page, polices, couleurs) |
| Axe, connecté et non connecté | VERT | 0 serious / critical ; seul un « minor » aria-allowed-role (role tabpanel sur le formulaire AuthForm, déjà connu du design system) quand non connecté |
| Un h1 par page | VERT | 1 h1 dans chaque état (« Mon compte » non connecté) |
| Focus connexion / déconnexion | VERT | connexion : focus sur le h1 ; déconnexion : retour sur /compte/ et focus sur le h1 « Mon compte » ; connexion vide : focus sur l'e-mail + résumé role=alert |
| Session | VERT | rechargement : session gardée ; navigation par le menu : aria-current="page" sur la bonne entrée ; accès direct non connecté : formulaire de connexion |
| Règles d'or / BRIEF | VERT | SCSS sans couleur en dur (variables CSS uniquement), casse de phrase, icônes Lucide via Icon, composants du kit réutilisés (AccountMenu, AuthForm, OrderList, TextInput, Button, Toast, EmptyState, Breadcrumb, CheckoutProgress, OrderSummary) |
| Mouvement réduit | VERT | aucune animation propre aux pages (seul le fondu 160 ms du badge panier, déjà livré) |
| React / Next | VERT | pas de waterfall (getAccount / getStores en Promise.all côté serveur), état client limité au fournisseur de session (useSyncExternalStore, pas d'écart d'hydratation), pas d'empilement de booléens, aucune erreur de page à l'exécution. get_errors MCP non appelé (non disponible pour le contrôleur) |
| Erreurs 404 de ressource | VERT (hors page) | voir remarque 1 : préchargements de segments RSC, communs à tout le site |
| Performance | NON MESURÉ | Lighthouse non lancé ; poids JS gzip ≈ 167 Ko, comparable au panier (164 Ko) ; images 0 à 18 Ko |

## Écarts bloquants
Aucun.

## Remarques non bloquantes (valables pour les 5 pages)
1. Deux 404 de ressource (non liées à ces pages) : le navigateur demande des fichiers de préchargement `/<page>/__next.!KHNpdGUp.<page>.__PAGE__.txt?_rsc=...` alors que le build les écrit en sous-dossiers (`out/<page>/__next.!KHNpdGUp/<page>/__PAGE__.txt`). Cela se produit aussi sur accueil, liste-produits, fiche-produit, panier. La navigation reste correcte (repli automatique). Probablement lié au build sous Windows ou à `serve` ; à confirmer sur le build GitHub Pages (Linux). Aucune autre ressource en 404 (pas d'image, de police ni de script).
2. Sur 375 px, le menu du compte (5 lignes, environ 270 px) passe avant le titre : le titre et le début du contenu sont sous la ligne de flottaison. Pas bloquant (menu lisible, atteignable au clavier, ordre du DOM logique), mais gênant : à lisser plus tard (menu replié ou en défilement horizontal, ou titre avant le menu).
3. `compte.module.scss` : les requêtes `@container (min-width: 1440px)` de `.cardsThree` et `.orderGrid` ne se déclenchent jamais, même avec une fenêtre de 1440 px (le conteneur mesure environ 1376 px). Conséquences : l'accueil du compte affiche 2 + 1 cartes (une case vide à droite) au lieu de 3 de front, et sur la fiche de commande, adresse, paiement et récapitulatif restent sous les articles au lieu d'une colonne latérale. Correction : abaisser le seuil (par exemple 1280px, ou la largeur utile du contenu) ou mesurer par rapport au viewport.
4. Styles en ligne (`style={{ margin: ... }}`) sur les titres de `OrderDetail.tsx` : valeurs en variables CSS, donc conformes, mais à passer dans le SCSS.

---

## Tour 2 (après correction des 3 remarques) : VERT

Contrôle indépendant après modification de `compte.module.scss`, `AccountShell.tsx`, `OrderDetail.tsx`. Mêmes méthodes qu'au tour 1 (site construit servi sur :4010, 4 largeurs, Playwright + axe).

| Contrôle | Statut | Détail |
| --- | --- | --- |
| typecheck / build / docs:check | VERT | tsc sans erreur, build 60 pages, docs:check VERT (44 pages) |
| Captures 375 / 768 / 1280 / 1440 (6 vues connectées) | VERT | aucun débordement, aucune image cassée, un h1 par vue. 1440 : accueil en 3 cartes de front, fiche de commande avec colonne latérale (adresse, paiement, récapitulatif) ; 1280 : menu en onglets horizontaux, 3 cartes ; 768 et 375 : menu replié, contenu empilé |
| Axe (6 vues à 375 et 1280, menu mobile ouvert, non connecté) | VERT | 0 violation ; seul le « minor » aria-allowed-role d'AuthForm non connecté (inchangé) |
| Menu mobile (clavier) | VERT | bouton « Menu du compte : <rubrique> » avec aria-expanded et aria-controls ; Entrée et Espace ouvrent / ferment ; menu fermé = liens retirés de l'ordre de tabulation ; ouvert = ordre bouton, Accueil, Commandes, Informations, Magasin, Déconnexion, puis le contenu ; se referme au changement de page et le libellé suit la rubrique ; déconnexion depuis le menu mobile : retour /compte/, focus sur le h1 |
| Régressions (connexion, session, aria-current, rechargement, fiches de commande, formulaires, mot de passe, magasin, favori, déconnexion) | VERT | rejoués à l'identique, résultats identiques au tour 1 |
| Styles en ligne / couleurs en dur / animations | VERT | plus aucun `style={{` dans `compte/` ; pas de couleur en dur ; aucune transition ou animation ajoutée |

### Remarques non bloquantes restantes
1. Menu mobile, focus après navigation : après avoir choisi une rubrique dans le menu ouvert, le menu se referme et le lien activé disparaît, donc le focus tombe sur `<body>` (le focus reste sur le lien en version bureau). Le comportement équivaut à un chargement de page, mais mieux vaudrait déplacer le focus sur le h1 de la nouvelle page (ou sur le bouton du menu).
2. Menu mobile, seuil : le bouton apparaît jusqu'à environ 834 px de fenêtre (le seuil de 768 px est mesuré sur le conteneur, qui est plus étroit que la fenêtre de 64 px environ). À 768 px la tablette a donc le menu replié ; acceptable, mais différent du « sous 768 px » annoncé.
3. Échap ne ferme pas le menu mobile (pas obligatoire pour un bouton de type « disclosure » ; Entrée / Espace le referment).
4. Remarques 1 (404 de préchargement RSC, commun à tout le site) du tour 1 : inchangée. Performance : toujours non mesurée par le contrôleur (JS gzip inchangé, environ 167 Ko).

---

## Tour 3 : VERT

Contrôle indépendant après modification de `AccountShell.tsx` et `compte.module.scss`. Les remarques 1 et 2 du tour 2 sont réglées ; la remarque 3 (Échap) aussi.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| typecheck / build / docs:check | VERT | tsc sans erreur, build 60 pages, docs:check VERT |
| Captures 375 / 768 / 1024 / 1280 / 1440 (6 vues connectées) | VERT | aucun débordement avec barres de défilement masquées (cas par défaut), aucune image cassée, un h1 par vue ; onglets alignés sur le contenu à 768, 1024 et 1279 px (marge négative + retrait compensés) ; dernière carte impaire sur toute la ligne (accueil 2 colonnes, magasins à 1024) |
| Axe (6 vues × 5 largeurs, menu mobile ouvert) | VERT | 0 violation |
| Clavier 375 | VERT | Entrée / Espace ouvrent le menu ; Échap le ferme et rend le focus au bouton, y compris depuis un lien du menu ; choix d'une rubrique : le menu se referme, le focus va sur le h1 de la nouvelle page (« Mes informations »), Tab suit l'ordre du contenu |
| Clavier 768 et 1280 | VERT | à 768 le bouton est masqué, onglets visibles ; Entrée sur un onglet : focus sur le h1, aria-current correct ; 1280 : idem, et ouverture d'une fiche de commande depuis la liste : focus sur le h1 |
| Premier chargement direct | VERT | focus non déplacé (reste en haut de page, comportement natif) |
| Connexion / déconnexion | VERT | déconnexion depuis le menu mobile : /compte/, focus sur le h1 ; reconnexion : focus sur le h1 « Bonjour Camille » |
| Régressions tours 1 et 2 | VERT | session, rechargement, fiches de commande, informations, mot de passe, magasin, favori : comportements identiques |

### Limite signalée : 768 px avec barre de défilement classique
Constat réel, différent de la description : entre 768 et environ 782 px de fenêtre avec une barre de défilement classique (15 px), le bouton de repli est bien masqué et les onglets restent sur une ligne (ce n'est pas une liste verticale), mais ils débordent de 8 px : une barre de défilement horizontale apparaît sur les pages du compte (cause : marge négative de `.menuWrap` entre 768 et 1279 px, calculée sur 1 page sans compter la barre). Au-delà de 783 px et avec les barres masquées ou en superposition (tablette, iPad, simulation d'appareil), aucun débordement.
**Acceptable pour cette démo : oui, non bloquant** (plage de 15 px, fenêtres de bureau très étroites uniquement). Correction possible : remplacer la marge négative par un `overflow-x: clip` sur `.layout` / `.page`, ou calculer la marge sur `100cqw`.

### Remarques non bloquantes restantes
- Remarque 1 du tour 1 (404 de préchargement RSC, commun à tout le site) : inchangée.
- Performance : non mesurée par le contrôleur (`npm run perf` à lancer par la session principale).
