# Inventaire des composants — boutique-demo

Pack du 30/09/2026 · 8 groupes, 37 composants. Le même ordre alimente `workflow/backlog.md` (section Composants).
Nommage Decade : PascalCase, variantes par rôle (`primary`, `secondary`, `sm`, `md`). « Source » = nœud Figma du maître ; « nouveau » = absent du Figma, composé à partir du kit (écart accepté par le pilote, corrections UX cochées).
Pour tous les composants interactifs : états défaut, survol, focus visible (anneau 2 px `color.focus.ring`, décalage 2 px), actif, désactivé ; zone cliquable ≥ 44 px ; casse de phrase ; textes en français.

## 1. Fondations et icônes (2)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| Icon | Pictogramme Lucide, taille 16 / 20 / 24, couleur héritée du texte | `name`, `size` (sm 16, md 20, lg 24) ; correspondance dans `assets/icons-map.md` | décoratif (`aria-hidden`) ou avec nom accessible | 122:4285 (16 icônes Carbon) |
| Logo | Marque « Avion », texte en Clash Display, centré en en-tête, blanc sur fond sombre | `tone` (default, inverse) | lien vers l'accueil, focus | texte dans 109:874 (pas de fichier logo) |

## 2. Actions (3)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| Button | Action principale et secondaires | `type` : primary, secondary, white, opaque, ghost ; `size` : md (56 px), sm (48 px) ; `iconRight` (booléen) ; `fullWidth` en mobile | défaut, survol, focus, actif, désactivé, chargement (nouveau : indicateur + désactivé) | 52:237 (md), 114:2370 (sm) |
| IconButton | Bouton icône seul (recherche, panier, compte, menu, fermer) avec zone 44 × 44 px, icône inchangée | `icon`, `label` (obligatoire), `tone` (default, inverse) | défaut, survol, focus, actif, désactivé | nouveau (icônes 16 px de 45:660 à 45:662) |
| TextLink | Lien texte : « Retirer », « Continuer mes achats », liens du pied de page | `tone` (default, brand, inverse) | défaut, survol (soulignement), focus, visité | nouveau |

## 3. Formulaires (4)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| TextInput | Champ texte avec label visible, aide et message d'erreur / succès sous le champ | `variant` : primary, opaque (sur fond sombre) ; `label`, `hint`, `error`, `success`, `hideLabel` (masqué visuellement, lu par les lecteurs d'écran), `type` (text, email, tel, numeric), `autocomplete` | défaut, survol, focus, rempli, désactivé, erreur, succès | 52:269 |
| Checkbox | Case à cocher ; toute la ligne (case + libellé) est cliquable, hauteur ≥ 44 px | `checked`, `label`, `count` (compteur de filtre) | défaut, survol, focus, cochée, désactivée, erreur | 52:304 |
| Radio | Choix unique (mode de livraison, moyen de paiement) | `label`, `hint` | défaut, survol, focus, sélectionné, désactivé | nouveau — extension du kit, écart à valider |
| Stepper | Quantité : bouton −, valeur, bouton + ; signes en `color.text.default`, boutons 44 × 44 px, bornes 1 et stock max | `min`, `max`, `value` | défaut, focus, − désactivé au minimum, + désactivé au maximum, désactivé | 52:275 |

## 4. Cartes (3)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| ProductCard | Image, nom, prix ; hauteurs égales dans une grille, images au même ratio, lien vers la fiche | `size` : sm, lg ; `name`, `price`, `image` | défaut, survol (soulèvement small + ombre), focus, chargement (squelette) | 52:318 |
| FeatureCard | Avantage : pictogramme, titre H4, texte 16 px (fond Light Grey selon la page) | `icon`, `title`, `text`, `filled` | statique | 67:715 |
| CartItem | Ligne d'article du panier et du mini-panier : image, nom, description, prix, Stepper, total de ligne, lien « Retirer » | `context` : page, drawer ; `name`, `description`, `unitPrice`, `quantity` | défaut, retrait en cours (message annulable), quantité au maximum | Shopping basket 119:3539 (composé) |

## 5. Retours et états (5)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| Toast | Message bref (« Article retiré · Annuler », « Ajouté au panier ») ; `role="status"`, annulable | `tone` : info, success, error ; `action` (Annuler) | apparition, disparition auto après 6 s (pause au survol), fermeture | nouveau |
| Skeleton | Squelette de chargement au même ratio que l'image ou le texte remplacé | `shape` : card, line, image | pulsation d'opacité | nouveau |
| EmptyState | Titre, phrase courte, bouton : panier vide, liste sans résultat | `kind` : cart, results ; `action` | statique | nouveau |
| Badge | Pastille de quantité sur l'icône panier (99+ au-delà) | `count` | 0 (masquée), 1 à 99+ | nouveau |
| FilterChip | Puce de filtre actif, retirable au clavier et au toucher (zone 44 px) | `label`, `onRemove` | défaut, survol, focus, retrait | nouveau |

## 6. Couches (3)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| Drawer | Panneau latéral générique : voile, titre, croix, focus piégé, fermeture Échap et clic extérieur ; retour du focus au déclencheur | `side` : right, bottom ; `fullScreenMobile` | fermé, ouverture, ouvert, fermeture | nouveau |
| MiniCart | Aperçu du panier après ajout : articles, sous-total, « Voir le panier » (Secondary), « Commander » (Primary) | `items`, `subtotal` | plein, vide, chargement, article retiré (annulable) | nouveau (absent du Figma) |
| FiltersSheet | Panneau plein écran depuis le bas en mobile : filtres, tri, « Voir les N résultats », « Tout effacer » | `sections`, `resultCount` | fermé, ouvert, aucun résultat | nouveau (interaction de 122:3085) |

## 7. Navigation (4)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| TopNav | En-tête : recherche, logo centré, panier avec Badge, compte, rangée de catégories ; mobile identique sur toutes les pages : recherche, panier avec pastille, menu (ouvre un Drawer) | `device` : desktop, mobile ; `activeCategory` | défaut, catégorie active, menu mobile ouvert | Top Nav (109:874, 114:6060, 119:2278 ; mobile 119:3384, 114:6979) |
| Breadcrumb | Fil d'Ariane « Accueil › Catégorie › Produit », `nav` étiqueté, page courante non cliquable | `items` | défaut, survol, focus, troncature mobile | nouveau |
| Banner | Bandeau d'annonce fermable, au-dessus de l'en-tête | `dismissible` | défaut, fermé | Banners (114:6043) |
| Footer | Menu, catégories, entreprise, inscription à la lettre d'information, réseaux sociaux, copyright | `device` : desktop, mobile | liens : défaut, survol, focus | Footer (109:1145) |

## 8. Sections de page (13)
| Composant | Rôle | Variantes / propriétés | États | Source |
| --- | --- | --- | --- | --- |
| HeroBlocks | Hero d'accueil : titre, texte, bouton White sur fond sombre (correction UX), image | `device` | défaut | Hero Blocks (109:868) |
| Features | Rangée de 4 FeatureCard | `columns` (4, 2, 1) | statique | Features |
| Listings | Grille de ProductCard avec titre de section et « Voir la collection » | `columns` (4, 2, 1), `size` | défaut, chargement, vide | Listings |
| EmailSignup | Inscription à la lettre d'information : TextInput (label masqué visuellement) + Button | `tone` : light, dark | défaut, erreur (« Adresse e-mail invalide »), succès, chargement | Email sign-up (109:1072) |
| PageHeader | Bandeau image avec H1 (un seul H1 par page) | `title`, `image` | statique | Page Headers |
| Filters | Groupes de filtres en Checkbox, compteur de produits, puces actives, « Tout effacer » | `resultCount`, `active` | défaut, filtres actifs, aucun résultat | Filters (114:3148) |
| ProductDetails | Fiche : fil d'Ariane, galerie, titre, prix, description, dimensions, Stepper, « Ajouter au panier » ; pile verticale, écarts 16 / 24 / 32 | `device` | ajout : défaut, chargement, succès (ouvre le MiniCart), stock max | Product Details (114:6083) |
| ShoppingBasket | Tableau des articles (CartItem), « Continuer mes achats », sous-total, « Passer la commande » | `device` | plein, vide (EmptyState), article retiré | Shopping basket (119:3260) |
| CheckoutProgress | Étapes numérotées du tunnel : 1 Livraison, 2 Paiement, 3 Confirmation | `current` | étape faite, courante, à venir | nouveau |
| OrderSummary | Récapitulatif de commande : lignes, sous-total, livraison, total | `context` : panier, paiement | défaut, chargement | nouveau |
| AuthForm | Connexion / création de compte : TextInput, Checkbox, Button, lien « Mot de passe oublié » | `mode` : login, register | défaut, erreur de champ, erreur globale, chargement | nouveau |
| AccountMenu | Navigation du compte : profil, commandes, adresses, déconnexion (onglets en desktop, liste en mobile) | `active` | défaut, actif, focus | nouveau |
| OrderList | Liste des commandes : numéro, date, statut, total, lien « Voir le détail » | `orders` | plein, vide (EmptyState), chargement | nouveau |

## Anatomie des pages (versions retenues)
| Page | Desktop 1440 | Mobile 390 | Composants, dans l'ordre |
| --- | --- | --- | --- |
| accueil (v2) | 114:5362 | 114:5761 | Banner, TopNav, HeroBlocks, Features, Listings, EmailSignup, Footer |
| liste-produits (v3) | 45:684 | 109:1661 | TopNav, PageHeader, Filters (FiltersSheet en mobile), FilterChip, Listings, EmailSignup, Footer |
| fiche-produit (v2) | 11:123 | 114:6398 | Banner, TopNav, Breadcrumb, ProductDetails, Features, Listings, EmailSignup, Footer |
| panier (v2) | 119:3539 | 119:3664 | TopNav, ShoppingBasket (CartItem, Stepper, OrderSummary), Footer ; EmptyState si vide |
| paiement (absent) | à composer | à composer | TopNav, CheckoutProgress, TextInput, Radio, Checkbox, OrderSummary, Button, Footer |
| compte (absent) | à composer | à composer | TopNav, AuthForm ou (AccountMenu, OrderList), Footer |
| mini-panier (absent) | drawer | plein écran | MiniCart (Drawer, CartItem, Button) |
| tablette 768 | à déduire | | pas de maquette : grilles 4 → 2 colonnes, en-tête desktop compact, filtres en panneau |
