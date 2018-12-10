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
    IdKey = '{{{ idKey }}}';
    /** 接口地址 */
    Urls= {{{ JSONStringify urls }}}
}
export default new Store();