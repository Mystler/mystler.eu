<script lang="ts">
  import { GlobalAudioVolume, type PlaylistEntry } from "$lib/audioplayer";
  import { writable, type Writable } from "svelte/store";
  import PlaylistViewer from "./PlaylistViewer.svelte";

  export let playlist: Writable<PlaylistEntry[]> = writable([]);

  let url: string | null = null;
  let name: string;
  let time: number;
  let duration: number;
  let paused: boolean = true;
  let pendingPlay: boolean = false;
  let muted: boolean;
  let readyState: number;
  let audio: HTMLAudioElement;
  let playlistViewer: PlaylistViewer;

  function format(time: number): string {
    if (isNaN(time)) return "...";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  let volumeIcon: string;
  $: {
    if (muted) volumeIcon = "fa-volume-xmark";
    else if ($GlobalAudioVolume >= 0.5) volumeIcon = "fa-volume-high";
    else if ($GlobalAudioVolume >= 0.2) volumeIcon = "fa-volume-low";
    else volumeIcon = "fa-volume-off";
  }

  // Public access functions

  export function isActive(): boolean {
    return url !== null;
  }

  export function togglePlay() {
    paused = !paused;
  }

  export function playSong(src: string | null, title: string, playNow: boolean = true) {
    if (src !== url) {
      // Different song, so reset a bunch of vars and kick off new play using pendingPlay
      url = src;
      name = title;
      time = 0;
      readyState = 0;
      paused = true;
      pendingPlay = playNow;
    }
  }

  function playNext(now: boolean) {
    if ($playlist.length > 0) {
      playSong($playlist[0].url, $playlist[0].title, now);
      [, ...$playlist] = $playlist;
    }
  }

  $: {
    // Open player when no song is set but we add to queue.
    if (!url && $playlist.length > 0) {
      playNext(false);
    }
  }

  // Restart the actual player when variables changed and data is ready
  $: {
    if (pendingPlay && url && audio && readyState > audio.HAVE_CURRENT_DATA) {
      paused = false;
      pendingPlay = false;
    }
  }

  // Provide hook for base layout
  export let onUrlChanged: (url: string | null) => void;
  $: onUrlChanged(url);

  function onEnded() {
    time = 0;
    playNext(true);
  }
</script>

{#if url}
  <div class="bg-zinc-900 p-4 flex flex-wrap sm:flex-nowrap gap-4 justify-end">
    <!-- Main subgroup -->
    <div class="flex grow items-center gap-4">
      <!-- Invisible audio player element -->
      <audio
        src={url}
        bind:this={audio}
        bind:volume={$GlobalAudioVolume}
        bind:muted
        bind:currentTime={time}
        bind:duration
        bind:paused
        bind:readyState
        on:ended={onEnded}
      >
      </audio>

      <!-- Play/Pause button -->
      <button
        type="button"
        title="Play"
        class="btn size-12 shrink-0"
        aria-label={paused ? "play" : "pause"}
        on:click={togglePlay}
      >
        <i class="fa {paused ? 'fa-play' : 'fa-pause'} text-2xl"></i>
      </button>

      {#if $playlist.length > 0}
        <!-- Next button -->
        <button
          type="button"
          title="Next"
          class="btn size-12 shrink-0"
          on:click={() => playNext(true)}
        >
          <i class="fa fa-forward-step text-2xl"></i>
        </button>
      {/if}

      <!-- Group of Name and Position indicator -->
      <div class="grow flex flex-col gap-1">
        <b>{name}</b>
        <input
          title="Position"
          class="slider"
          type="range"
          step="any"
          bind:value={time}
          min="0"
          max={duration}
        />
      </div>
      <div class="text-center">{format(time)} / {format(duration)}</div>
    </div>

    <!-- Second subgroup, wraps on small screens -->
    <div class="flex items-center gap-4">
      <!-- Volume Icon / Mute -->
      <button
        type="button"
        title="Mute"
        class="icon-button"
        on:click={() => {
          muted = !muted;
        }}
      >
        <i class="text-lg text-center fa {volumeIcon}"></i>
      </button>
      <!-- Volume Slider -->
      <input
        title="Volume"
        class="slider w-16 sm:w-24"
        type="range"
        step="any"
        bind:value={$GlobalAudioVolume}
        min="0"
        max="1"
      />
      <!-- Download link -->
      <button type="button" title="Download" class="icon-button">
        <a href={url} download><i class="fa fa-download"></i></a>
      </button>
      <!-- Playlist link -->
      <button
        type="button"
        title="Playlist"
        class="icon-button"
        on:click={() => playlistViewer.show()}
      >
        <i class="fa fa-list"></i>
      </button>
      <!-- Close button -->
      <button
        type="button"
        title="Close"
        class="icon-button"
        on:click={() => {
          url = null;
          playlist.set([]);
        }}><i class="fa fa-xmark"></i></button
      >
    </div>
  </div>
  <PlaylistViewer
    bind:this={playlistViewer}
    {playlist}
    onPlayNow={(song) => playSong(song.url, song.title)}
  />
{/if}

<style lang="postcss">
  .slider {
    @apply accent-sky-400;
  }

  .icon-button {
    @apply size-8 hover:text-white;
  }
</style>
