import { fetchPosts } from "$lib/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  return { page: await fetchPosts(parseInt(params.page) - 1), title: `Page ${params.page}` };
};
