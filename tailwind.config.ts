import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        headerFont:"var(--headerFont)",
        paragraphFont:"var(--paragraphFont)",
        lighterFont:"var(--lighterFont)",
        topBg:"var(--topBg)",
        middle:"var(--middle)",
        outer:"var(--outer)",
        purple:"var(--purple)",
        error:"var(--error)",
        search:"var(--search)",

      },
    },
  },
  plugins: [],
};
export default config;
