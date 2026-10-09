/** Accent tones from the Rosette design system. Each passes AAA contrast with ink text. */
export const tones = ['bloom', 'sun', 'mint', 'lilac', 'coral'] as const;
export type Tone = (typeof tones)[number];

/** Illustration styles drawn by <PlantArt>. */
export type ArtKind =
  | 'rosette'
  | 'colony'
  | 'aloe'
  | 'zebra'
  | 'jade'
  | 'pearls'
  | 'tail'
  | 'pebbles'
  | 'sword'
  | 'fuzzy'
  | 'bush';
