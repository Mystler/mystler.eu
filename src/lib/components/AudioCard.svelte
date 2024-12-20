<script lang="ts">
  import { GlobalAudio, type Playlist } from "$lib/audioplayer.svelte";
  import { getContext } from "svelte";

  interface Props {
    src: string;
    title: string;
    genre?: string | null;
  }

  let { src, title, genre = null }: Props = $props();

  // Register our song into our parents list for "play all" tracking
  getContext<Playlist>("songs")?.addSong(src, title);

  function play() {
    GlobalAudio.Player?.playSong(src, title);
  }
</script>

<div class="relative">
  <button
    type="button"
    class="audio-card {GlobalAudio.CurrentSong === src ? 'current-song' : ''}"
    onclick={play}
  >
    <i class="fa fa-play text-xl"></i>
    <b>{title}</b>
    {#if genre}
      <span class="text-zinc-400 text-sm grow content-end">{genre}</span>
    {/if}
  </button>
  <button
    type="button"
    title="Add to Queue"
    aria-label="Add to Queue"
    class="absolute -bottom-1 -right-1 size-8 rounded-full bg-sky-900 hover:text-white hover:bg-sky-700"
    onclick={(e) => {
      GlobalAudio.Playlist.addSong(src, title);
      const button = e.currentTarget;
      button.classList.add("animate-ping");
      button.disabled = true;
      setTimeout(() => {
        button.classList.remove("animate-ping");
        button.disabled = false;
      }, 800);
    }}><i class="fa fa-plus text-lg"></i></button
  >
</div>

<style lang="postcss">
  .audio-card {
    @apply p-4 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-sky-400 hover:text-white text-center;
    @apply flex flex-col items-center gap-2 w-full h-full;
  }

  .current-song {
    @apply text-white;
  }

  .current-song .fa-play {
    @apply animate-bounce;
  }
</style>
