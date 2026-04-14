// Chaldean Numerology System
const chaldeanMap: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return num;
}

export function calculateNameNumber(name: string): number {
  const total = name
    .toUpperCase()
    .split('')
    .filter((c) => chaldeanMap[c])
    .reduce((sum, c) => sum + chaldeanMap[c], 0);
  return reduceToSingle(total);
}

export function calculateBirthNumber(day: number): number {
  return reduceToSingle(day);
}

export function calculateDestinyNumber(day: number, month: number, year: number): number {
  const total = String(day).split('').reduce((s, d) => s + +d, 0)
    + String(month).split('').reduce((s, d) => s + +d, 0)
    + String(year).split('').reduce((s, d) => s + +d, 0);
  return reduceToSingle(total);
}

export function getCompatibility(nameNum: number, birthNum: number, destinyNum: number): {
  status: 'Favourable' | 'Neutral' | 'Needs Correction';
  message: string;
} {
  const favourable = [
    [1, 1], [1, 2], [1, 3], [1, 5], [1, 9],
    [2, 1], [2, 2], [2, 7], [2, 9],
    [3, 1], [3, 3], [3, 5], [3, 6], [3, 9],
    [5, 1], [5, 3], [5, 5], [5, 6], [5, 9],
    [6, 3], [6, 5], [6, 6], [6, 9],
    [7, 2], [7, 7],
    [8, 5], [8, 6],
    [9, 1], [9, 3], [9, 5], [9, 6], [9, 9],
  ];
  const isFavBirth = favourable.some(([a, b]) => a === nameNum && b === birthNum);
  const isFavDest = favourable.some(([a, b]) => a === nameNum && b === destinyNum);

  if (isFavBirth && isFavDest) {
    return { status: 'Favourable', message: 'Your name is highly compatible with your birth and destiny numbers. It supports success and prosperity.' };
  }
  if (isFavBirth || isFavDest) {
    return { status: 'Neutral', message: 'Your name has partial compatibility. A minor spelling adjustment could enhance its vibrational alignment.' };
  }
  return { status: 'Needs Correction', message: 'Your name may not be aligned with your numerological blueprint. Consider a name correction consultation for better harmony.' };
}

export const numberMeanings: Record<number, string> = {
  1: 'Leadership, independence, ambition.',
  2: 'Diplomacy, cooperation, sensitivity.',
  3: 'Creativity, expression, joy.',
  4: 'Stability, discipline, hard work.',
  5: 'Freedom, adventure, change.',
  6: 'Love, harmony, responsibility.',
  7: 'Spirituality, introspection, wisdom.',
  8: 'Power, wealth, material success.',
  9: 'Compassion, humanitarianism, completion.',
  11: 'Master Intuition – visionary and inspirational.',
  22: 'Master Builder – turning big dreams into reality.',
  33: 'Master Teacher – selfless service and healing.',
};
