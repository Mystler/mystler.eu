<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "$lib/styles/noto-font.css";
  import "$lib/styles/garamond-font.css";
  import "$lib/styles/base.css";
  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { siteDescription, siteLink, siteTitle } from "$lib/constants";
  import { page } from "$app/state";
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import { GlobalAudio } from "$lib/audioplayer.svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let { children } = $props();

  let title = $derived((page.data.title ? page.data.title + " - " : "") + siteTitle);
  let description = $derived(page.data.description ? page.data.description : siteDescription);

  function handleKeyDown(e: KeyboardEvent) {
    if (GlobalAudio.Player?.isActive() && e.key === " ") {
      GlobalAudio.Player?.togglePlay();
      e.preventDefault();
    }
  }

  // Title image preloading for a smooth animation
  let titlePreload = $derived.by(() => {
    return new Promise<void>((resolve) => {
      if (!page.data.titleImage) {
        resolve();
        return;
      }
      const img = new Image();
      img.onload = () => resolve();
      img.src = page.data.titleImage;
    });
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteLink}{page.url.pathname}" />
  <meta property="og:image" content="{siteLink}/favicon.png" />
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="site-content grow px-4 py-4">
    {#if page.data.titleImage}
      {#await titlePreload then}
        <div transition:slide|global={{ easing: quintOut }} class="mb-4">
          <img
            class="mx-auto rounded-xl border-2 border-zinc-800"
            src={page.data.titleImage}
            alt="Mystler.eu"
          />
        </div>
      {/await}
    {/if}
    <div class="flex justify-center gap-4 flex-col lg:flex-row">
      <main class="grow lg:max-w-(--breakpoint-xl)">
        {@render children?.()}
      </main>
      <div class="flex-none lg:w-72 lg:sticky lg:self-start lg:top-[76px]">
        <Sidebar />
      </div>
    </div>
  </div>

  <div class="sticky bottom-0">
    <AudioPlayer
      bind:this={GlobalAudio.Player}
      playlist={GlobalAudio.Playlist}
      onUrlChanged={(url) => {
        GlobalAudio.CurrentSong = url;
      }}
    />
  </div>
</div>
