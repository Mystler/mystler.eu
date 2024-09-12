<script lang="ts">
  import { page } from "$app/stores";
  import { PageDescription, PageTitle } from "$lib/page-meta";
  export let title;
  export let description;

  // Set our metadata if we are rendering inside md-pages.
  if ($page.route.id?.startsWith("/(md-pages)")) {
    PageTitle.set(title);
    PageDescription.set(description);
  }
</script>

<div class="md"><slot /></div>

<style lang="postcss">
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
    @apply mx-auto;
  }

  .md :global(p) {
    @apply text-justify;
  }
</style>
