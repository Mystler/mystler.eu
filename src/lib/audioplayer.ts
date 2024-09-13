import { writable } from "svelte/store";
import type AudioPlayer from "$lib/components/AudioPlayer.svelte";
import { browser } from "$app/environment";

export const GlobalAudioPlayer = writable<AudioPlayer | null>(null);
export const GlobalAudioCurrentSong = writable<string | null>(null);

export const GlobalAudioVolume = writable<number>((browser && localStorage?.audioVolume) ?? 0.5);
GlobalAudioVolume.subscribe((v) => {
  if (browser) localStorage.audioVolume = v;
});
