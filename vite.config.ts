<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
>>>>>>> 9187463f72c29f42ee828d7c92983fdaa042f9c5
