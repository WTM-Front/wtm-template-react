import StoreBasice from 'store/table';
import Swagger from '../pageConfig.json';
export class Store extends StoreBasice {
    constructor() {
        super({
            // api 地址前缀
            address: '{{{ address }}}'
        });
    }
    /** swagger 解析数据结构 */ 
    Swagger = Swagger
    /** 数据 ID 索引 */
    IdKey ='{{{ idKey }}}';
    Actions = {{{JSONStringify actions }}}
}
export default new Store();