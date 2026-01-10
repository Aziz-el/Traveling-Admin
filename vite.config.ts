
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tailwindcss from '@tailwindcss/vite';
  import { visualizer } from 'rollup-plugin-visualizer';
  import path from 'path';

  export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      ...(process.env.ANALYZE === 'true' ? [visualizer({ filename: 'build/bundle-report.html', open: false })] : []),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'https://genbiadmin1.vercel.app',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  });