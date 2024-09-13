<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import "$lib/styles/noto-font.css";
  import "$lib/styles/base.css";
  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { siteLink } from "$lib/constants";
  import { page } from "$app/stores";
  import { PageDescription, PageTitle } from "$lib/page-meta";
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import { GlobalAudioCurrentSong, GlobalAudioPlayer } from "$lib/audioplayer";

  // Update title and description stores based on page data
  // unless we expect MarkdownContent to do it in md-pages.
  $: {
    if (!$page.route.id?.startsWith("/(md-pages)")) {
      PageTitle.set($page.data.title);
      PageDescription.set($page.data.description);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ($GlobalAudioPlayer?.isActive() && e.key === " ") {
      $GlobalAudioPlayer?.togglePlay();
      e.preventDefault();
    }
  }
</script>

<svelte:head>
  <title>{$PageTitle}</title>
  <meta property="og:title" content={$PageTitle} />
  <meta name="description" content={$PageDescription} />
  <meta property="og:description" content={$PageDescription} />
  <meta property="og:url" content="{siteLink}{$page.url.pathname}" />
</svelte:head>

<svelte:window on:keydown={handleKeyDown} />

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="site-content grow px-4 py-4 flex justify-center gap-4 flex-col lg:flex-row">
    <main class="grow lg:max-w-screen-xl">
      <slot />
    </main>
    <div class="flex-none lg:w-72 lg:sticky lg:self-start lg:top-[76px]">
      <Sidebar />
    </div>
  </div>

  <div class="sticky bottom-0">
    <AudioPlayer
      bind:this={$GlobalAudioPlayer}
      on:urlChanged={(e) => {
        GlobalAudioCurrentSong.set(e.detail.url);
      }}
    />
  </div>
</div>

<style lang="postcss">
  .site-content :global(a) {
    @apply text-sky-400 hover:text-sky-50 visited:text-sky-500;
  }
</style>
