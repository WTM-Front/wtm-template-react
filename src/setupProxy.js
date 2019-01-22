const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(proxy('/masterdata', {
        target: 'http://clapi-t.lenovo.com/',
        changeOrigin: true,
        logLevel: "debug"
    }));
};