import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/nova-dhruv-portfolio-site/',
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
