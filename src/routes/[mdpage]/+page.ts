import type { PostMD } from "$lib/posts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const page: PostMD = await import(`../../pages/${params.mdpage}.md`);
  return {
    page,
    title: page.metadata.title,
    description: page.metadata.description,
  };
};
