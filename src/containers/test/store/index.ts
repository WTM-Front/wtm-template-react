import StoreBasice from 'store/table';
import Swagger from '../pageConfig.json';
export class Store extends StoreBasice {
    constructor() {
        super({
            /** swagger 数据结构 */
            Swagger: Swagger
        });
    }
    /** 数据 ID 索引 */
    IdKey = 'id';
    Actions = {
    "insert": {
        "state": true,
        "name": "添加"
    },
    "update": {
        "state": true,
        "name": "修改"
    },
    "delete": {
        "state": false,
        "name": "删除"
    },
    "import": {
        "state": false,
        "name": "导入"
    },
    "export": {
        "state": false,
        "name": "导出"
    }
}
    Urls= {
    "search": {
        "src": "/school/search",
        "method": "post"
    },
    "details": {
        "src": "/school/get/{id}",
        "method": "get"
    },
    "insert": {
        "src": "/school/add",
        "method": "post"
    },
    "update": {
        "src": "/school/edit",
        "method": "post"
    },
    "delete": {
        "src": "/school/delete",
        "method": "post"
    },
    "import": {
        "src": "/school/import",
        "method": "post"
    },
    "export": {
        "src": "/school/export",
        "method": "post"
    },
    "template": {
        "src": "/school/template",
        "method": "post"
    }
}
}
export default new Store();