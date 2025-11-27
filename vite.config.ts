import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), "");

  // 환경 변수에서 백엔드 API URL 가져오기
  const API_TARGET = env.VITE_API_BASE_URL;
  const API_HOST = new URL(API_TARGET).hostname;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              // Host 헤더를 타겟 서버로 변경
              proxyReq.setHeader("Host", API_HOST);
              // Origin 헤더 제거 (프록시를 통한 요청이므로)
              proxyReq.removeHeader("origin");
              proxyReq.removeHeader("referer");
              console.log("프록시 요청:", {
                method: req.method,
                url: req.url,
                headers: proxyReq.getHeaders(),
              });
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              // CORS 헤더 제거 (프록시가 처리하므로)
              proxyRes.headers["access-control-allow-origin"] = "*";
              proxyRes.headers["access-control-allow-methods"] =
                "GET, POST, PUT, DELETE, PATCH, OPTIONS";
              proxyRes.headers["access-control-allow-headers"] =
                "Content-Type, Authorization, Accept";
              console.log("프록시 응답:", {
                url: req.url,
                statusCode: proxyRes.statusCode,
                headers: proxyRes.headers,
              });
            });
            proxy.on("error", (err, _req, _res) => {
              console.error("프록시 에러:", err);
            });
          },
        },
      },
    },
  };
});
