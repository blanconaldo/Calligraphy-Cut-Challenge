import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  // Add this section to allow your Render hostname
  preview: {
    host: '0.0.0.0',
    port: 5173
  },
  // Add the allowed hosts configuration
    // Add your Render domain to allowed hosts
    allowedHosts: [
      'calligraphy-cut-challenge.onrender.com',
      'localhost',
      '127.0.0.1'
    ]
  })
