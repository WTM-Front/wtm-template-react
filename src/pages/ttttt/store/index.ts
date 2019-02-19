import DataSource from 'store/dataSource';
export class Store extends DataSource {
    constructor() {
        super();
    }
    // 动作权限  可在路由进入的时候注入
    // Actions = {
    //     insert: true,
    //     update: true,
    //     delete: true,
    //     import: true,
    //     export: true,
    // }
    /** 数据 ID 索引 */
    IdKey = 'id';
    // 支持 嵌套 参数 /user/{ID}/{AAA}/{BBB}
    Urls = {
        ...this.Urls,
        
        search:{
            src: '/productGroup/search',
            method: 'post'
        },
        details:{
            src: '/productGroup/get/{id}',
            method: 'get'
        },
        insert:{
            src: '/productGroup/add',
            method: 'post'
        },
        update:{
            src: '/productGroup/edit',
            method: 'post'
        },
        delete:{
            src: '/productGroup/delete',
            method: 'post'
        },
        import:{
            src: '/productGroup/import',
            method: 'post'
        },
        export:{
            src: '/productGroup/export',
            method: 'post'
        },
        template:{
            src: '/productGroup/template',
            method: 'post'
        }
    }
}
export default new Store();