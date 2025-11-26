import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://15.164.104.156',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Host 헤더를 타겟 서버로 변경
            proxyReq.setHeader('Host', '15.164.104.156');
            // Origin 헤더 제거 (프록시를 통한 요청이므로)
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
            console.log('프록시 요청:', {
              method: req.method,
              url: req.url,
              headers: proxyReq.getHeaders(),
            });
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // CORS 헤더 제거 (프록시가 처리하므로)
            proxyRes.headers['access-control-allow-origin'] = '*';
            proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
            proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, Accept';
            console.log('프록시 응답:', {
              url: req.url,
              statusCode: proxyRes.statusCode,
              headers: proxyRes.headers,
            });
          });
          proxy.on('error', (err, _req, _res) => {
            console.error('프록시 에러:', err);
          });
        },
      },
    },
  },
})
