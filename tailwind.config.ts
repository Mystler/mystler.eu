import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts,md}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
      serif: ["EB Garamond", "serif"],
    },
  },
  plugins: [],
} satisfies Config;
