const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8083", // 백엔드 서버 주소
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // /api/request -> http://localhost:8083/request
      },
    })
  );

};
