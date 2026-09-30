// Données du site (portail et documentation) : pages du BRIEF et groupes. À mettre à jour quand une page est intégrée
// (passer `status` à "prête").
export type PageStatus = "à venir" | "prête";
export type Page = { id: string; href: string; title: string; group: string; status: PageStatus };
export type Group = { title: string; icon: string; text: string };

const groups: Group[] = [
  { title: "Catalogue", icon: "Store", text: "Accueil, liste produits, fiche produit." },
  { title: "Tunnel d’achat", icon: "ShoppingCart", text: "Panier et paiement." },
  { title: "Compte", icon: "User", text: "Espace client." },
];

const pages: Page[] = [
  { id: "accueil", href: "/accueil/", title: "Accueil", group: "Catalogue", status: "à venir" },
  { id: "liste-produits", href: "/liste-produits/", title: "Liste produits", group: "Catalogue", status: "à venir" },
  { id: "fiche-produit", href: "/fiche-produit/", title: "Fiche produit", group: "Catalogue", status: "à venir" },
  { id: "panier", href: "/panier/", title: "Panier", group: "Tunnel d’achat", status: "à venir" },
  { id: "paiement", href: "/paiement/", title: "Paiement", group: "Tunnel d’achat", status: "à venir" },
  { id: "compte", href: "/compte/", title: "Compte", group: "Compte", status: "à venir" },
];

export const site = {
  name: "Avion",
  client: "Démo e-commerce",
  projet: "boutique-demo",
  stackLabel: "Next.js / React",
  dsVersion: "1.0.0",
  groups,
  pages,
};
