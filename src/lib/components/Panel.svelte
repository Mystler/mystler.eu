<article class="bg-zinc-800 rounded-xl mb-4 last:mb-0">
  {#if $$slots.title || $$slots.date}
    <div class="panel-head px-4 py-4 flex justify-between items-center rounded-t-xl bg-zinc-900">
      {#if $$slots.title}
        <h3 class="mb-0 grow">
          <slot name="title" />
        </h3>
      {/if}
      {#if $$slots.title}
        <div class="text-right"><slot name="date" /></div>
      {/if}
    </div>
  {/if}
  <div class="p-4">
    <slot />
  </div>
</article>
