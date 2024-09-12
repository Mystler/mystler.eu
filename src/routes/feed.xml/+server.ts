import { fetchPosts } from "$lib/posts";
import { siteLink, siteTitle, siteDescription } from "$lib/constants";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const posts = (await fetchPosts(-1)).posts;

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteLink}</link>
<atom:link href="${siteLink}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `<item>
<guid isPermaLink="true">${siteLink}${post.url}</guid>
<title>${post.post.metadata.title}</title>
<link>${siteLink}${post.url}</link>
${post.post.metadata.description ? "<description>" + post.post.metadata.description + "</description>" : ""}
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`,
  )
  .join("")}
</channel>
</rss>
`;
  const options = {
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    },
  };

  return new Response(body, options);
};
