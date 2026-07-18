import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Import .glsl / .vs / .fs shader files as raw strings.
  assetsInclude: ['**/*.glsl', '**/*.vs', '**/*.fs'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          vendor: ['react', 'react-dom', 'react-router-dom', 'gsap', 'lenis'],
        },
      },
    },
  },
})
