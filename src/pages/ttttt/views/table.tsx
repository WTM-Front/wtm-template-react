import { DataViewTable, ToImg } from 'components/dataView';
import { DesError } from 'components/decorators';
import React from 'react';
import Store from '../store';
import Action from './action';
/**
 * 列 信息配置
 * 完整参数列表 https://ant.design/components/table-cn/#components-table-demo-dynamic-settings
 * dataIndex:属性名称 区分大小写
 * title:表格显示的中文标题
 */
const columns = [
    
        {
            title: '主键',
            dataIndex: 'id',
            render: columnsRender,
        },
        {
            title: '产品组编号',
            dataIndex: 'productGroupCode',
            render: columnsRender,
        },
        {
            title: '产品组名称',
            dataIndex: 'productGroupName',
            render: columnsRender,
        },
        {
            title: '事业部编号',
            dataIndex: 'buCode',
            render: columnsRender,
        },
        {
            title: '事业部名称',
            dataIndex: 'buName',
            render: columnsRender,
        },
        {
            title: 'DOA返回仓库编号',
            dataIndex: 'doaWhCode',
            render: columnsRender,
        },
        {
            title: 'DOA返回仓库名称',
            dataIndex: 'doaWhName',
            render: columnsRender,
        },
        {
            title: '法人编号',
            dataIndex: 'corpCode',
            render: columnsRender,
        },
        {
            title: '法人',
            dataIndex: 'corpName',
            render: columnsRender,
        },
        {
            title: '产品组大类编号',
            dataIndex: 'productGroupType',
            render: columnsRender,
        },
        {
            title: '产品组大类',
            dataIndex: 'productGroupTypeName',
            render: columnsRender,
        }
]

/**
 * 表格
 */
@DesError
export default class extends React.Component<any, any> {
    /**
     * 操作动作
     */
    renderColumns() {
        const tableColumns: any[] = [...columns];
        // 根据需求 加入行动作
        if (true) {
            tableColumns.push(
                {
                    title: 'Action',
                    dataIndex: 'Action',
                    // fixed: 'right',//固定 列
                    // width: 160,
                    render: (text, record) => <Action.rowAction data={record} />
                }
            )
        }
        return tableColumns
    }
    render() {
        return <DataViewTable Store={Store} columns={this.renderColumns()} />
    }
}
/**
 * 重写 列渲染 函数 
 * @param text 
 * @param record 
 */
function columnsRender(text, record) {
    return <div  title={text}>
        <span>{text}</span>
    </div>
}
