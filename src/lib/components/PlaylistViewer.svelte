<script lang="ts">
  import { Playlist, type PlaylistEntry } from "$lib/audioplayer.svelte";
  import { untrack } from "svelte";
  import { flip } from "svelte/animate";

  interface Props {
    playlist?: Playlist;
    onPlayNow: (song: PlaylistEntry) => void;
  }
  let { playlist = new Playlist(), onPlayNow }: Props = $props();

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

  // States for drag-arranging the playlist
  let anchorY = 0;
  let dragBoundsRef = $state<DOMRect | null>(null);
  let dragItem = $state<PlaylistEntry | null>(null);
  let dragItemIdx = $state<number | null>(null);
  let dragCloneY = $state(0);

  function resetDrag() {
    dragItem = null;
    dragItemIdx = null;
    document.documentElement.style.cursor = "";
  }

  // Reset if dragging item is removed from playlist
  $effect.pre(() => {
    if (dragItem && !playlist.getList().find((x) => x.id === dragItem?.id)) {
      untrack(() => resetDrag());
    }
  });

  // Extend flip to disable pointer events on elements while they animate
  function customFlip(...params: Parameters<typeof flip>): ReturnType<typeof flip> {
    const anim = flip(...params);
    const cssFn = anim.css;
    anim.css = (t, u) => (cssFn?.(t, u) ?? "") + " pointer-events: none;";
    return anim;
  }
</script>

<svelte:window
  onpointermove={(e) => {
    if (!dragItem) return;
    dragCloneY = e.clientY - anchorY + (dragBoundsRef?.top ?? 0);
  }}
  onpointerup={() => resetDrag()}
/>

<dialog bind:this={dialog} class="m-auto backdrop:backdrop-blur-sm bg-transparent">
  <div class="p-4 bg-zinc-700 rounded-xl border-2 border-zinc-800 text-zinc-200 min-w-80">
    <div class="flex justify-between gap-4 items-start">
      <h1>Queue</h1>
      <button type="button" aria-label="Close" onclick={() => close()}
        ><i class="fa fa-xmark text-2xl"></i></button
      >
    </div>
    {#if playlist.length() > 0}
      <div class="flex justify-between items-center mb-2">
        <span>{playlist.length()} songs queued</span>
        <button
          type="button"
          class="p-2 rounded-lg bg-zinc-800 hover:text-white hover:bg-zinc-600"
          onclick={() => {
            playlist.clear();
          }}><i class="fa fa-trash-can"></i> Clear All</button
        >
      </div>
    {/if}
    <!-- Cloned item that follows the cursor when dragging the playlist entry -->
    {#if dragItem && dragItemIdx !== null}
      <div
        class="z-10 fixed pointer-events-none"
        style="width: {dragBoundsRef?.width ?? 0}px; top: {dragCloneY}px"
      >
        {@render playlistItem(dragItem, dragItemIdx, true)}
      </div>
    {/if}
    <!-- Actual playlist -->
    <div class={["flex flex-col gap-2", dragItem && "select-none"]}>
      {#each playlist.getList() as item, index (item.id)}
        <div animate:customFlip={{ duration: 200 }} class="h-18">
          {@render playlistItem(item, index)}
        </div>
      {/each}
      {#if playlist.length() === 0}
        <p>No tracks queued up!</p>
      {/if}
    </div>
  </div>
</dialog>

{#snippet playlistItem(item: PlaylistEntry, index: number, isDragClone: boolean = false)}
  <div
    class={[
      "flex items-center h-18 px-4 py-1 gap-4 rounded-lg",
      !isDragClone && "bg-zinc-800",
      isDragClone && "bg-zinc-600",
      !dragItem && "pointer-fine:hover:bg-zinc-600",
      !isDragClone && dragItem?.id === item.id && "pointer-events-none opacity-0",
    ]}
    role="listitem"
    onpointerenter={() => {
      if (dragItem && dragItem.id !== item.id && dragItemIdx !== index) {
        dragItemIdx = index;
        playlist.move(dragItem.id, index);
      }
    }}
  >
    <div class="flex flex-col items-center">
      <button
        type="button"
        title="Up"
        aria-label="Up"
        class={[index === 0 && "pointer-events-none text-zinc-500"]}
        onclick={() => playlist.moveUp(index)}><i class="fa fa-chevron-up"></i></button
      >
      <button
        type="button"
        aria-label="Drag to Move"
        class="cursor-grab touch-none"
        onpointerdown={(e) => {
          if (e.button !== 0) return;
          (e.target as Element).releasePointerCapture(e.pointerId);
          dragItem = item;
          dragItemIdx = index;
          dragBoundsRef = e.currentTarget.parentElement!.parentElement!.getBoundingClientRect();
          anchorY = e.clientY;
          dragCloneY = dragBoundsRef.top;
          document.documentElement.style.cursor = "grabbing";
        }}><i class="fa fa-grip-lines"></i></button
      >
      <button
        type="button"
        title="Down"
        aria-label="Down"
        class={[index >= playlist.length() - 1 && "pointer-events-none text-zinc-500"]}
        onclick={() => playlist.moveDown(index)}><i class="fa fa-chevron-down"></i></button
      >
    </div>
    <span>{index + 1}</span>
    {#if onPlayNow}
      <button
        type="button"
        title="Play Now"
        aria-label="Play Now"
        class="hover:text-white"
        onclick={() => {
          playlist.remove(index);
          onPlayNow(item);
          close();
        }}><i class="fa fa-play"></i></button
      >
    {/if}
    <span class="grow truncate">{item.title}</span>
    <button
      type="button"
      title="Remove"
      aria-label="Remove"
      class="hover:text-white"
      onclick={() => playlist.remove(index)}><i class="fa fa-trash-can"></i></button
    >
  </div>
{/snippet}
