# Corrections UX — boutique-demo (audit du 30/09/2026)

Score B = 50 / 100 (seuil 75). Cochez les corrections que vous acceptez : Claude Design les appliquera.
Toutes gardent l'identité : logo « Avion », couleurs (#2A254B, #4E4D93, #F9F9F9, #EBE8F4, blanc), polices Clash Display et Satoshi, ton. Les lignes marquées **écart** changent quelque chose de visible par rapport au Figma : votre accord vaut validation de l'écart.

## Accessibilité et lisibilité

- [x] **Stepper (52:275, fiche et panier)** — « − / + » à 1,2:1 et cibles minuscules — signes en Dark Primary #2A254B (désactivé : 40 % d'opacité), boutons de 44 × 44 px, bornes 1 et stock max — règles : contraste ≥ 4,5:1, cibles ≥ 44 px, états. **Écart** (couleur des signes, taille).
- [x] **Tous les éléments cliquables** — focus invisible (52:259) — contour 2 px Primary #4E4D93 décalé de 2 px (blanc sur fond sombre) — règle : focus visible.
- [x] **Champ texte (52:269)** — placeholder à 1,5:1, pas de label — placeholder en Dark Primary à 60 %, label visible au-dessus (masqué visuellement seulement dans la newsletter du pied de page, mais lu par les lecteurs d'écran) — règles : labels visibles, contraste. **Écart** (label ajouté).
- [x] **En-tête (Top Nav)** — icônes 16 px sans zone de clic — zone de 44 × 44 px autour de chaque icône, icône inchangée — règle : cibles ≥ 44 px.
- [x] **Cases à cocher des filtres (114:3148)** — zone ≈ 16 px — toute la ligne (case + libellé) cliquable, hauteur ≥ 44 px — règle : cibles ≥ 44 px.
- [X] **Texte courant (pied de page, filtres, cartes avantages)** — 14 px — passer à Body Medium 16 px ; 14 px réservé aux mentions secondaires — règle : texte courant ≥ 16 px. **Écart** (taille).

## Espacements

- [x] **Toutes les pages** — écarts de 12 / 14 / 15 px — arrondir à l'échelle 4/8 (8, 12 → 12, 14/15 → 16, 24, 32, 48, 64, 96) ; plus d'air entre sections qu'à l'intérieur — règle : rythme régulier.
- [x] **Fiche produit (114:6083)** — blocs posés à la main — pile verticale : titre, prix, description, dimensions, quantité, actions, écarts 16 / 24 / 32 — règle : rythme.

## Parcours

- [x] **Panier (27:1215, 119:3383)** — pas de suppression d'article — lien « Retirer » sous chaque article (confirmation par un message annulable) — règle : retour arrière possible.
- [x] **Panier** — pas de sortie — lien « Continuer mes achats » à côté du titre — règle : peu de clics, retour arrière.
- [x] **Fiche produit (11:123)** — pas de repère — fil d'Ariane « Accueil › Catégorie › Produit » au-dessus du titre — règle : parcours clair.
- [x] **Liste produits (45:242, 122:2990)** — filtres sans retour — compteur « 24 produits », filtres actifs sous forme de puces retirables, bouton « Tout effacer » — règle : filtres clairs.
- [x] **Liste produits mobile (122:3085)** — filtres et tri sans comportement défini — panneau plein écran depuis le bas, bouton « Voir les N résultats », fermeture par la croix et Échap — règle : couches accessibles.
- [x] **En-tête mobile** — icône panier absente sur le panier (119:3384) — même en-tête mobile partout : recherche, panier avec pastille de quantité, menu — règle : cohérence.
- [x] **Accueil (109:868)** — bouton du hero peu visible (Opaque sur fond sombre) — bouton White sur le fond sombre du hero — règle : action principale évidente. **Écart** (variante de bouton, déjà dans le kit).

## Retours et états

- [x] **Ajout au panier (61:376)** — aucun retour — bouton en chargement (désactivé + indicateur), puis ouverture du mini-panier — règle : chargement et succès.
- [x] **Mini-panier (absent du Figma)** — à composer avec les composants du kit : panneau à droite (plein écran en mobile), articles, sous-total, « Voir le panier » (Secondary) et « Commander » (Primary), fermeture croix + Échap + clic extérieur, focus piégé — règle : couches accessibles. **Écart** (écran non dessiné).
- [x] **Panier vide** — titre, phrase courte, bouton « Découvrir la collection » — règle : état vide.
- [x] **Liste sans résultat** — message et bouton « Effacer les filtres » — règle : état vide.
- [x] **Chargement de la liste / « Load more »** — squelettes de cartes au même ratio que les images — règle : chargement.
- [x] **Newsletter (109:1072)** — pas de retour — message de succès et message d'erreur sous le champ (« Adresse e-mail invalide ») — règle : erreurs sous le champ.

## Formulaires (paiement et compte, absents du Figma)

- [x] **Paiement et compte** — à composer avec TextInput, Checkbox et Button si l'agence ne livre pas : un champ par ligne en mobile, label au-dessus, aide et erreur sous le champ, bons claviers (e-mail, téléphone, numérique pour code postal et carte), étapes numérotées dans le tunnel — règles : formulaires, parcours. **Écart** (écrans non dessinés).

## Contenus

- [x] **Toutes les pages** — textes en anglais, produits tous identiques — textes en français, noms et prix variés, un nom long pour le test de retour à la ligne, prix en euros — règle : contenus réalistes. **Écart** (texte et devise).
- [x] **Casse** — en français, casse de phrase partout (« Ajouter au panier », « Voir la collection ») — règle : casse de phrase (config).
