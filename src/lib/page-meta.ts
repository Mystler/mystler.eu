import { writable } from "svelte/store";
import { siteDescription, siteTitle } from "./constants";

function createPageTitle() {
  const { subscribe, set } = writable(siteTitle);

  return {
    subscribe,
    set: (t?: string) => {
      const title = (t ? t + " - " : "") + siteTitle;
      set(title);
    },
  };
}

export const PageTitle = createPageTitle();

function createPageDescription() {
  const { subscribe, set } = writable(siteDescription);

  return {
    subscribe,
    set: (t?: string) => {
      const desc = t ? t : siteDescription;
      set(desc);
    },
  };
}

export const PageDescription = createPageDescription();
