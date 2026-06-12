import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 24px 80px rgba(0,0,0,0.23)",
        glow: "0 0 0 1px rgba(110,231,183,0.1), 0 0 40px rgba(110,231,183,0.08)"
      }
    }
  },
  plugins: []
}

export default config
