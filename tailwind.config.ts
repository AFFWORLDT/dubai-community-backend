/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  screens: {
		'xs': '475px',
		'sm': '640px',
		'md': '768px',
		'lg': '1024px',
		'xl': '1280px',
		'2xl': '1536px',
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "#006CE4",
			foreground: "#ffffff",
			50: '#e6f0fd',
			100: '#cce1fb',
			200: '#99c3f7',
			300: '#66a5f3',
			400: '#3387ef',
			500: '#006CE4',
			600: '#0056b7',
			700: '#004189',
			800: '#002b5c',
			900: '#00162e',
			950: '#000b17',
		  },
		  secondary: {
			DEFAULT: "#FF8000",
			foreground: "#ffffff",
			50: '#fff3e6',
			100: '#ffe6cc',
			200: '#ffcc99',
			300: '#ffb366',
			400: '#ff9933',
			500: '#FF8000',
			600: '#cc6600',
			700: '#994d00',
			800: '#663300',
			900: '#331a00',
			950: '#1a0d00',
		  },
		  success: {
			DEFAULT: "#008009",
			foreground: "#ffffff",
		  },
		  warning: {
			DEFAULT: "#FFB700",
			foreground: "#000000",
		  },
		  destructive: {
			DEFAULT: "#E4002B",
			foreground: "#ffffff",
		  },
		  muted: {
			DEFAULT: "#6B6B6B",
			foreground: "#ffffff",
		  },
		  accent: {
			DEFAULT: "#1A4FA0",
			foreground: "#ffffff",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  "fade-in": {
			from: { opacity: 0, transform: "translateY(10px)" },
			to: { opacity: 1, transform: "translateY(0)" },
		  },
		  "fade-out": {
			from: { opacity: 1, transform: "translateY(0)" },
			to: { opacity: 0, transform: "translateY(10px)" },
		  }
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  "fade-in": "fade-in 0.3s ease-out",
		  "fade-out": "fade-out 0.3s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  