<script lang="ts">
  import { type PlaylistEntry } from "$lib/audioplayer";
  import { writable, type Writable } from "svelte/store";

  export let playlist: Writable<PlaylistEntry[]> = writable([]);
  export let onPlayNow: (song: PlaylistEntry) => void;

  let dialog: HTMLDialogElement;

  export function show() {
    dialog.showModal();
    dialog.addEventListener("click", closeClickBackdrop);
  }

  export function close() {
    dialog.removeEventListener("click", closeClickBackdrop);
    dialog.close();
  }

  function closeClickBackdrop(e: MouseEvent) {
    if (e.target === dialog) {
      close();
    }
  }

  let dragTargetIdx: number | null = null;
  $: if ($playlist) dragTargetIdx = null; // Reset when playlist changes.
</script>

<dialog bind:this={dialog} class="backdrop:backdrop-blur bg-transparent">
  <div class="p-4 bg-zinc-700 rounded-xl border-2 border-zinc-800 text-zinc-200 min-w-80">
    <div class="flex justify-between gap-4 items-start">
      <h1>Queue</h1>
      <button type="button" on:click={() => close()}><i class="fa fa-xmark text-2xl"></i></button>
    </div>
    {#if $playlist.length > 0}
      <p>
        <i>Drag items to rearrange the queued track order. Use the arrows on mobile devices.</i>
      </p>
      <div class="flex justify-between items-center mb-2">
        <span>{$playlist.length} songs queued</span>
        <button
          type="button"
          class="p-2 rounded-lg bg-zinc-800 hover:text-white hover:bg-zinc-600"
          on:click={() => {
            $playlist = [];
          }}><i class="fa fa-trash-can"></i> Clear All</button
        >
      </div>
    {/if}
    <div class="flex flex-col gap-2">
      {#each $playlist as item, index (item.id)}
        <div
          class="playlist-entry {dragTargetIdx === index ? 'drag-target' : ''}"
          draggable="true"
          role="listitem"
          on:dragstart={(e) => {
            if (e.dataTransfer) {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.clearData();
              e.dataTransfer.setData("text/plain", item.id.toString());
            }
          }}
          on:dragover={(e) => {
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
          }}
          on:dragenter={(e) => {
            if (e.relatedTarget instanceof Element && e.currentTarget.contains(e.relatedTarget))
              return; // Ignore if coming from a child
            dragTargetIdx = index;
          }}
          on:dragleave={(e) => {
            if (e.relatedTarget instanceof Element && e.currentTarget.contains(e.relatedTarget))
              return; // Ignore if going to a child
            dragTargetIdx = null;
          }}
          on:drop={(e) => {
            e.preventDefault();
            if (e.dataTransfer) {
              const id = parseInt(e.dataTransfer.getData("text/plain"));
              const elIdx = $playlist.findIndex((x) => x.id === id);
              if (elIdx >= 0) {
                const moveItem = $playlist[elIdx];
                let tempList = [...$playlist.slice(0, elIdx), ...$playlist.slice(elIdx + 1)];
                $playlist = [...tempList.slice(0, index), moveItem, ...tempList.slice(index)];
              }
            }
          }}
        >
          <div class="flex flex-col items-center">
            <button
              type="button"
              title="Up"
              class={index === 0 ? "pointer-events-none text-zinc-500" : ""}
              on:click={() =>
                ([$playlist[index - 1], $playlist[index]] = [
                  $playlist[index],
                  $playlist[index - 1],
                ])}><i class="fa fa-chevron-up"></i></button
            >
            <i class="fa fa-grip-lines"></i>
            <button
              type="button"
              title="Down"
              class={index >= $playlist.length - 1 ? "pointer-events-none text-zinc-500" : ""}
              on:click={() =>
                ([$playlist[index + 1], $playlist[index]] = [
                  $playlist[index],
                  $playlist[index + 1],
                ])}><i class="fa fa-chevron-down"></i></button
            >
          </div>
          <span>{index + 1}</span>
          {#if onPlayNow}
            <button
              type="button"
              title="Play Now"
              class="hover:text-white"
              on:click={() => {
                $playlist = [...$playlist.slice(0, index), ...$playlist.slice(index + 1)];
                onPlayNow(item);
                close();
              }}><i class="fa fa-play"></i></button
            >
          {/if}
          <span class="grow">{item.title}</span>
          <button
            type="button"
            title="Remove"
            class="hover:text-white"
            on:click={() => {
              $playlist = [...$playlist.slice(0, index), ...$playlist.slice(index + 1)];
            }}><i class="fa fa-trash-can"></i></button
          >
        </div>
      {/each}
      {#if $playlist.length === 0}
        <p>No tracks queued up!</p>
      {/if}
    </div>
  </div>
</dialog>

<style lang="postcss">
  .playlist-entry {
    @apply flex items-center px-4 py-1 gap-4 cursor-grab bg-zinc-800 rounded-lg hover:bg-zinc-600;
  }
  .drag-target {
    @apply bg-zinc-600;
  }
</style>
