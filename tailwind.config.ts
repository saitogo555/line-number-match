import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulsate-fwd": "pulsate-fwd 0.75s ease infinite both"
      },
      keyframes: {
        "pulsate-fwd": {
          "0%,to": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.2)"
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
