import rss from "@astrojs/rss";
import { getAllPosts } from "@lib/blog";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: "Tony Martinez — Blog",
    description:
      "Writing about basketball, React, performance, and whatever else is on my mind.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: false,
  });
}
