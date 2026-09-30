# BRIEF — boutique-demo

| Sujet | Décision |
| --- | --- |
| Client / marque | Démo e-commerce (kit Figma « just ux — ecommerce user interface kit ») |
| Lien Figma (agence) | https://www.figma.com/design/3OoNGDC710p5mgPCe6IkmN |
| Contenu du Figma | 2 pages seulement : « Cover » et « Style Guide » (couleurs, typographie, boutons, champ texte, stepper, case à cocher, carte produit, carte avantage, icônes). **Aucune maquette de page.** |
| Maquettes des pages | **En attente de l’agence** : https://www.figma.com/design/3OoNGDC710p5mgPCe6IkmN/E-Commerce-Website-Interface-Kit---Design-System--Completely-Free---Community-?node-id=1-3&p=f&m=dev |
| Versions retenues (Figma) | accueil v2 (114:5362 / 114:5761) · liste-produits v3 (45:684 / 109:1661) · fiche-produit v2 (11:123 / 114:6398) · panier v2 (119:3539 / 119:3664) — desktop / mobile · paiement, compte, mini-panier composés à partir des composants du kit (écart accepté) |
| Stack cible | nextjs (Next.js App Router) — modifiable sans perte jusqu’à l’étape 4 (design system), plus après `/import-ds` |
| Langue | français |
| Police du texte / des titres | Texte : Satoshi (14 / 16 / 18, interligne 1,5) · Titres : Clash Display Regular (H1 36 → H6 14, interligne 1,4) |
| Couleurs (Figma) | Dark primary #2A254B · Light grey #F9F9F9 · Primary, Border grey, Border dark, White (valeurs à relever à l’audit) |
| Casse | casse de phrase partout (pas de majuscules de style) |
| Boutons | 2 tailles (medium 56 px, small 48 px) · 5 types : primary, secondary, white, opaque, ghost · états défaut, survol, focus, désactivé · icône à droite en option |
| Formulaires | champ texte (variantes primary et opaque) · case à cocher · stepper de quantité — labels, aide et erreurs à préciser avec l’agence |
| Icônes | Lucide (le Figma utilise des icônes Carbon : correspondance à faire) |
| Couches (drawers) | mini-panier (aperçu du panier après ajout) |
| Cartes produit | 2 tailles (small, large) · état survol · hauteurs égales |
| Navigation | à définir avec les maquettes de l’agence |
| Listing | à définir avec les maquettes de l’agence |
| Pages à produire | accueil, liste-produits, fiche-produit, panier, paiement, compte (une par ligne dans workflow/backlog.md) |
| Largeurs testées | 375, 768, 1280, 1440 px |
| Animations | niveau sobre, respect de « réduire les animations » |
| Navigateurs / appareils | 2 dernières versions des navigateurs courants, 375 → 1440 px |
| Node / OS de l’équipe | Node 22, Windows |
| Hébergement des maquettes | GitHub Pages |
| Délai | pas de date fixe (projet de démo) |
| Validé par le pilote | validé |
| Recette du pilote | validé |
