import type { CSSProperties } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleUser,
  CreditCard,
  LoaderCircle,
  Lock,
  MapPin,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sprout,
  Trash2,
  Truck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cx } from '@/lib/cx';
import { SOCIAL_ICONS, type SocialIconName } from './social-icons';

export type { SocialIconName };
import styles from './Icon.module.scss';

/** Icônes Lucide du design system (trait fin, couleur héritée). */
const LUCIDE: Record<string, LucideIcon> = {
  'arrow-left': ArrowLeft,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  'circle-user': CircleUser,
  'credit-card': CreditCard,
  'loader-circle': LoaderCircle,
  lock: Lock,
  'map-pin': MapPin,
  menu: Menu,
  minus: Minus,
  package: Package,
  plus: Plus,
  search: Search,
  'shopping-cart': ShoppingCart,
  'sliders-horizontal': SlidersHorizontal,
  sprout: Sprout,
  'trash-2': Trash2,
  truck: Truck,
  x: X,
};

export const iconNames = [
  'arrow-left',
  'check',
  'chevron-down',
  'chevron-right',
  'circle-alert',
  'circle-check',
  'circle-user',
  'credit-card',
  'loader-circle',
  'lock',
  'map-pin',
  'menu',
  'minus',
  'package',
  'plus',
  'search',
  'shopping-cart',
  'sliders-horizontal',
  'sprout',
  'trash-2',
  'truck',
  'x',
] as const;

export const socialIconNames = ['facebook', 'instagram', 'linkedin', 'pinterest', 'skype', 'twitter'] as const;

export type LucideIconName = (typeof iconNames)[number];
export type IconName = LucideIconName | SocialIconName;
export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps {
  /** Nom de l'icône (Lucide, ou logo social Carbon pour le pied de page). */
  name: IconName;
  /** sm 16 px, md 20 px, lg 24 px (défaut). */
  size?: IconSize;
  /** Nom accessible : l'icône devient `role="img"`. Absent, elle est décorative (`aria-hidden`). */
  label?: string;
  /** Rotation de chargement (loader-circle), bornée à 4,8 s. */
  spin?: boolean;
  /** Épaisseur du trait Lucide (1,5 par défaut). */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/** Pictogramme en SVG en ligne qui prend la couleur du texte qui l'entoure. */
export function Icon({ name, size = 'lg', label, spin, strokeWidth = 1.5, className, style }: IconProps) {
  const cls = cx(styles.root, styles[size], spin && styles.spin, className);
  const a11y = label ? ({ role: 'img', 'aria-label': label } as const) : ({ 'aria-hidden': true } as const);
  const Lucide = LUCIDE[name];
  if (Lucide) {
    return (
      <Lucide
        className={cls}
        style={style}
        strokeWidth={strokeWidth}
        focusable="false"
        data-icon={name}
        {...a11y}
      />
    );
  }
  const social = SOCIAL_ICONS[name as SocialIconName];
  if (!social) return null;
  return (
    <svg
      className={cls}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={social.viewBox}
      fill="currentColor"
      focusable="false"
      data-icon={name}
      {...a11y}
    >
      {social.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
