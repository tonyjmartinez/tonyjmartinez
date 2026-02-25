import { styled } from "@linaria/react";
import { NBAStatBar } from "./NBAStatBar";
import type { StatLine } from "./types";

interface NBAStatGridProps {
  player: string;
  season: string;
  stats: StatLine[];
  /** Hex or CSS color for the bars. */
  color?: string;
}

/**
 * Displays a full stat line for one player as a grid of animated bars.
 *
 * @example
 * <NBAStatGrid
 *   player="Luka Dončić"
 *   season="2023-24"
 *   stats={[
 *     { label: "PPG", value: 33.9, max: 40 },
 *     { label: "RPG", value: 9.2,  max: 15 },
 *     { label: "APG", value: 9.8,  max: 15 },
 *   ]}
 * />
 */
export function NBAStatGrid({ player, season, stats, color }: NBAStatGridProps) {
  return (
    <GridWrapper aria-label={`${player} ${season} stats`}>
      <GridHeader>
        <PlayerName>{player}</PlayerName>
        <SeasonLabel>{season}</SeasonLabel>
      </GridHeader>
      <StatList>
        {stats.map((stat) => (
          <li key={stat.label}>
            <NBAStatBar
              label={stat.label}
              value={stat.value}
              max={stat.max}
              {...(color !== undefined && { color })}
            />
          </li>
        ))}
      </StatList>
    </GridWrapper>
  );
}

const GridWrapper = styled.div`
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-block: 2rem;
`;

const GridHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const PlayerName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  margin: 0;
`;

const SeasonLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-bg-emphasis);
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
`;

const StatList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 0;
  margin: 0;
`;
