/**!
 * 
 * 
 * 
 * 
 * 
 * swagger 类型文件
 * 这个文件会随着 swagger 模块更新修改
 * 
 * 
 * 
 * 
 *  
 */
declare namespace WTM {
    interface IActionsBtutton {
        /** 按钮状态 */
        state: boolean
        /** 按钮名称 */
        name: string
    }
    /**
     * 页面按钮
     */
    interface IActions {
        /** 添加按钮 */
        insert: IActionsBtutton;
        /** 添加修改 */
        update: IActionsBtutton;
        /** 删除按钮 */
        delete: IActionsBtutton;
        /** 导入按钮 */
        import: IActionsBtutton;
        /** 导出按钮 */
        export: IActionsBtutton;
        [key: string]: IActionsBtutton
    }
    /**
     * Swagger 解析格式
     */
    interface ISwaggerModel {
        /** 模型唯一key */
        key?: string;
        /** 模型名称 swagger */
        name?: string;
        /** 控制器备注 */
        description?: string;
        /** 组件名称 编辑输入 */
        componentName?: string;
        /** 组件icon */
        icon?: string;
        /** 菜单名称 */
        menuName?: string;
        /** 模板 */
        template?: string;
        urls?: IUrls;
        /** 操作权限 */
        actions?: IActions
        /** 数据 id 唯一标识  */
        idKey?: string;
        /** 地址前缀 */
        // address?: string;
        /** teble 列 属性 */
        columns?: any[];
        /** 搜索条件 */
        search?: any[];
        /** 数据插入属性 */
        insert?: any[];
        /** 数据修改属性 */
        update?: any[];

    }
    interface IUrl {
        src: string;
        method: string;
        [key: string]: any;
    }
    /** 接口地址 */
    interface IUrls {
        /** 搜索 */
        search: IUrl;
        /** 详情 */
        details: IUrl;
        /** 添加 */
        insert: IUrl;
        /** 修改 */
        update: IUrl;
        /** 删除 */
        delete: IUrl;
        /** 导入 */
        import: IUrl;
        /** 导出 */
        export: IUrl;
        /** 模板 */
        template: IUrl;
        [key: string]: IUrl;
    }
    /**
     * 公共属性
     */
    interface ICommon {
        address?: string;
        params?: {
            [key: string]: any
        } | string 
    }
    /**
     * 自定义属性 .....
     */
    interface IAttribute {
        // 可用
        available?: boolean;
        // 可编辑
        update?: boolean;
        // 公共属性
        common?: ICommon
    }
}


