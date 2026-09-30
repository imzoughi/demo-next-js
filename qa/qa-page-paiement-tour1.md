# QA — page paiement, tour 1 (30/09/2026)

**Verdict : VERT.** Aucun écart bloquant. (Rapport du contrôleur QA, recopié par la session principale.) Page absente du Figma : comparée au design system et aux règles « Formulaires ».

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| npm run check | VERT | /paiement statique |
| Tunnel 375 et 1440 | VERT | livraison → paiement (4242…) → confirmation AV-xxxxxx ; carte et date formatées |
| Messages d'erreur | VERT | obligatoire, e-mail, téléphone, code postal, carte (Luhn), date, code de sécurité |
| Bandeau d'erreurs | VERT | « N champs sont à corriger », role=alert, un seul |
| Focus | VERT | premier champ en erreur ; H2 de l'étape à chaque changement |
| Claviers et autocomplete | VERT | email, tel, numeric ; autocomplete complets |
| Radio au clavier | VERT | total mis à jour |
| Bouton Payer en chargement | VERT | aria-busy, aria-disabled, focus gardé |
| Panier vide | VERT | EmptyState, lien vers la collection |
| Récapitulatif | VERT | une seule région exposée à chaque largeur (l'autre en display:none) |
| Captures 375 / 768 / 1280 / 1440 | VERT | pas de débordement |
| axe | VERT | 0 violation dans tous les états |
| H1 unique, console | VERT | 0 erreur (404 favicon toléré) |
| get_errors | non mesuré | pas de MCP |
| Code React, règles d'or, mouvement | VERT | |

## Performance (Lighthouse desktop, médiane de 3)
Score 99 · LCP 901 ms · CLS 0 · TBT 17 ms · JS 290 Ko (proche du plafond de 300) · images 0 Ko.

## Remarques mineures
- `pattern="[0-9 ]*"` du kit appliqué au champ date « MM/AA » (sans effet, noValidate).
- `CheckoutView.tsx` : variable `alert` masque `window.alert` ; classe `.confirm` inutilisée ; setTimeout de focusFirst non nettoyé ; « Paiement en cours » non annoncé en zone live.

## Choix à valider par le pilote
1. Boutons « Retour » en Ghost. 2. Pays en champ texte « France ». 3. Panier non vidé après confirmation. 4. Facturation non détaillée. 5. Pas de modification de la livraison depuis la confirmation. 6. Carte jamais envoyée (démo, annoncé).
