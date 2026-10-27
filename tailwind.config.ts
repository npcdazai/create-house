import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#F5F3EF",
        espresso: "#1E1C1A",
        carbon: "#141413",
        "warm-grey": "#6E6A64",
        bronze: "#8C7E72",
        bone: "#FAF9F6",
        hairline: "rgba(20, 20, 19, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
