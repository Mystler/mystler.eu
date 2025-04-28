<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  let menuOpen: boolean = $state(false);

  function toggleMenu(event: MouseEvent) {
    menuOpen = !menuOpen;

    if (menuOpen) {
      document.body.addEventListener("click", toggleMenu);
    } else {
      document.body.removeEventListener("click", toggleMenu);
    }

    event.stopPropagation();
  }
</script>

{#snippet menu()}
  <a href="/projects">Projects</a>
  <a href="/music">Music</a>
  <a href="/photos">Photos</a>
  <a href="/words">Words</a>
  <a href="/about">About</a>
{/snippet}

<header class="lg:sticky portrait:sticky top-0 z-50">
  <nav class="bg-zinc-900 sm:flex max-sm:divide-y max-sm:divide-zinc-600">
    <div class="flex justify-between px-3">
      <a class="text-xl font-semibold content-center py-4" href="/">Mystler.eu</a>
      <div class="sm:hidden py-2 content-center">
        <button type="button" class="btn w-10" onclick={toggleMenu} aria-label="Toggle Menu">
          <i class="fa {menuOpen ? 'fa-xmark' : 'fa-bars'}"></i>
        </button>
      </div>
    </div>
    <div class="menu hidden sm:flex sm:flex-wrap">
      {@render menu()}
    </div>
    {#if menuOpen}
      <div transition:slide={{ easing: quintOut }} class="menu sm:hidden divide-y divide-zinc-700">
        {@render menu()}
      </div>
    {/if}
  </nav>
</header>

<style lang="postcss">
  @reference "$lib/styles/base.css";

  .menu > a {
    @apply block px-4 py-3 hover:bg-zinc-700;
    @apply sm:inline-block sm:content-center;
  }

  a {
    @apply hover:text-white;
  }
</style>
