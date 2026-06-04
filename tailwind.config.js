/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "!./node_modules/**",
    "!./lib/**/node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: "#312E81",
          accent: "#7C3AED",
          bg: "#FFFFFF",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        brand: '0 20px 60px rgba(49, 46, 129, 0.08)',
        'brand-lg': '0 28px 80px rgba(49, 46, 129, 0.12)',
        'brand-accent': '0 18px 44px rgba(124, 58, 237, 0.22)',
      },
    },
  },
  plugins: [],
};
