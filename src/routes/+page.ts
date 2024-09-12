import { fetchPosts } from "$lib/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  return { page: await fetchPosts(0) };
};
