/**
 * Global MDX component map.
 *
 * Every component registered here is available in ALL blog posts without
 * an explicit import. Pass this map to <Content components={MDXComponents} />
 * in src/pages/blog/[slug].astro.
 *
 * Convention:
 * - Lower-case keys replace standard HTML elements (e.g. `pre` replaces <pre>)
 * - PascalCase keys are custom components used as JSX in MDX
 */

import { Aside } from "./Aside";
import { CodeSnippet } from "./CodeSnippet";
import { NBAStatBar } from "./nba/NBAStatBar";
import { NBAStatGrid } from "./nba/NBAStatGrid";
import { NBAComparison } from "./nba/NBAComparison";

export { Aside, CodeSnippet, NBAStatBar, NBAStatGrid, NBAComparison };

export const MDXComponents = {
  // Replace standard markdown code fences with our copy-button wrapper
  pre: CodeSnippet,

  // Custom components — available in all posts without imports
  Aside,
  NBAStatBar,
  NBAStatGrid,
  NBAComparison,
} as const;
