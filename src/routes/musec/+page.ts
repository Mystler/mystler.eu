import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    title: "Musec",
    description: "Do you know a song by just listening to one second of it? Find out with Musec!",
  };
};
