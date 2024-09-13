import { browser } from "$app/environment";
import { fetchPosts } from "$lib/posts";
import type { PageLoad } from "./$types";

const titleImages = [
  "/img/header_01.webp",
  "/img/header_02.webp",
  "/img/header_03.webp",
  "/img/header_04.webp",
  "/img/header_05.webp",
  "/img/header_06.webp",
];

export const load: PageLoad = async () => {
  return {
    page: await fetchPosts(0),
    titleImage: browser && titleImages[Math.floor(Math.random() * titleImages.length)],
  };
};
