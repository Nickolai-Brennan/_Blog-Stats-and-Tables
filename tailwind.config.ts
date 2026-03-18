import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#dcecff",
          500: "#0f6cbd",
          600: "#115ea3",
          700: "#0f548c",
          900: "#082338"
        },
        accent: {
          success: "#107c10",
          warning: "#b45f06",
          danger: "#d13438"
        }
      },
      boxShadow: {
        card: "0 6px 20px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
