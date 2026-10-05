import { WordOverride } from '../types';

export interface TokenizedWord {
  index: number;
  word: string;
  hasOverride: boolean;
  override?: WordOverride;
}

/**
 * Splits text into words while keeping track of indices.
 * Trims extra whitespace but preserves tokens.
 */
export function tokenizeText(text: string, overrides: Record<number, WordOverride> = {}): TokenizedWord[] {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  return words.map((word, index) => {
    const override = overrides[index];
    return {
      index,
      word,
      hasOverride: !!override && Object.keys(override).length > 1,
      override,
    };
  });
}

/**
 * Common vibrant color palettes for headline word highlights
 */
export const HIGHLIGHT_COLORS = [
  { label: 'Cyan Alert', hex: '#06b6d4' },
  { label: 'Neon Yellow', hex: '#facc15' },
  { label: 'Warning Red', hex: '#ef4444' },
  { label: 'Amber Gold', hex: '#f59e0b' },
  { label: 'Emerald Green', hex: '#10b981' },
  { label: 'Pure White', hex: '#ffffff' },
  { label: 'Pitch Black', hex: '#000000' },
  { label: 'Electric Sky', hex: '#38bdf8' },
  { label: 'Vibrant Coral', hex: '#fb7185' },
  { label: 'Bright Orange', hex: '#fb923c' },
  { label: 'Violet', hex: '#a855f7' },
];

export const MARKER_BG_COLORS = [
  { label: 'Yellow Marker', hex: '#facc15', textHex: '#000000' },
  { label: 'Cyan Marker', hex: '#06b6d4', textHex: '#000000' },
  { label: 'Red Tape', hex: '#ef4444', textHex: '#ffffff' },
  { label: 'Black Box', hex: '#000000', textHex: '#ffffff' },
  { label: 'White Box', hex: '#ffffff', textHex: '#000000' },
  { label: 'Lime Marker', hex: '#84cc16', textHex: '#000000' },
];
