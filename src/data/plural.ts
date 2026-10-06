// Accord au pluriel français : 0 et 1 restent au singulier (« 0 page », « 1 page », « 2 pages »).
export const plural = (n: number, one: string, many = `${one}s`): string => `${n} ${n > 1 ? many : one}`;
