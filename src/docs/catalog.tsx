// Catalogue de la documentation (Next.js / React) : une entrée par composant, tenue à jour par /import-ds.
// Généré par scripts/build-catalog.mjs (npm run docs:catalog) : ne pas modifier à la main.
// Source unique : les stories. Une story = un exemple du portail = un test (Storybook test-run), avec son code dessous.
// composeStories (portable stories de Storybook) rend chaque story utilisable hors de Storybook.
import type { ComponentType } from "react";
import { composeStories } from "@storybook/react";
import * as IconStories from "@/components/ui/Icon/Icon.stories";
import * as LogoStories from "@/components/ui/Logo/Logo.stories";
import * as ButtonStories from "@/components/ui/Button/Button.stories";
import * as IconButtonStories from "@/components/ui/IconButton/IconButton.stories";
import * as TextLinkStories from "@/components/ui/TextLink/TextLink.stories";
import * as CheckboxStories from "@/components/ui/Checkbox/Checkbox.stories";
import * as RadioStories from "@/components/ui/Radio/Radio.stories";
import * as StepperStories from "@/components/ui/Stepper/Stepper.stories";
import * as TextInputStories from "@/components/ui/TextInput/TextInput.stories";
import * as BadgeStories from "@/components/ui/Badge/Badge.stories";
import * as EmptyStateStories from "@/components/blocks/EmptyState/EmptyState.stories";
import * as FilterChipStories from "@/components/ui/FilterChip/FilterChip.stories";
import * as SkeletonStories from "@/components/ui/Skeleton/Skeleton.stories";
import * as ToastStories from "@/components/ui/Toast/Toast.stories";
import * as CartItemStories from "@/components/blocks/CartItem/CartItem.stories";
import * as FeatureCardStories from "@/components/blocks/FeatureCard/FeatureCard.stories";
import * as ProductCardStories from "@/components/blocks/ProductCard/ProductCard.stories";
import * as BannerStories from "@/components/blocks/Banner/Banner.stories";
import * as BreadcrumbStories from "@/components/blocks/Breadcrumb/Breadcrumb.stories";
import * as FooterStories from "@/components/blocks/Footer/Footer.stories";
import * as TopNavStories from "@/components/blocks/TopNav/TopNav.stories";
import * as AccountMenuStories from "@/components/blocks/AccountMenu/AccountMenu.stories";
import * as AuthFormStories from "@/components/blocks/AuthForm/AuthForm.stories";
import * as CheckoutProgressStories from "@/components/blocks/CheckoutProgress/CheckoutProgress.stories";
import * as EmailSignupStories from "@/components/blocks/EmailSignup/EmailSignup.stories";
import * as FeaturesStories from "@/components/blocks/Features/Features.stories";
import * as FiltersStories from "@/components/blocks/Filters/Filters.stories";
import * as HeroBlocksStories from "@/components/blocks/HeroBlocks/HeroBlocks.stories";
import * as ListingsStories from "@/components/blocks/Listings/Listings.stories";
import * as OrderListStories from "@/components/blocks/OrderList/OrderList.stories";
import * as OrderSummaryStories from "@/components/blocks/OrderSummary/OrderSummary.stories";
import * as PageHeaderStories from "@/components/blocks/PageHeader/PageHeader.stories";
import * as ProductDetailsStories from "@/components/blocks/ProductDetails/ProductDetails.stories";
import * as ShoppingBasketStories from "@/components/blocks/ShoppingBasket/ShoppingBasket.stories";
import * as DrawerStories from "@/components/ui/Drawer/Drawer.stories";
import * as FiltersSheetStories from "@/components/blocks/FiltersSheet/FiltersSheet.stories";
import * as MiniCartStories from "@/components/blocks/MiniCart/MiniCart.stories";
import { storyCode } from "./jsx";

export type Example = { name: string; Render: ComponentType; code: string };
export type Entry = { id: string; title: string; group: string; ds?: string; files: string[]; hooks?: string[]; page?: string; examples: Example[] };

type Composed = ComponentType & { storyName?: string; args?: Record<string, unknown>; parameters?: { docs?: { source?: { code?: string } } } };
const toExamples = (title: string, mod: Record<string, unknown>): Example[] =>
  Object.entries(composeStories(mod as never) as unknown as Record<string, Composed>)
    .map(([name, S]) => ({ name: S.storyName ?? name, Render: S, code: storyCode(title, S) }));

export const groups = ["Fondations","Actions","Formulaires","Retours et états","Cartes","Navigation","Sections de page","Couches"];

export const components: Entry[] = [
  { id: "icon", title: "Icon", group: "Fondations", ds: "Icon", files: ["src/components/ui/Icon/Icon.tsx", "Icon.module.scss", "Icon.stories.tsx"], examples: toExamples("Icon", IconStories) },
  { id: "logo", title: "Logo", group: "Fondations", ds: "Logo", files: ["src/components/ui/Logo/Logo.tsx", "Logo.module.scss", "Logo.stories.tsx"], examples: toExamples("Logo", LogoStories) },
  { id: "button", title: "Button", group: "Actions", ds: "Button", files: ["src/components/ui/Button/Button.tsx", "Button.module.scss", "Button.stories.tsx"], page: "Accueil", examples: toExamples("Button", ButtonStories) },
  { id: "icon-button", title: "IconButton", group: "Actions", ds: "IconButton", files: ["src/components/ui/IconButton/IconButton.tsx", "IconButton.module.scss", "IconButton.stories.tsx"], examples: toExamples("IconButton", IconButtonStories) },
  { id: "text-link", title: "TextLink", group: "Actions", ds: "TextLink", files: ["src/components/ui/TextLink/TextLink.tsx", "TextLink.module.scss", "TextLink.stories.tsx"], examples: toExamples("TextLink", TextLinkStories) },
  { id: "checkbox", title: "Checkbox", group: "Formulaires", ds: "Checkbox", files: ["src/components/ui/Checkbox/Checkbox.tsx", "Checkbox.module.scss", "Checkbox.stories.tsx"], examples: toExamples("Checkbox", CheckboxStories) },
  { id: "radio", title: "Radio", group: "Formulaires", ds: "Radio", files: ["src/components/ui/Radio/Radio.tsx", "Radio.module.scss", "Radio.stories.tsx"], examples: toExamples("Radio", RadioStories) },
  { id: "stepper", title: "Stepper", group: "Formulaires", ds: "Stepper", files: ["src/components/ui/Stepper/Stepper.tsx", "Stepper.module.scss", "Stepper.stories.tsx"], examples: toExamples("Stepper", StepperStories) },
  { id: "text-input", title: "TextInput", group: "Formulaires", ds: "TextInput", files: ["src/components/ui/TextInput/TextInput.tsx", "TextInput.module.scss", "TextInput.stories.tsx"], page: "Paiement, Informations, Magasin", examples: toExamples("TextInput", TextInputStories) },
  { id: "badge", title: "Badge", group: "Retours et états", ds: "Badge", files: ["src/components/ui/Badge/Badge.tsx", "Badge.module.scss", "Badge.stories.tsx"], examples: toExamples("Badge", BadgeStories) },
  { id: "empty-state", title: "EmptyState", group: "Retours et états", ds: "EmptyState", files: ["src/components/blocks/EmptyState/EmptyState.tsx", "EmptyState.module.scss", "EmptyState.stories.tsx"], examples: toExamples("EmptyState", EmptyStateStories) },
  { id: "filter-chip", title: "FilterChip", group: "Retours et états", ds: "FilterChip", files: ["src/components/ui/FilterChip/FilterChip.tsx", "FilterChip.module.scss", "FilterChip.stories.tsx"], examples: toExamples("FilterChip", FilterChipStories) },
  { id: "skeleton", title: "Skeleton", group: "Retours et états", ds: "Skeleton", files: ["src/components/ui/Skeleton/Skeleton.tsx", "Skeleton.module.scss", "Skeleton.stories.tsx"], examples: toExamples("Skeleton", SkeletonStories) },
  { id: "toast", title: "Toast", group: "Retours et états", ds: "Toast", files: ["src/components/ui/Toast/Toast.tsx", "Toast.module.scss", "Toast.stories.tsx"], examples: toExamples("Toast", ToastStories) },
  { id: "cart-item", title: "CartItem", group: "Cartes", ds: "CartItem", files: ["src/components/blocks/CartItem/CartItem.tsx", "CartItem.module.scss", "CartItem.stories.tsx"], page: "Panier", examples: toExamples("CartItem", CartItemStories) },
  { id: "feature-card", title: "FeatureCard", group: "Cartes", ds: "FeatureCard", files: ["src/components/blocks/FeatureCard/FeatureCard.tsx", "FeatureCard.module.scss", "FeatureCard.stories.tsx"], examples: toExamples("FeatureCard", FeatureCardStories) },
  { id: "product-card", title: "ProductCard", group: "Cartes", ds: "ProductCard", files: ["src/components/blocks/ProductCard/ProductCard.tsx", "ProductCard.module.scss", "ProductCard.stories.tsx"], page: "Liste de produits", examples: toExamples("ProductCard", ProductCardStories) },
  { id: "banner", title: "Banner", group: "Navigation", ds: "Banner", files: ["src/components/blocks/Banner/Banner.tsx", "Banner.module.scss", "Banner.stories.tsx"], examples: toExamples("Banner", BannerStories) },
  { id: "breadcrumb", title: "Breadcrumb", group: "Navigation", ds: "Breadcrumb", files: ["src/components/blocks/Breadcrumb/Breadcrumb.tsx", "Breadcrumb.module.scss", "Breadcrumb.stories.tsx"], examples: toExamples("Breadcrumb", BreadcrumbStories) },
  { id: "footer", title: "Footer", group: "Navigation", ds: "Footer", files: ["src/components/blocks/Footer/Footer.tsx", "Footer.module.scss", "Footer.stories.tsx"], examples: toExamples("Footer", FooterStories) },
  { id: "top-nav", title: "TopNav", group: "Navigation", ds: "TopNav", files: ["src/components/blocks/TopNav/TopNav.tsx", "TopNav.module.scss", "TopNav.stories.tsx"], examples: toExamples("TopNav", TopNavStories) },
  { id: "account-menu", title: "AccountMenu", group: "Sections de page", ds: "AccountMenu", files: ["src/components/blocks/AccountMenu/AccountMenu.tsx", "AccountMenu.module.scss", "AccountMenu.stories.tsx"], page: "Toutes les pages du compte", examples: toExamples("AccountMenu", AccountMenuStories) },
  { id: "auth-form", title: "AuthForm", group: "Sections de page", ds: "AuthForm", files: ["src/components/blocks/AuthForm/AuthForm.tsx", "AuthForm.module.scss", "AuthForm.stories.tsx"], page: "Compte (connexion)", examples: toExamples("AuthForm", AuthFormStories) },
  { id: "checkout-progress", title: "CheckoutProgress", group: "Sections de page", ds: "CheckoutProgress", files: ["src/components/blocks/CheckoutProgress/CheckoutProgress.tsx", "CheckoutProgress.module.scss", "CheckoutProgress.stories.tsx"], page: "Paiement et fiche de commande", examples: toExamples("CheckoutProgress", CheckoutProgressStories) },
  { id: "email-signup", title: "EmailSignup", group: "Sections de page", ds: "EmailSignup", files: ["src/components/blocks/EmailSignup/EmailSignup.tsx", "EmailSignup.module.scss", "EmailSignup.stories.tsx"], page: "Accueil", examples: toExamples("EmailSignup", EmailSignupStories) },
  { id: "features", title: "Features", group: "Sections de page", ds: "Features", files: ["src/components/blocks/Features/Features.tsx", "Features.module.scss", "Features.stories.tsx"], page: "Accueil", examples: toExamples("Features", FeaturesStories) },
  { id: "filters", title: "Filters", group: "Sections de page", ds: "Filters", files: ["src/components/blocks/Filters/Filters.tsx", "Filters.module.scss", "Filters.stories.tsx"], page: "Liste de produits", examples: toExamples("Filters", FiltersStories) },
  { id: "hero-blocks", title: "HeroBlocks", group: "Sections de page", ds: "HeroBlocks", files: ["src/components/blocks/HeroBlocks/HeroBlocks.tsx", "HeroBlocks.module.scss", "HeroBlocks.stories.tsx"], page: "Accueil", examples: toExamples("HeroBlocks", HeroBlocksStories) },
  { id: "listings", title: "Listings", group: "Sections de page", ds: "Listings", files: ["src/components/blocks/Listings/Listings.tsx", "Listings.module.scss", "Listings.stories.tsx"], page: "Liste de produits", examples: toExamples("Listings", ListingsStories) },
  { id: "order-list", title: "OrderList", group: "Sections de page", ds: "OrderList", files: ["src/components/blocks/OrderList/OrderList.tsx", "OrderList.module.scss", "OrderList.stories.tsx"], page: "Commandes", examples: toExamples("OrderList", OrderListStories) },
  { id: "order-summary", title: "OrderSummary", group: "Sections de page", ds: "OrderSummary", files: ["src/components/blocks/OrderSummary/OrderSummary.tsx", "OrderSummary.module.scss", "OrderSummary.stories.tsx"], page: "Paiement et fiche de commande", examples: toExamples("OrderSummary", OrderSummaryStories) },
  { id: "page-header", title: "PageHeader", group: "Sections de page", ds: "PageHeader", files: ["src/components/blocks/PageHeader/PageHeader.tsx", "PageHeader.module.scss", "PageHeader.stories.tsx"], examples: toExamples("PageHeader", PageHeaderStories) },
  { id: "product-details", title: "ProductDetails", group: "Sections de page", ds: "ProductDetails", files: ["src/components/blocks/ProductDetails/ProductDetails.tsx", "ProductDetails.module.scss", "ProductDetails.stories.tsx"], page: "Fiche produit", examples: toExamples("ProductDetails", ProductDetailsStories) },
  { id: "shopping-basket", title: "ShoppingBasket", group: "Sections de page", ds: "ShoppingBasket", files: ["src/components/blocks/ShoppingBasket/ShoppingBasket.tsx", "ShoppingBasket.module.scss", "ShoppingBasket.stories.tsx"], page: "Panier", examples: toExamples("ShoppingBasket", ShoppingBasketStories) },
  { id: "drawer", title: "Drawer", group: "Couches", ds: "Drawer", files: ["src/components/ui/Drawer/Drawer.tsx", "Drawer.module.scss", "Drawer.stories.tsx"], examples: toExamples("Drawer", DrawerStories) },
  { id: "filters-sheet", title: "FiltersSheet", group: "Couches", ds: "FiltersSheet", files: ["src/components/blocks/FiltersSheet/FiltersSheet.tsx", "FiltersSheet.module.scss", "FiltersSheet.stories.tsx"], page: "Liste de produits", examples: toExamples("FiltersSheet", FiltersSheetStories) },
  { id: "mini-cart", title: "MiniCart", group: "Couches", ds: "MiniCart", files: ["src/components/blocks/MiniCart/MiniCart.tsx", "MiniCart.module.scss", "MiniCart.stories.tsx"], examples: toExamples("MiniCart", MiniCartStories) },
];
