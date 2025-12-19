import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';

const alias = {
  '@main': resolve('src/main'),
  '@preload': resolve('src/preload'),
  '@renderer': resolve('src/renderer/src'),
  '@shared': resolve('src/shared'),
};

export default defineConfig({
  main: {
    resolve: {
      alias,
    },
    build: {
      watch: {},
    },
  },
  preload: {
    resolve: {
      alias,
    },
    build: {
      watch: {},
    },
  },
  renderer: {
    resolve: {
      alias,
    },
    plugins: [
      tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/pages',
        generatedRouteTree: './src/app/routers/routeTree.gen.ts',
      }),
      react(),
    ] as any,
  },
});
