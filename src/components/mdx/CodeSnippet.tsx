import { styled } from "@linaria/react";
import { useState, type ReactNode } from "react";

interface CodeSnippetProps {
  children: ReactNode;
}

/**
 * Wraps Astro/Shiki's rendered <pre> output.
 * The MDX component map replaces bare ``` fences with this component,
 * adding a "copy" button with accessible feedback.
 */
export function CodeSnippet({ children }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    // Walk the children tree to extract text content
    const text = extractText(children);
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <PreWrapper>
      <CopyButton
        onClick={handleCopy}
        aria-label={copied ? "Copied to clipboard" : "Copy code to clipboard"}
        type="button"
      >
        {copied ? "Copied!" : "Copy"}
      </CopyButton>
      {children}
    </PreWrapper>
  );
}

/** Recursively extract text content from React node tree. */
function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (
    node !== null &&
    typeof node === "object" &&
    "props" in node
  ) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

const PreWrapper = styled.div`
  position: relative;
  margin-block: 2rem;

  pre {
    background: var(--color-bg-subtle);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.625;
    margin: 0;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  background: var(--color-bg-emphasis);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  cursor: pointer;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    border-color 120ms ease;

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-bg-emphasis);
    border-color: var(--color-border-emphasis);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;
