import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),

    // Gzip
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),

    // Brotli
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
  ],

  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,

    // Eliminar console/debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",

        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            return "vendor";
          }
        },
      },
    },
  },
});