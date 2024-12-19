<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "$lib/styles/noto-font.css";
  import "$lib/styles/garamond-font.css";
  import "$lib/styles/base.css";
  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { siteLink } from "$lib/constants";
  import { page } from "$app/state";
  import { meta, setPageDescription, setPageTitle } from "$lib/page-meta.svelte";
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import { GlobalAudioCurrentSong, GlobalAudioPlayer, GlobalPlaylist } from "$lib/audioplayer";
  import { slide } from "svelte/transition";

  interface Props {
    children?: import("svelte").Snippet;
  }
  let { children }: Props = $props();

  // Update title and description stores based on page data
  // unless we expect MarkdownContent to do it in md-pages.
  $effect(() => {
    if (!page.route.id?.startsWith("/(md-pages)")) {
      setPageTitle(page.data.title);
      setPageDescription(page.data.description);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
    if ($GlobalAudioPlayer?.isActive() && e.key === " ") {
      $GlobalAudioPlayer?.togglePlay();
      e.preventDefault();
    }
  }
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta property="og:title" content={meta.title} />
  <meta name="description" content={meta.description} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content="{siteLink}{page.url.pathname}" />
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="site-content grow px-4 py-4">
    {#if page.data.titleImage}
      <div transition:slide class="mb-4">
        <img
          class="mx-auto rounded-xl border-2 border-zinc-800"
          src={page.data.titleImage}
          alt="Mystler.eu"
        />
      </div>
    {/if}
    <div class="flex justify-center gap-4 flex-col lg:flex-row">
      <main class="grow lg:max-w-screen-xl">
        {@render children?.()}
      </main>
      <div class="flex-none lg:w-72 lg:sticky lg:self-start lg:top-[76px]">
        <Sidebar />
      </div>
    </div>
  </div>

  <div class="sticky bottom-0">
    <AudioPlayer
      bind:this={$GlobalAudioPlayer}
      playlist={GlobalPlaylist}
      onUrlChanged={(url) => {
        GlobalAudioCurrentSong.set(url);
      }}
    />
  </div>
</div>

<style lang="postcss">
  .site-content :global(a) {
    @apply text-sky-400 hover:text-sky-50 visited:text-sky-500;
  }
</style>
