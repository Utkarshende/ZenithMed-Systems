import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- MUST HAVE THIS

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- MUST BE IN THE PLUGINS ARRAY
  ],
})