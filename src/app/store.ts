/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-07-24 05:02:33
 * @modify date 2018-07-24 05:02:33
 * @desc [description]
*/
import { message, notification } from "antd";
import { Request } from "utils/Request";
import lodash from 'lodash';
import { action, observable, runInAction, toJS } from "mobx";
import { Help } from 'utils/Help';
import subMenuJson from './subMenu.json';
const subMenu = lodash.cloneDeep(subMenuJson.subMenu);
interface subMenu {
    Key?: string,
    Name?: string,
    Icon?: string,
    Path?: string,
    Component?: string,
    Children?: any[],
    // [key: string]: any
}
export class Store {
    constructor() {
        subMenu.push({
            "Key": "system",
            "Name": "系统设置",
            "Icon": "setting",
            "Path": "/system",
            "Component": "",
            "Children": []
        })
        this.setSubMenu(subMenu)
    }
    /** 菜单展开 收起 */
    @observable collapsed = true;
    /** 菜单 */
    @observable subMenu: subMenu[] = [];
    /**  设置菜单 */
    @action.bound
    setSubMenu(subMenu) {
        this.subMenu = subMenu;
    }
    /** 菜单收起 展开 */
    @action.bound
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        dispatchEvent(new CustomEvent('resize'));
    }
}
export default new Store();