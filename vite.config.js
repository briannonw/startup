import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/wws': {
        target: 'ws://localhost:4000',
        ws: true,
      },
    },
  },
});