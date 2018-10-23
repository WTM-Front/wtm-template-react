module.exports = {
    type: "React",
    // 服务器端口地址
    serverPort: 8765,
    // helper 路径
    registerHelper: "wtmfront/registerHelper",
    // 模板路径
    template: "wtmfront/template",
    // 菜单写入 文件
    subMenu: "src/subMenu.json",
    // 生成组件存放路径
    containers: "src/containers",
    // api 地址
    apiUrl: "http://10.99.246.52:8010",
    // swagger doc 地址
    swaggerDoc: "http://localhost:8765/api-docs",
    // 规范 接口
    include: {
        // 列表搜索
        "search": {
            "name": "search",
            "type": "Post"
        },
        // 详情
        "details": {
            // "name": "get/{id}",
            "name": "get/{**}",
            "type": "Get"
        },
        // 插入
        "install": {
            "name": "add",
            "type": "Post"
        },
        // 修改
        "update": {
            "name": "edit",
            "type": "Post"
        },
        // 删除
        "delete": {
            "name": "delete",
            "type": "Post"
        },
        // 导入
        "import": {
            "name": "import",
            "type": "Post"
        },
        // 导出
        "export": {
            "name": "export",
            "type": "Post"
        },
        // execl 模板
        "template": {
            "name": "template",
            "type": "Post"
        }
    },
    // 公共接口地址
    public: [
        "common"
    ],
    // 排除
    exclude: [
        "rabbitmq"
    ]
}