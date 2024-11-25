<script>
  /** @type {{title?: import('svelte').Snippet, date?: import('svelte').Snippet, children?: import('svelte').Snippet}} */
  let { title, date, children } = $props();
</script>

<article class="bg-zinc-800 rounded-xl mb-4 last:mb-0">
  {#if title || date}
    <div class="panel-head px-4 py-4 flex justify-between items-center rounded-t-xl bg-zinc-900">
      {#if title}
        <h3 class="mb-0 grow">
          {@render title()}
        </h3>
      {/if}
      {#if date}
        <div class="text-right">{@render date()}</div>
      {/if}
    </div>
  {/if}
  <div class="p-4">
    {@render children?.()}
  </div>
</article>
