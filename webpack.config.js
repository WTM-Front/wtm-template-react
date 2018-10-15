const webpack = require('./config/webpack.config');
const wtmfront = require('./wtmfront.config');
const config = {
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
};
module.exports = webpack(env => {
    return {
        port: 8100,
        proxy: {
            '/api': {
                target: wtmfront.api,
                pathRewrite: {
                    "^/api": ""
                },
                ...config
            },
        },
        deployWrite: `
        <!--             写点什么进去？             -->
        <script>
            console.log("写点什么？");
        </script>
        `,
        // 字符串写入 需要 使用 JSON.stringify 转换
        DefinePlugin: {
            APIADDRESS: JSON.stringify(env.type == "deploy" ? "/api" : "/api"),
        }
    }
})