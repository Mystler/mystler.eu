<script lang="ts">
  import { GlobalAudio, Playlist } from "$lib/audioplayer.svelte";
  import PlaylistViewer from "./PlaylistViewer.svelte";

  interface Props {
    playlist?: Playlist;
    onUrlChanged: (url: string | null) => void;
  }
  let { playlist = new Playlist(), onUrlChanged }: Props = $props();

  let url: string | null = $state(null);
  let name: string | undefined = $state();
  let time: number = $state(0);
  let duration: number = $state(0);
  let paused: boolean = $state(true);
  let pendingPlay: boolean = $state(false);
  let muted: boolean = $state(false);
  let playlistViewer: PlaylistViewer | undefined = $state();

  function format(time: number): string {
    if (isNaN(time)) return "...";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  let volumeIcon = $derived.by(() => {
    if (muted) return "fa-volume-xmark";
    else if (GlobalAudio.Volume >= 0.5) return "fa-volume-high";
    else if (GlobalAudio.Volume >= 0.2) return "fa-volume-low";
    else return "fa-volume-off";
  });

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
      paused = true;
      pendingPlay = playNow;
      onUrlChanged(url);

      // Update MediaSession metadata
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist: "Mystler",
          artwork: [
            {
              src: "/favicon.png",
            },
          ],
        });
      }
    }
  }

  function playNext(now: boolean) {
    if (playlist.length() > 0) {
      const nextSong = playlist.getNext();
      playSong(nextSong.url, nextSong.title, now);
      playlist.advance();
    }
  }

  $effect(() => {
    // Open player when no song is set but we add to queue.
    if (!url && playlist.length() > 0) {
      playNext(false);
    }
  });

  function onEnded() {
    time = 0;
    playNext(true);
  }

  // Set up MediaSession API
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.setActionHandler("play", () => togglePlay());
    navigator.mediaSession.setActionHandler("pause", () => togglePlay());
    navigator.mediaSession.setActionHandler("nexttrack", () => playNext(true));
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      time = 0;
    });
  }
</script>

{#if url}
  <div class="bg-zinc-900 p-4 flex flex-wrap sm:flex-nowrap gap-4 justify-end">
    <!-- Main subgroup -->
    <div class="flex grow items-center gap-4">
      <!-- Invisible audio player element -->
      <audio
        src={url}
        bind:volume={GlobalAudio.Volume}
        bind:muted
        bind:currentTime={time}
        bind:duration
        bind:paused
        onloadeddata={(e) => {
          // Restart the actual player when variables changed and data is ready
          if (pendingPlay) {
            paused = false;
            pendingPlay = false;
          }
        }}
        onended={onEnded}
      >
      </audio>

      <!-- Play/Pause button -->
      <button
        type="button"
        title="Play"
        class="btn size-12 shrink-0"
        aria-label={paused ? "play" : "pause"}
        onclick={togglePlay}
      >
        <i class="fa {paused ? 'fa-play' : 'fa-pause'} text-2xl"></i>
      </button>

      {#if playlist.length() > 0}
        <!-- Next button -->
        <button
          type="button"
          title="Next"
          aria-label="Next"
          class="btn size-12 shrink-0"
          onclick={() => playNext(true)}
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
        aria-label="Mute"
        class="icon-button"
        onclick={() => {
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
        bind:value={GlobalAudio.Volume}
        min="0"
        max="1"
      />
      <!-- Download link -->
      <button type="button" title="Download" aria-label="Download" class="icon-button">
        <a href={url} aria-label="Download" download><i class="fa fa-download"></i></a>
      </button>
      <!-- Playlist link -->
      <button
        type="button"
        title="Playlist"
        aria-label="Playlist"
        class="icon-button"
        onclick={() => playlistViewer?.show()}
      >
        <i class="fa fa-list"></i>
      </button>
      <!-- Close button -->
      <button
        type="button"
        title="Close"
        aria-label="Close"
        class="icon-button"
        onclick={() => {
          url = null;
          playlist.clear();
          onUrlChanged(url);
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
  @reference "$lib/styles/base.css";

  .slider {
    @apply accent-sky-400;
  }

  .icon-button {
    @apply size-8 hover:text-white;
  }
</style>
