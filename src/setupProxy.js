const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://www.ahsj.link/rambo",
            changeOrigin: true,
            pathRewrite: {
                "/api": "",
            },
        })
    );
};