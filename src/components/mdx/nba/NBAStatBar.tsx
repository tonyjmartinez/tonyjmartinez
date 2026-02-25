import { styled } from "@linaria/react";
import { motion, useReducedMotion } from "framer-motion";

interface NBAStatBarProps {
  label: string;
  value: number;
  /** Max value used to calculate percentage width. */
  max: number;
  /** Hex or CSS color for the bar fill. Defaults to accent blue. */
  color?: string;
}

/**
 * Animated horizontal bar for a single NBA stat.
 * Respects prefers-reduced-motion — bar appears instantly when motion is reduced.
 */
export function NBAStatBar({
  label,
  value,
  max,
  color = "var(--color-accent)",
}: NBAStatBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <BarRow>
      <BarLabel>{label}</BarLabel>
      <BarTrack
        role="meter"
        aria-label={`${label}: ${value}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: color,
            borderRadius: "inherit",
            originX: 0,
          }}
          initial={{ scaleX: prefersReducedMotion ? percentage / 100 : 0 }}
          animate={{ scaleX: percentage / 100 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
          }
        />
      </BarTrack>
      <BarValue>{value}</BarValue>
    </BarRow>
  );
}

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr 3rem;
  align-items: center;
  gap: 0.75rem;
`;

const BarLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  text-align: right;
`;

const BarTrack = styled.div`
  height: 8px;
  background: var(--color-bg-emphasis);
  border-radius: 9999px;
  overflow: hidden;
`;

const BarValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
`;
