// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Add base URL for deployment
  base: "./",
  // Build configuration
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-redux"],
          redux: ["@reduxjs/toolkit", "redux"],
        },
      },
    },
  },
  // Server configuration
  server: {
    headers: {
      "Content-Type": "application/javascript",
    },
  },
});
