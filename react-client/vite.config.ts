import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    cors: false,
    watch: {
      usePolling: true,
    },
    hmr: {
      host: "0.0.0.0",
      port: 3010,
    },
    proxy: {
      "/proxy": {
        // Local env
        // target: "http://127.0.0.1:3001",
        target: "http://node_server:3001",
        secure: false,
        rewrite: (path: string) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});
