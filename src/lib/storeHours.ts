// Horaires des magasins : fonctions pures (aucun accès au DOM ni à l'horloge hors paramètre), faciles à tester.
// Tous les calculs se font à l'heure de Paris, quel que soit le fuseau de l'ordinateur du visiteur.
import type { DayHours, TimeRange } from '@/mocks/types';

export const STORE_TIME_ZONE = 'Europe/Paris';

const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'] as const;
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const parisParts = new Intl.DateTimeFormat('en-US', {
  timeZone: STORE_TIME_ZONE,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export interface ParisClock {
  /** 0 = dimanche … 6 = samedi. */
  day: number;
  /** Minutes écoulées depuis minuit. */
  minutes: number;
}

/** Jour de la semaine et heure à Paris pour un instant donné. */
export function getParisClock(date: Date): ParisClock {
  let weekday = 'Sun';
  let hour = 0;
  let minute = 0;
  for (const part of parisParts.formatToParts(date)) {
    if (part.type === 'weekday') weekday = part.value;
    else if (part.type === 'hour') hour = Number(part.value) % 24;
    else if (part.type === 'minute') minute = Number(part.value);
  }
  return { day: WEEKDAY_INDEX[weekday] ?? 0, minutes: hour * 60 + minute };
}

/** « 10:00 » donne 600. */
export function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

/** « 19:00 » donne « 19 h » ; « 18:30 » donne « 18 h 30 ». */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
}

function rangesOf(hours: DayHours[], day: number): TimeRange[] {
  const ranges = hours.find((d) => d.day === day)?.ranges ?? [];
  return [...ranges].sort((a, b) => toMinutes(a.open) - toMinutes(b.open));
}

export interface StoreStatus {
  open: boolean;
  /** Texte complet, lisible sans la couleur : « Ouvert · ferme à 19 h », « Fermé · ouvre lundi à 10 h »… */
  label: string;
}

/** Statut ouvert ou fermé d'un magasin à un instant donné, avec la prochaine ouverture ou fermeture. */
export function getStoreStatus(hours: DayHours[], date: Date = new Date()): StoreStatus {
  const { day, minutes } = getParisClock(date);
  const today = rangesOf(hours, day);

  const current = today.find((r) => minutes >= toMinutes(r.open) && minutes < toMinutes(r.close));
  if (current) return { open: true, label: `Ouvert · ferme à ${formatTime(current.close)}` };

  const later = today.find((r) => toMinutes(r.open) > minutes);
  if (later) return { open: false, label: `Fermé · ouvre à ${formatTime(later.open)}` };

  for (let step = 1; step <= 7; step += 1) {
    const nextDay = (day + step) % 7;
    const first = rangesOf(hours, nextDay)[0];
    if (first) return { open: false, label: `Fermé · ouvre ${DAY_NAMES[nextDay]} à ${formatTime(first.open)}` };
  }
  return { open: false, label: 'Fermé' };
}

function capitalize(v: string): string {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function describeRanges(ranges: TimeRange[]): string {
  return ranges.length ? ranges.map((r) => `${formatTime(r.open)} – ${formatTime(r.close)}`).join(' et ') : 'fermé';
}

/**
 * Horaires lisibles, une ligne par groupe de jours consécutifs identiques (semaine de lundi à dimanche) :
 * « Lundi au samedi : 10 h – 19 h », « Dimanche : 11 h – 18 h ». Les jours de fermeture sont omis.
 */
export function formatOpeningHours(hours: DayHours[]): string[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups: { first: number; last: number; text: string }[] = [];
  for (const day of order) {
    const ranges = rangesOf(hours, day);
    if (!ranges.length) continue;
    const text = describeRanges(ranges);
    const prev = groups[groups.length - 1];
    if (prev && prev.text === text && order.indexOf(prev.last) === order.indexOf(day) - 1) prev.last = day;
    else groups.push({ first: day, last: day, text });
  }
  const lines = groups.map((g) => {
    const days = g.first === g.last ? capitalize(DAY_NAMES[g.first]) : `${capitalize(DAY_NAMES[g.first])} au ${DAY_NAMES[g.last]}`;
    return `${days} : ${g.text}`;
  });
  const closed = order.filter((d) => !rangesOf(hours, d).length);
  if (closed.length && closed.length < 7) lines.push(`Fermé : ${closed.map((d) => DAY_NAMES[d]).join(', ')}`);
  return lines;
}
