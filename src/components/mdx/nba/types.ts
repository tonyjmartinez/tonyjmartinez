export interface StatLine {
  label: string;
  /** The player's value for this stat. */
  value: number;
  /** Maximum value used to calculate the bar width (e.g. 40 for PPG). */
  max: number;
}

export interface PlayerData {
  name: string;
  /** Hex color representing the player's team. */
  color: string;
  /** Stat label → value map, e.g. { PPG: 33.9, RPG: 9.2 } */
  stats: Record<string, number>;
}
