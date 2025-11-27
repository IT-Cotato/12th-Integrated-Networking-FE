import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://35.74.254.38:8080", // 백엔드 서버
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
