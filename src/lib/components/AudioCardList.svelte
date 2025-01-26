<script lang="ts">
  import { GlobalAudio, Playlist } from "$lib/audioplayer.svelte";
  import { setContext } from "svelte";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // Allow Audio Card elements to register with this context
  const listedSongs = setContext("songs", new Playlist());
</script>

<button
  type="button"
  class="p-4 mb-4 rounded-xl bg-zinc-900 text-sky-400 hover:text-white hover:bg-zinc-700"
  onclick={(e) => {
    for (const song of listedSongs.getList()) {
      GlobalAudio.Playlist.addSong(song.url, song.title);
    }
    const button = e.currentTarget;
    button.classList.add("animate-ping");
    button.disabled = true;
    setTimeout(() => {
      button.classList.remove("animate-ping");
      button.disabled = false;
    }, 800);
  }}><i class="fa fa-plus text-lg"></i> Add all to queue</button
>

<div class="audio-card-list">
  {@render children?.()}
</div>

<style lang="postcss">
  @reference "$lib/styles/base.css";

  .audio-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    @apply gap-4 mb-4;
  }
</style>
