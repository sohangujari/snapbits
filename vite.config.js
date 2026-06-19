import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  base: '/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://feedflow-news.vercel.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
