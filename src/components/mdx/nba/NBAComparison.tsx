import { styled } from "@linaria/react";
import { motion, useReducedMotion } from "framer-motion";
import type { PlayerData } from "./types";

interface NBAComparisonProps {
  playerA: PlayerData;
  playerB: PlayerB;
  /** Which stat keys to display, in order. */
  stats: string[];
}

// Alias to keep the interface readable in MDX
type PlayerB = PlayerData;

/**
 * Side-by-side animated stat comparison between two players.
 * Each row shows both players' bars growing from center outward.
 *
 * @example
 * <NBAComparison
 *   playerA={{ name: "Luka Dončić", color: "#00538C", stats: { PPG: 33.9, APG: 9.8 } }}
 *   playerB={{ name: "SGA", color: "#007AC1", stats: { PPG: 30.1, APG: 6.4 } }}
 *   stats={["PPG", "APG"]}
 * />
 */
export function NBAComparison({ playerA, playerB, stats }: NBAComparisonProps) {
  const prefersReducedMotion = useReducedMotion();

  // Determine per-stat max as 120% of the higher value (so neither bar is always 100%)
  function getMax(stat: string): number {
    const a = playerA.stats[stat] ?? 0;
    const b = playerB.stats[stat] ?? 0;
    return Math.max(a, b) * 1.2;
  }

  return (
    <ComparisonWrapper aria-label={`${playerA.name} vs ${playerB.name}`}>
      {/* Player name headers */}
      <HeaderRow aria-hidden="true">
        <PlayerLabel style={{ color: playerA.color }}>{playerA.name}</PlayerLabel>
        <StatLabelCenter>Stat</StatLabelCenter>
        <PlayerLabel style={{ color: playerB.color, textAlign: "right" }}>
          {playerB.name}
        </PlayerLabel>
      </HeaderRow>

      {/* Stat rows */}
      {stats.map((stat) => {
        const aVal = playerA.stats[stat] ?? 0;
        const bVal = playerB.stats[stat] ?? 0;
        const max = getMax(stat);
        const aPct = Math.min(1, aVal / max);
        const bPct = Math.min(1, bVal / max);

        return (
          <StatRow key={stat}>
            {/* Player A bar (grows left) */}
            <BarCellLeft
              role="meter"
              aria-label={`${playerA.name} ${stat}: ${aVal}`}
              aria-valuenow={aVal}
              aria-valuemin={0}
              aria-valuemax={max}
            >
              <ValueA>{aVal}</ValueA>
              <TrackLeft>
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: playerA.color,
                    borderRadius: "inherit",
                    originX: 1,
                  }}
                  initial={{ scaleX: prefersReducedMotion ? aPct : 0 }}
                  animate={{ scaleX: aPct }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
                  }
                />
              </TrackLeft>
            </BarCellLeft>

            {/* Center stat label */}
            <StatLabel>{stat}</StatLabel>

            {/* Player B bar (grows right) */}
            <BarCellRight
              role="meter"
              aria-label={`${playerB.name} ${stat}: ${bVal}`}
              aria-valuenow={bVal}
              aria-valuemin={0}
              aria-valuemax={max}
            >
              <TrackRight>
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: playerB.color,
                    borderRadius: "inherit",
                    originX: 0,
                  }}
                  initial={{ scaleX: prefersReducedMotion ? bPct : 0 }}
                  animate={{ scaleX: bPct }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
                  }
                />
              </TrackRight>
              <ValueB>{bVal}</ValueB>
            </BarCellRight>
          </StatRow>
        );
      })}
    </ComparisonWrapper>
  );
}

const ComparisonWrapper = styled.div`
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin-block: 2rem;
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
`;

const PlayerLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const StatLabelCenter = styled.span`
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  text-align: center;
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.5rem;

  & + & {
    border-top: 1px solid var(--color-border);
  }
`;

const BarCellLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const BarCellRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TrackLeft = styled.div`
  width: 100%;
  max-width: 120px;
  height: 8px;
  background: var(--color-bg-emphasis);
  border-radius: 9999px;
  overflow: hidden;
  direction: rtl;
`;

const TrackRight = styled.div`
  width: 100%;
  max-width: 120px;
  height: 8px;
  background: var(--color-bg-emphasis);
  border-radius: 9999px;
  overflow: hidden;
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  text-align: center;
  min-width: 2.5rem;
`;

const ValueA = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
  min-width: 2rem;
  text-align: right;
`;

const ValueB = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
  min-width: 2rem;
`;
