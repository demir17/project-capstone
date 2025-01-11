import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A6FF8",
        dark: {
          1: "#1B2028",
          2: "#31353F",
        },
        danger: "#F46D22",
        success: "#1ECB4F",
        disabled: "#9E9E9E",
      },
    },
  },
  plugins: [],
} satisfies Config;
