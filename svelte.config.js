import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import gfm from "remark-gfm";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      remarkPlugins: [gfm],
      layout: "./src/lib/components/MarkdownContent.svelte",
    }),
  ],
  extensions: [".svelte", ".md"],

  kit: {
    adapter: adapter(),
  },
};

export default config;
