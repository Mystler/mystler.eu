<script lang="ts">
  import { page } from "$app/state";
  import { Meta } from "$lib/page-meta.svelte";

  interface Props {
    title: string;
    description: string;
    children?: import("svelte").Snippet;
  }
  let { title, description, children }: Props = $props();

  // Set our metadata if we are rendering inside md-pages.
  if (page.route.id?.startsWith("/(md-pages)")) {
    Meta.Title = title;
    Meta.Description = description;
  }
</script>

<div class="md">{@render children?.()}</div>

<style lang="postcss">
  @reference "$lib/styles/base.css";

  .md :global(ul) {
    @apply pl-6 list-disc;
  }

  .md :global(table td),
  .md :global(table th) {
    @apply border p-2 border-zinc-400;
  }

  .md :global(table th):empty {
    @apply hidden;
  }

  .md :global(img) {
    max-width: min(1024px, 100%);
    max-height: 600px;
  }

  .md :global(img):not([class]) {
    @apply mx-auto;
  }

  .md :global(p) {
    @apply text-justify;
  }
</style>
