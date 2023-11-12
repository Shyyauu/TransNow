import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
     // '/v2/translate': 'https://api-free.deepl.com'
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [react()],
})
