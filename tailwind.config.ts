import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F1A",
        primary: "#7C7CFF",
        accent: "#00F0B5",
        card: "#131A2A",
      },
    },
  },
  plugins: [],
};

export default config;
