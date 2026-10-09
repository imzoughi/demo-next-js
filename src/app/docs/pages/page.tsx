// Pages & maquettes : aperçu de chaque page (bureau), lien vers la page réelle, fiche de chaque page (route, composants, données, maquette).
import Link from "next/link";
import { Hero } from "@/docs/Hero";
import { site } from "@/data/site";
import { withBase } from "@/lib/paths";

const figma = "Figma";
const noMockup = "Pas de maquette : composée avec le kit (le Figma ne contient que la couverture et le guide de style).";

// Fiches : une ligne par page du site (même ordre que src/data/site.ts).
const fiches: { page: string; route: string; components: string; data: string; source: string }[] = [
  { page: "Accueil", route: "/accueil/", components: "HeroBlocks, Features, Listings, EmailSignup", data: "getHomeContent, getFeaturedProducts", source: `${figma} accueil v2 : bureau 114:5362, mobile 114:5761` },
  { page: "Liste de produits", route: "/liste-produits/", components: "PageHeader, Filters, FiltersSheet (mobile), Listings", data: "getProductList : produits, groupes de filtres, options de tri", source: `${figma} liste-produits v3 : bureau 45:684, mobile 109:1661` },
  { page: "Fiche produit", route: "/fiche-produit/", components: "ProductDetails, Listings, Features, EmailSignup", data: "getProductPage, getHomeContent", source: `${figma} fiche-produit v2 : bureau 11:123, mobile 114:6398` },
  { page: "Panier", route: "/panier/", components: "ShoppingBasket, CartItem, Toast", data: "lignes du panier de démonstration, conservées dans le navigateur", source: `${figma} panier v2 : bureau 119:3539, mobile 119:3664` },
  { page: "Paiement", route: "/paiement/", components: "CheckoutProgress, OrderSummary, TextInput, Radio, Checkbox, Button, EmptyState", data: "prix formatés (lib/format), liens du site (mocks/site)", source: noMockup },
  { page: "Compte (connexion, accueil)", route: "/compte/", components: "AuthForm (connexion), AccountMenu, TextLink", data: "getAccount : profil, commandes, adresses ; session simulée", source: noMockup },
  { page: "Commandes", route: "/compte/commandes/", components: "OrderList, AccountMenu", data: "getAccount : liste des commandes", source: noMockup },
  { page: "Fiche de commande", route: "/compte/commandes/10530/ · 10517/ · 10482/", components: "Breadcrumb, CheckoutProgress, OrderSummary, AccountMenu", data: "getOrder(numéro) ; numéro inconnu : page introuvable", source: noMockup },
  { page: "Informations", route: "/compte/informations/", components: "TextInput, Button, Toast, AccountMenu", data: "profil du compte (modifiable pendant la session)", source: noMockup },
  { page: "Magasin favori", route: "/compte/magasin/", components: "TextInput, EmptyState, Toast, AccountMenu", data: "getStores : liste des magasins de démonstration", source: noMockup },
];

// Comportements de l’espace client (démo : aucune authentification réelle, session gardée dans l’onglet).
const comportements = [
  "Sans session, /compte/ affiche la connexion (AuthForm) ; la création de compte utilise le même formulaire. Avec session, l’accueil montre la dernière commande, les adresses et le magasin favori.",
  "Le menu du compte comporte quatre rubriques : Accueil, Commandes, Informations, Magasin. Sous 768 px, il se replie. La rubrique active reste en surbrillance, y compris sur une fiche de commande.",
  "La liste des commandes mène aux trois fiches de démonstration (10530, 10517, 10482). Un numéro inconnu affiche la page introuvable.",
  "La fiche de commande montre la progression de la commande (CheckoutProgress) et son récapitulatif (OrderSummary).",
  "Informations : profil (prénom, nom, e-mail, téléphone) et mot de passe. Les erreurs sont résumées en haut du formulaire, la confirmation s’affiche dans un toast.",
  "Magasin : recherche par ville ou code postal, puis choix d’un magasin favori (un seul). Le choix est confirmé par un toast et gardé pendant la session.",
  "Changement de rubrique : le focus rejoint le titre (h1) de la nouvelle page, pour les lecteurs d’écran et le clavier.",
];

export default function Pages() {
  return (
    <>
      <Hero kicker="Prise en main" title="Pages & maquettes" lead={`${site.pages.length} pages, regroupées par parcours.`} />
      {site.groups.map((g) => (
        <section key={g.title} className="doc-section">
          <h2>{g.title}</h2>
          <div className="doc-pages">
            {site.pages.filter((p) => p.group === g.title).map((p) => (
              <article key={p.id} className="doc-page">
                <div className="doc-page__thumb"><iframe src={withBase(`${p.href.replace(/\/+$/, "")}/`)} title={`Aperçu : ${p.title}`} loading="lazy" tabIndex={-1} aria-hidden /></div>
                <div className="doc-page__body"><h3><Link href={p.href}>{p.title}</Link></h3><code className="doc-page__file">{p.href}</code></div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <section className="doc-section">
        <h2>Fiches des pages</h2>
        <p className="doc-lead">Route, composants utilisés, données et source de la maquette. Les pages sans maquette sont composées avec les composants du kit (écart accepté dans le BRIEF).</p>
        <div className="doc-table" role="region" tabIndex={0} aria-label="Fiches des pages">
          <table>
            <thead><tr><th>Page</th><th>Route</th><th>Composants</th><th>Données</th><th>Maquette</th></tr></thead>
            <tbody>
              {fiches.map((f) => (
                <tr key={f.page}><td>{f.page}</td><td><code>{f.route}</code></td><td>{f.components}</td><td>{f.data}</td><td>{f.source}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="doc-section">
        <h2>Espace client : comportements</h2>
        <ul className="doc-list">
          {comportements.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>
    </>
  );
}
