<script lang="ts">
  import { GlobalAudioCurrentSong, GlobalAudioPlayer } from "$lib/audioplayer";

  export let src: string;
  export let title: string;
  export let genre: string | null = null;

  function play() {
    $GlobalAudioPlayer?.playSong(src, title);
  }
</script>

<button
  type="button"
  class="audio-card {$GlobalAudioCurrentSong === src ? 'current-song' : ''}"
  on:click={play}
>
  <i class="fa fa-play text-xl"></i>
  <b>{title}</b>
  {#if genre}
    <span class="text-zinc-400 text-sm grow content-end">{genre}</span>
  {/if}
</button>

<style lang="postcss">
  .audio-card {
    @apply p-4 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-sky-400 hover:text-white text-center;
    @apply flex flex-col items-center gap-2;
  }

  .current-song {
    @apply text-white;
  }

  .current-song .fa-play {
    @apply animate-bounce;
  }
</style>
