import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tailwindcss(),
    !process.env.VITEST && reactRouter(), // vitest
    tsconfigPaths(),
  ],
  // npm run devでホストからアクセスできるようにする
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    allowedHosts: ['dev-meraku.com'],
  },
  test: {
    // vitest
    globals: true,
    environment: 'jsdom',
  },
});
