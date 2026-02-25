import { styled } from "@linaria/react";
import type { ReactNode } from "react";

type AsideVariant = "info" | "warning" | "success" | "danger";

interface AsideProps {
  type?: AsideVariant;
  title?: string;
  children: ReactNode;
}

const ICONS: Record<AsideVariant, string> = {
  info: "ℹ",
  warning: "⚠",
  success: "✓",
  danger: "✕",
};

const LABELS: Record<AsideVariant, string> = {
  info: "Note",
  warning: "Warning",
  success: "Tip",
  danger: "Caution",
};

export function Aside({ type = "info", title, children }: AsideProps) {
  const label = title ?? LABELS[type];

  return (
    <AsideWrapper data-variant={type} role="note" aria-label={label}>
      <AsideIcon aria-hidden="true">{ICONS[type]}</AsideIcon>
      <AsideBody>
        <AsideTitle>{label}</AsideTitle>
        <AsideContent>{children}</AsideContent>
      </AsideBody>
    </AsideWrapper>
  );
}

const AsideWrapper = styled.aside`
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid;
  margin-block: 2rem;

  &[data-variant="info"] {
    background-color: var(--color-info-bg);
    border-color: var(--color-info);
    color: var(--color-text-primary);
  }

  &[data-variant="warning"] {
    background-color: var(--color-warning-bg);
    border-color: var(--color-warning);
    color: var(--color-text-primary);
  }

  &[data-variant="success"] {
    background-color: var(--color-success-bg);
    border-color: var(--color-success);
    color: var(--color-text-primary);
  }

  &[data-variant="danger"] {
    background-color: var(--color-danger-bg);
    border-color: var(--color-danger);
    color: var(--color-text-primary);
  }
`;

const AsideIcon = styled.span`
  font-size: 1.25rem;
  line-height: 1.5;
  flex-shrink: 0;
  margin-top: 0.1em;
`;

const AsideBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const AsideTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
`;

const AsideContent = styled.div`
  font-size: 1rem;
  line-height: 1.625;

  & > * + * {
    margin-top: 0.75rem;
  }

  & p {
    margin: 0;
  }

  & code {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: var(--color-bg-emphasis);
    padding: 0.15em 0.4em;
    border-radius: 4px;
  }
`;
