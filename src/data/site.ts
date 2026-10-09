// Site Decade (Next.js) : pages et groupes du portail. Même contenu que src/data/site.json de la branche HTML.
export type Page = { id: string; href: string; title: string; group: string };
export type Group = { title: string; icon: string; text: string };

export const site = {
  name: "Avion — Boutique démo",
  stackLabel: "Next.js / React",
  dsVersion: "1.0.0",
  repo: "",
  groups: [
    { title: "Catalogue", icon: "Store", text: "Accueil, liste de produits, fiche produit." },
    { title: "Achat", icon: "ShoppingCart", text: "Panier, paiement." },
    { title: "Compte", icon: "User", text: "Connexion, accueil de l’espace client, commandes, informations et magasin favori." },
  ] satisfies Group[],
  pages: [
    { id: "accueil", href: "/accueil", title: "Accueil", group: "Catalogue" },
    { id: "liste-produits", href: "/liste-produits", title: "Liste de produits", group: "Catalogue" },
    { id: "fiche-produit", href: "/fiche-produit", title: "Fiche produit", group: "Catalogue" },
    { id: "panier", href: "/panier", title: "Panier", group: "Achat" },
    { id: "paiement", href: "/paiement", title: "Paiement", group: "Achat" },
    { id: "compte", href: "/compte", title: "Compte", group: "Compte" },
    { id: "compte-commandes", href: "/compte/commandes", title: "Commandes", group: "Compte" },
    { id: "compte-commande", href: "/compte/commandes/10530", title: "Fiche de commande", group: "Compte" },
    { id: "compte-informations", href: "/compte/informations", title: "Informations", group: "Compte" },
    { id: "compte-magasin", href: "/compte/magasin", title: "Magasin favori", group: "Compte" },
  ] satisfies Page[],
};
