import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/presentation/components', import.meta.url)),
      '@/pages': fileURLToPath(new URL('./src/presentation/pages', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./src/presentation/hooks', import.meta.url)),
      '@/store': fileURLToPath(new URL('./src/infrastructure/store', import.meta.url)),
      '@/services': fileURLToPath(new URL('./src/infrastructure/services', import.meta.url)),
      '@/types': fileURLToPath(new URL('./src/domain/types', import.meta.url)),
      '@/entities': fileURLToPath(new URL('./src/domain/entities', import.meta.url)),
      '@/usecases': fileURLToPath(new URL('./src/application/usecases', import.meta.url)),
      '@/repositories': fileURLToPath(new URL('./src/application/repositories', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
