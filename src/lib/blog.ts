import { getCollection, type CollectionEntry } from "astro:content";

/** Returns all published (non-draft) blog posts sorted newest-first. */
export async function getAllPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}

/** Returns the N most recent published posts. */
export async function getRecentPosts(n: number): Promise<CollectionEntry<"blog">[]> {
  const posts = await getAllPosts();
  return posts.slice(0, n);
}

/** Returns all unique tags across published posts, sorted alphabetically. */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/** Returns all published posts that include the given tag. */
export async function getPostsByTag(tag: string): Promise<CollectionEntry<"blog">[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * Returns a map of tag → post count for all published posts.
 * Useful for rendering tag clouds or sorted tag lists.
 */
export async function getTagCounts(): Promise<Map<string, number>> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
}
