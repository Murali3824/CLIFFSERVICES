/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        archivoBlack: ['Archivo Black', 'sans-serif'],
        // Unique: Bold, condensed design with a strong, impactful presence.
        // Professional: Ideal for headings or branding due to its clean, modern geometry.

        bebasNeue: ['Bebas Neue', 'sans-serif'],
        // Unique: Tall, narrow letterforms with a cinematic, poster-like flair.
        // Professional: Works well for titles or emphasis in creative yet polished UIs.

        chivo: ['Chivo', 'sans-serif'],
        // Unique: Subtle geometric quirks give it a distinct, modern edge.
        // Professional: Highly legible and versatile for both headings and body text.

        cormorantGaramond: ['Cormorant Garamond', 'serif'],
        // Unique: Elegant serif with dramatic, high-contrast strokes.
        // Professional: Exudes sophistication, perfect for luxury or editorial designs.

        dmSans: ['DM Sans', 'sans-serif'],
        // Unique: Slightly rounded edges add a soft, friendly touch to a sans-serif base.
        // Professional: Clean and minimal, great for tech or business UIs.

        inconsolata: ['Inconsolata', 'monospace'],
        // Unique: A monospaced font with a warm, humanist twist, unlike typical code fonts.
        // Professional: Excellent for technical interfaces or typewriter-style text.

        jost: ['Jost', 'sans-serif'],
        // Unique: Inspired by 1920s typography, it blends retro charm with modern clarity.
        // Professional: Sleek and adaptable for branding or UI elements.

        syncopate: ['Syncopate', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}