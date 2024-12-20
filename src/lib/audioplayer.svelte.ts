import type AudioPlayer from "$lib/components/AudioPlayer.svelte";
import { browser } from "$app/environment";

export interface PlaylistEntry {
  id: number;
  title: string;
  url: string;
}

export class Playlist {
  #plSeq = 0;
  #entries: PlaylistEntry[] = $state([]);

  addSong(url: string, title: string) {
    this.#entries = [...this.#entries, { url, title, id: this.#plSeq++ }];
  }

  length() {
    return this.#entries.length;
  }

  getNext() {
    return this.#entries[0];
  }

  getList() {
    return this.#entries;
  }

  advance() {
    this.#entries = this.#entries.slice(1);
  }

  clear() {
    this.#entries = [];
  }

  remove(index: number) {
    this.#entries = [...this.#entries.slice(0, index), ...this.#entries.slice(index + 1)];
  }

  move(id: number, destIdx: number) {
    const elIdx = this.#entries.findIndex((x) => x.id === id);
    if (elIdx >= 0) {
      const moveItem = this.#entries[elIdx];
      const tempList = [...this.#entries.slice(0, elIdx), ...this.#entries.slice(elIdx + 1)];
      this.#entries = [...tempList.slice(0, destIdx), moveItem, ...tempList.slice(destIdx)];
    }
  }

  moveUp(index: number) {
    if (index === 0) return;
    [this.#entries[index - 1], this.#entries[index]] = [
      this.#entries[index],
      this.#entries[index - 1],
    ];
  }

  moveDown(index: number) {
    if (index === this.#entries.length - 1) return;
    [this.#entries[index + 1], this.#entries[index]] = [
      this.#entries[index],
      this.#entries[index + 1],
    ];
  }
}

export const GlobalAudio = new (class {
  #Volume = $state((browser && localStorage?.audioVolume) ?? 0.5);

  Player = $state(null as AudioPlayer | null);
  CurrentSong = $state(null as string | null);
  Playlist = new Playlist();

  set Volume(v: number) {
    this.#Volume = v;
    if (browser) localStorage.audioVolume = v;
  }

  get Volume() {
    return this.#Volume;
  }
})();
