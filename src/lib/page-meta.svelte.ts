import { siteDescription, siteTitle } from "./constants";

export const meta = $state({
  title: siteTitle,
  description: siteDescription,
});

export function setPageTitle(title?: string) {
  meta.title = (title ? title + " - " : "") + siteTitle;
}

export function setPageDescription(description?: string) {
  meta.description = description ? description : siteDescription;
}
