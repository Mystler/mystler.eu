import type { SvelteComponent } from "svelte";

export interface PostMD {
  metadata: {
    title: string;
    description?: string;
  };
  default: typeof SvelteComponent;
}

export interface PostPage {
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  posts: {
    post: PostMD;
    url: string;
    date: string;
  }[];
}

const paginate = 5;

/**
 * Page -1 will return all posts while index 0+ will use the pagination constant.
 */
export async function fetchPosts(page: number = -1): Promise<PostPage> {
  const allPostGlob = import.meta.glob<PostMD>("/src/posts/*.md");
  let allPostFiles = Object.keys(allPostGlob);
  allPostFiles.sort((a, b) => (b > a ? 1 : a > b ? -1 : 0));
  let hasNextPage = false;
  let hasPrevPage = false;
  if (page >= 0) {
    hasNextPage = allPostFiles.length > (page + 1) * paginate;
    hasPrevPage = page > 0;
    allPostFiles = allPostFiles.slice(page * paginate, (page + 1) * paginate);
  }

  // Load only the requested page of posts
  const posts = await Promise.all(
    allPostFiles.map(async (path) => {
      const post = await allPostGlob[path]();
      const postPath = path.slice("/src/posts/".length, -3);
      // Split with limit doesn't return the remainder. Booo!
      const parts = postPath.split("-");
      const remainder = parts.splice(3);
      const url = "/" + parts.join("/") + "/" + remainder.join("-");

      return {
        post: post,
        url,
        date: `${parts[0]}-${parts[1]}-${parts[2]}`,
      };
    }),
  );

  return { page: page + 1, hasNextPage, hasPrevPage, posts };
}
