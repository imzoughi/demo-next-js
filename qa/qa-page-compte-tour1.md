# QA page « compte », tour 1 : VERT

Page hors Figma (écart accepté) : contrôlée contre le design system (AuthForm, AccountMenu, OrderList) et les règles « Formulaires » de ux-corrections.md. Site construit servi sur :4000 (`out/`). Largeurs 375, 768, 1280, 1440.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check | VERT | lint, tsc, build sans erreur ; /compte prérendu |
| Connexion : validation | VERT | envoi vide : focus sur l'e-mail, 2 messages + résumé « 2 champs sont à corriger » ; e-mail invalide : message + aria-invalid + aria-describedby |
| Autocomplete | VERT | connexion email / current-password (type=email) ; création given-name, family-name, email, new-password |
| Création de compte | VERT | envoi vide : focus Prénom, « 4 champs sont à corriger » ; mot de passe court : focus mot de passe, « Au moins 8 caractères » |
| Connexion simulée | VERT | focus sur le H1 « Bonjour Camille » |
| Sections | VERT | Commandes / Adresses / Informations : focus sur le H2, aria-current mis à jour, atteignables et activables au clavier (Entrée) |
| Voir le détail | VERT | message role=status « Le détail de la commande N° 10530 n'est pas disponible dans cette démo. » |
| Déconnexion | VERT | retour au formulaire, focus sur le H1 « Mon compte » |
| Un seul H1 par état | VERT | 1 H1 dans chaque état, aux 2 largeurs |
| Captures 375/768/1280/1440 | VERT | pas de débordement horizontal, texte non coupé, cartes d'adresses égales (tmp-qa/compte/*.png) |
| Axe (connexion, erreurs, création, commandes, adresses, infos) | VERT | 0 problème sérieux ; seulement 1 « minor » aria-allowed-role sur le formulaire (voir remarques) |
| Console | VERT | 0 erreur ; seul un 404 (favicon, absent du dépôt) vu une fois à 375 |
| React / Next | VERT | pas de waterfall, composant client limité à l'état ; focus géré en effet ciblé ; pas d'empilement de booléens. get_errors MCP non appelé (non disponible pour le contrôleur), build et navigation propres |
| Règles d'or | VERT | SCSS en variables CSS uniquement, aucune couleur en dur, composants du kit réutilisés, casse de phrase, icônes lucide |
| Mouvement réduit | NON TESTÉ | aucune animation propre à la page |

## Performance (médiane de 3, preset desktop, /compte/)
Score 99, LCP 906 ms, CLS 0, TBT 11 ms, JS 289 Ko (seuil 300 : marge faible), images 0 Ko. Tous les seuils respectés.

## Écarts bloquants
Aucun.

## Remarques non bloquantes (pour l'intégrateur / le design system)
- AuthForm : `role="tabpanel"` sur le `<form>` déclenche l'alerte axe mineure aria-allowed-role ; les onglets n'ont ni aria-controls ni navigation aux flèches. À corriger côté design system.
- Le Nom saisi à la création n'est pas repris (les infos affichent « Martin », donnée fictive).
- Un second clic sur « Voir le détail » d'une même commande ne ré-annonce pas le message (texte identique).
- Le H2 focalisé montre un cadre pleine largeur à 1280+ (cosmétique).
- JS à 289 Ko : surveiller.

## Choix à faire valider par le pilote (hors verdict)
1. Menu limité à Commandes / Adresses / Informations (le kit propose Profil / Commandes / Adresses).
2. H1 posé directement, sans PageHeader.
3. Détail de commande non disponible (simple message d'état).
4. Adresses et informations en lecture seule.
5. « Mot de passe oublié » pointe vers # (lien mort).
