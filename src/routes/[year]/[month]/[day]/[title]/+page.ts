import type { PostMD } from "$lib/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const post: PostMD = await import(
    `../../../../../posts/${params.year}-${params.month}-${params.day}-${params.title}.md`
  );
  return {
    post,
    date: `${params.year}-${params.month}-${params.day}`,
    title: post.metadata.title,
    description: post.metadata.description,
  };
};
