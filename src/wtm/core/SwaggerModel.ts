import { ColumnProps } from 'antd/lib/table';
import lodash from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import Common from './Common';
/** 编辑属性 */
interface Ifield {
    type: string;
    description: string;
    allowEmptyValue: boolean;
    rules: any[];
    attribute: any;
    key: string;
    /** 格式化类型 */
    format: string;
}
/** 列属性 */
interface Icolumns extends ColumnProps<any> {
    /** 格式化类型 */
    format?: string
}
/**
 * swagger 模型信息
 */
export default class SwaggerModel {
    constructor() {
    }
    /**
     * swagger 解析信息 
     */
    Swagger: ISwaggerModel;
    /**
     * 所有列属性
     */
    allColumns = [];
    /**
    * 列属性配置
    */
    @observable
    private _columns: Icolumns[];
    /**
     * 表格列
     */
    @computed
    public get columns(): Icolumns[] {
        // 取出 所有标记可用的 table选项
        if (!this._columns) {
            // 所有列属性
            this.allColumns = this.Swagger.columns.map(x => {
                return {
                    title: x.description,
                    dataIndex: x.key,
                    format: x.format || '',
                    attribute: x.attribute
                }
            });
            // 服务器推送 对比 
            Common.CustomColumnSubject.subscribe(columns => {
                try {
                    if (columns.length <= 0) { return }
                    // 获取 对应的 模块配置 
                    columns = (lodash.find(columns, { entity: this.Swagger.name }) as any).columns;
                    if (columns.length <= 0) { return }
                    // 重置 可用列
                    this.allColumns = this.allColumns.map(x => {
                        if (lodash.includes(columns, x.dataIndex)) {
                            x.attribute.available = true
                        } else {
                            x.attribute.available = false
                        }
                        return x;
                    });
                    runInAction(() => {
                        this._columns = lodash.filter(this.allColumns, x => lodash.includes(columns, x.dataIndex));
                    })
                } catch (error) {
                    console.log(error);
                }
            });
            this._columns = this.allColumns.filter(x => x.attribute.available)
        }
        return this._columns
    }
    /**
     * 设置列
     */
    public set columns(value: Icolumns[]) {
        this._columns = lodash.filter(this.allColumns, x => lodash.includes(value, x.dataIndex));
        // 保存设置到服务器
        Common.setCustomColumn({
            entity: this.Swagger.name,
            columns: value
        })
    }
    /**
     * 更新 columns 属性
     * @param columns 
     */
    @action.bound
    public onColumnsUpdate(columns: Icolumns[]) {
        this._columns = columns;
    }
    /**
     * 添加属性
     */
    private _install: Ifield[];
    public get install(): Ifield[] {
        if (!this._install) {
            this._install = this.Swagger.install.filter(x => x.attribute.available)
        }
        return this._install;
    }
    /**
     * 隐藏的添加属性
     */
    private _hideInstall: Ifield[];
    public get hideInstall(): Ifield[] {
        if (!this._hideInstall) {
            this._hideInstall = this.Swagger.install.filter(x => !x.attribute.available)
        }
        return this._hideInstall;
    }
    /**
     * 需要追加的添加属性。
     */
    @observable
    private _appendInstall: Ifield[];
    @computed
    public get appendInstall(): Ifield[] {
        if (!this._appendInstall) {
            this._appendInstall = [];
        }
        return this._appendInstall;
    }
    public set appendInstall(value: Ifield[]) {
        this._appendInstall = lodash.filter(this.Swagger.install, x => lodash.includes(value, x.key));
    }

}