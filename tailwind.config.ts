import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f6f8",
        card: "#ffffff",
        primary: "#2563eb",
        text: "#18181b",
        textSecondary: "#6b7280",
        border: "#e4e4e7",
      },
      maxWidth: {
        dashboard: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;