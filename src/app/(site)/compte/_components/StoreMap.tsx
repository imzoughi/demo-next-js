'use client';

// Carte des magasins (Leaflet 1.9, fond OpenStreetMap). Leaflet touche à `window` : il n'est chargé que dans un effet,
// côté navigateur, et la carte est détruite au démontage. Les repères sont des divIcon habillés par tokens (les images PNG
// par défaut de Leaflet cassent avec le basePath de GitHub Pages). La carte complète la liste, elle ne la remplace pas :
// repères et carte ne prennent pas le focus clavier, la liste propose les mêmes actions.
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import type * as Leaflet from 'leaflet';
import type { Store } from '@/lib/api';
import { getStoreStatus } from '@/lib/storeHours';
import styles from './store-finder.module.scss';

const TILES = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">contributeurs OpenStreetMap</a>';
const FRANCE: Leaflet.LatLngTuple = [46.6, 2.4];
const svg = (inner: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const ICON_PIN = svg('<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>');
const ICON_OPEN = svg('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>');
const ICON_CLOSED = svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const ICON_STAR = svg('<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>');
const ICON_CHECK_SM = svg('<path d="M20 6 9 17l-5-5"/>');
const CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

export interface FocusRequest {
  id: string;
  /** Change à chaque demande : permet de recentrer deux fois de suite sur le même magasin. */
  n: number;
}

export interface StoreMapProps {
  /** Magasins affichés (déjà filtrés par la recherche). Doit rester stable entre deux rendus tant que le filtre ne change pas. */
  stores: Store[];
  favoriteId: string | null;
  selectedId: string | null;
  focusRequest: FocusRequest | null;
  /** Heure courante (ms) ou null avant le montage : le statut de la bulle n'est affiché qu'une fois connu. */
  now: number | null;
  onSelect: (id: string) => void;
  onChoose: (id: string) => void;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ligne de la bulle : icône décorative + texte. */
function row(icon: string, text: string, className: string): HTMLElement {
  const el = document.createElement('p');
  el.className = className;
  const ic = document.createElement('span');
  ic.className = styles.popupIcon;
  ic.innerHTML = icon; // constantes du fichier uniquement, jamais de donnée utilisateur
  const t = document.createElement('span');
  t.textContent = text;
  el.append(ic, t);
  return el;
}

function line(tag: 'p', text: string, className?: string): HTMLElement {
  const el = document.createElement(tag);
  el.textContent = text;
  if (className) el.className = className;
  return el;
}

export function StoreMap(props: StoreMapProps) {
  const { stores, favoriteId, selectedId, focusRequest } = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const libRef = useRef<typeof Leaflet | null>(null);
  const layerRef = useRef<Leaflet.LayerGroup | null>(null);
  const markersRef = useRef(new Map<string, Leaflet.Marker>());
  const latest = useRef(props);
  const originRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    latest.current = props;
  });

  // Création de la carte (navigateur seulement) et nettoyage au démontage.
  useEffect(() => {
    let cancelled = false;
    let map: Leaflet.Map | undefined;
    const markers = markersRef.current;
    import('leaflet').then((mod) => {
      const host = hostRef.current;
      if (cancelled || !host) return;
      const L = ((mod as { default?: typeof Leaflet }).default ?? mod) as typeof Leaflet;
      const calm = reducedMotion();
      map = L.map(host, {
        zoomControl: false,
        attributionControl: false,
        keyboard: false,
        scrollWheelZoom: false,
        zoomAnimation: !calm,
        fadeAnimation: !calm,
        markerZoomAnimation: !calm,
        inertia: !calm,
      }).setView(FRANCE, 5);
      L.tileLayer(TILES, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map);
      L.control.zoom({ position: 'bottomright', zoomInTitle: 'Zoom avant', zoomOutTitle: 'Zoom arrière' }).addTo(map);
      L.control.attribution({ prefix: '<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>' }).addTo(map);
      // Échap ferme la bulle et rend le focus à l'élément d'origine (bouton « Voir sur la carte ») s'il existe encore.
      const onKey = (ev: KeyboardEvent) => {
        if (ev.key !== 'Escape') return;
        map?.closePopup();
        const origin = originRef.current;
        if (origin?.isConnected) origin.focus();
      };
      map.on('popupopen', () => document.addEventListener('keydown', onKey));
      map.on('popupclose', () => document.removeEventListener('keydown', onKey));
      map.on('unload', () => document.removeEventListener('keydown', onKey));
      map.on('popupopen', (e) => e.popup.getElement()?.querySelector('.leaflet-popup-close-button')?.setAttribute('aria-label', 'Fermer la bulle'));
      layerRef.current = L.layerGroup().addTo(map);
      libRef.current = L;
      mapRef.current = map;
      setReady(true);
    });
    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
      layerRef.current = null;
      libRef.current = null;
      markers.clear();
    };
  }, []);

  // Un repère par magasin affiché, puis cadrage de la carte sur ces magasins.
  useEffect(() => {
    const L = libRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!ready || !L || !map || !layer) return;
    layer.clearLayers();
    markersRef.current.clear();

    function buildPopup(s: Store): HTMLElement {
      // Largeur de la bulle bornée à celle de la carte (marges du contenu et de la carte comprises).
      const popup = markersRef.current.get(s.id)?.getPopup();
      if (popup) popup.options.maxWidth = Math.max(160, Math.min(300, (mapRef.current?.getSize().x ?? 372) - 72));
      const { favoriteId: fav, now, onChoose } = latest.current;
      const root = document.createElement('div');
      root.className = styles.popupBody;
      root.append(line('p', s.name, `${styles.popupTitle} h5`), row(ICON_PIN, `${s.address}, ${s.postalCode} ${s.city}`, `${styles.popupRow} body-medium`));
      if (now !== null) {
        const status = getStoreStatus(s.openingHours, new Date(now));
        root.append(row(status.open ? ICON_OPEN : ICON_CLOSED, status.label, `${styles.status} ${status.open ? styles.statusOpen : styles.statusClosed} body-medium`));
      }
      const button = document.createElement('button');
      button.type = 'button';
      const isFav = s.id === fav;
      button.className = `${styles.popupButton} ${isFav ? styles.popupButtonFav : ''} body-medium`;
      const label = document.createElement('span');
      label.textContent = isFav ? 'Magasin favori' : 'Choisir ce magasin';
      const bi = document.createElement('span');
      bi.className = styles.popupIcon;
      bi.innerHTML = isFav ? ICON_CHECK_SM : ICON_STAR;
      button.append(label, bi);
      if (isFav) button.setAttribute('aria-label', `Magasin favori : ${s.name}, activer pour retirer des favoris`);
      button.addEventListener('click', () => {
        onChoose(s.id);
        mapRef.current?.closePopup();
      });
      root.append(button);
      return root;
    }

    for (const s of stores) {
      const marker = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          className: styles.marker,
          html: `<span class="${styles.pin}">${CHECK}</span>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18],
        }),
        title: s.name,
        keyboard: false,
      });
      marker.bindPopup(() => buildPopup(s), { maxWidth: 300, closeButton: true, autoPan: false });
      marker.on('click', () => {
        // La bulle ne décale pas la carte (autoPan: false) : on centre le repère lui-même.
        map.setView(marker.getLatLng(), map.getZoom(), { animate: !reducedMotion() });
        latest.current.onSelect(s.id);
      });
      marker.addTo(layer);
      markersRef.current.set(s.id, marker);
    }

    if (stores.length === 1) map.setView([stores[0].lat, stores[0].lng], 13, { animate: false });
    else if (stores.length > 1) {
      map.fitBounds(L.latLngBounds(stores.map((s) => [s.lat, s.lng] as Leaflet.LatLngTuple)), { padding: [40, 40], maxZoom: 13, animate: false });
    }
  }, [ready, stores]);

  // Repère favori et repère sélectionné : classes posées sur l'élément, sans recréer le repère (la bulle reste ouverte).
  useEffect(() => {
    if (!ready) return;
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      el?.classList.toggle(styles.markerFavorite, id === favoriteId);
      el?.classList.toggle(styles.markerSelected, id === selectedId);
      marker.setZIndexOffset(id === selectedId ? 1000 : id === favoriteId ? 500 : 0);
    });
  }, [ready, stores, favoriteId, selectedId]);

  // « Voir sur la carte » : centre la carte sur le magasin et ouvre sa bulle.
  useEffect(() => {
    const map = mapRef.current;
    const marker = focusRequest ? markersRef.current.get(focusRequest.id) : undefined;
    if (!ready || !map || !marker) return;
    const calm = reducedMotion();
    originRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), 13), { animate: !calm });
    marker.openPopup(); // autoPan désactivé : le repère reste exactement au centre
    wrapRef.current?.scrollIntoView({ block: 'center', behavior: calm ? 'auto' : 'smooth' });
  }, [ready, focusRequest]);

  return (
    <div ref={wrapRef} className={styles.mapWrap} role="region" aria-label="Carte des magasins">
      <div ref={hostRef} className={styles.map} />
      {ready ? null : (
        <p className={`${styles.mapLoading} body-medium`} role="status">
          Chargement de la carte
        </p>
      )}
    </div>
  );
}
