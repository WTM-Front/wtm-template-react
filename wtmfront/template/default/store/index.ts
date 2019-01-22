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
    IdKey = '{{{ idKey }}}';
    // 支持 嵌套 参数 /user/{ID}/{AAA}/{BBB}
    Urls = {
        ...this.Urls,
        {{{ JSONUrls urls}}}
    }
}
export default new Store();