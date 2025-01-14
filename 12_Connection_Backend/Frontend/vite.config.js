import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // create proxy config
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },

  plugins: [react()],
});
