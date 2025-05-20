import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import gfm from "remark-gfm";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mdLayout = join(__dirname, "./src/lib/components/MarkdownContent.svelte");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      remarkPlugins: [gfm],
      layout: mdLayout,
    }),
  ],
  extensions: [".svelte", ".md"],

  kit: {
    adapter: adapter(),
  },
};

export default config;
