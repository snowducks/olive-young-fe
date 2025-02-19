const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // REST API 요청: /tickets로 시작하는 요청은 8083 포트로 전달
  app.use(
    '/tickets',
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );

  // WebSocket 연결: /ws 경로로 들어오는 WebSocket 요청은 8084 포트로 전달
  app.use(
    '/websocket',
    createProxyMiddleware({
      target: 'ws://localhost:8084',
      ws: true, // WebSocket 프록시 활성화
      changeOrigin: true,
    })
  );
};
