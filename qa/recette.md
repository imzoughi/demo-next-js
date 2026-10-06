# Recette pilote — boutique-demo

QA : `qa/qa-all.md` **VERT** (5e passe, 06/10/2026).
Site : `npm run build` puis `npm start` (http://localhost:4000), ou la version publiée sur GitHub Pages (`/boutique-demo/<page>/`).
Comparer chaque page à sa maquette (`design/pack/captures/`) et à la capture produite (`tmp-qa/passe5/captures/<page>-<largeur>.png`).

## Pages (ordinateur 1440, puis téléphone 375)
- [x] **Accueil** — `/accueil/` · regarder : bandeau, cartes produit de même hauteur, inscription e-mail · réf. `accueil-desktop-1440.png` / `accueil-mobile-390.png`
- [x] **Liste produits** — `/liste-produits/` · regarder : filtre Catégorie (ordinateur), bouton « Filtres » (téléphone), Échap ferme · réf. `liste-produits-desktop-1440.png` / `liste-produits-mobile-390.png`
- [x] **Fiche produit** — `/fiche-produit/` · regarder : « Ajouter au panier » ouvre le tiroir ; à 5 exemplaires, le bouton se désactive avec un message · réf. `fiche-produit-desktop-1440.png` / `fiche-produit-mobile-390.png`
- [x] **Compte** — `/compte/` · regarder : connexion simulée (e-mail et mot de passe quelconques) · pas de maquette (composée avec le kit)

## Parcours et clavier
- [x] Fiche → tiroir → « Voir le panier » : le tiroir se ferme, même montant ; recommencer avec « Commander ».
- [x] Clavier : Tab reste dans le tiroir, Échap le ferme et rend le focus au bouton Panier.

## Portail
- [x] `/docs` sur téléphone : pas de défilement horizontal ; les exemples de code défilent au clavier.
- [x] `/docs/pages` : les 12 aperçus (bureau et mobile) s'affichent.
- [x] Une fiche composant : README lisible (titres, tableaux).

## À trancher (écarts de qa/qa-all.md)
- [x] Polices Red Hat Display / Manrope au lieu de Clash Display / Satoshi (n° 3).
- [x] Liens # du pied de page (n° 2) ; images accueil et liste un peu lourdes (O6).
- [x] Panier conservé par onglet (n° 34).
- [x] Autres écarts de pages (n° 1, 4 à 32) : valider ou demander une retouche.

## Publication
- [x] Les 404 « __next.!… » vues en local Windows disparaissent sur le déploiement GitHub Actions.

## Fin
- [x] Recette validée → remplir « Recette du pilote » dans `BRIEF.md`, puis lancer `/decade-front:publish`.
