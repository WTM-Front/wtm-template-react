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
    /** 接口地址 */
    Urls= {
    "search": {
        "src": "/warehouse/search",
        "method": "post"
    },
    "details": {
        "src": "/warehouse/get/{id}",
        "method": "get"
    },
    "insert": {
        "src": "/warehouse/add",
        "method": "post"
    },
    "update": {
        "src": "/warehouse/edit",
        "method": "post"
    },
    "delete": {
        "src": "/warehouse/delete",
        "method": "post"
    },
    "import": {
        "src": "/warehouse/import",
        "method": "post"
    },
    "export": {
        "src": "/warehouse/export",
        "method": "post"
    },
    "template": {
        "src": "/warehouse/template",
        "method": "post"
    }
}
}
export default new Store();