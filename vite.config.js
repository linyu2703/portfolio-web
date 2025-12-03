import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // The 'base' property tells Vite to use this path as the root 
  // for all assets (JS, CSS, etc.) when the project is built.
  // This MUST match your GitHub repository name, enclosed in forward slashes.
  base: '/portfolio-web/', 
  
  plugins: [react()],
});