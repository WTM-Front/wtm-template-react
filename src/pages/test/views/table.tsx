import Table from 'components/dataView/content/table';
import Visible from 'components/dataView/help/visible';
import ToImg from 'components/dataView/help/toImg';
import React from 'react';
import Store from '../store';
import { Divider, Popconfirm } from 'antd';

/**
 * 表格
 */
export default class extends React.Component<any, any> {
    async onDelete(data) {
        Store.onDelete(data)
    }
    async onUpdate(data) {
        Store.onModalShow(data, "Update")
    }
    async onInfo(data) {
        Store.onModalShow(data, "Info")
    }
    /**
     * 操作动作
     */
    renderColumns() {
        return [...columns,
        {
            title: 'Action',
            dataIndex: 'Action',
            // fixed: 'right',
            render: (text, record) => {
                return <div >
                    <a onClick={this.onInfo.bind(this, record)} >详情</a>
                    <Visible visible={Store.Actions.update}>
                        <Divider type="vertical" />
                        <a onClick={this.onUpdate.bind(this, record)} >修改</a>
                    </Visible>
                    <Visible visible={Store.Actions.delete}>
                        <Divider type="vertical" />
                        <Popconfirm title="确定删除?" onConfirm={this.onDelete.bind(this, record)} >
                            <a >删除</a>
                        </Popconfirm>
                    </Visible>
                </div>
            }
        }];
    }
    render() {
        return <Table Store={Store} columns={this.renderColumns()} />
    }
}
/**
 * 重写 列渲染 函数 
 * @param text 
 * @param record 
 */
const columnsRender = (text, record) => {
    return <div  title={text}>
        <span>{text}</span>
    </div>
}
/**
 * 列 信息配置
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
        }
]
