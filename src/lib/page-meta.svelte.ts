import { siteDescription, siteTitle } from "./constants";

export const Meta = new (class {
  #Title = $state(siteTitle);
  #Description = $state(siteDescription);

  set Title(title: string | undefined) {
    this.#Title = (title ? title + " - " : "") + siteTitle;
  }

  get Title() {
    return this.#Title;
  }

  set Description(description: string | undefined) {
    this.#Description = description ? description : siteDescription;
  }
  get Description() {
    return this.#Description;
  }
})();
