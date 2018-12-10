import { Button, Col, Divider, Dropdown, Menu, message, Popconfirm, Row } from 'antd';
import lodash from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { DecoratorsTableBody } from 'wtm/components/table/tableBody';
import Store from '../store';
@DecoratorsTableBody({
    Store: Store,
    columnAction: {
        title: '操作',
        dataIndex: 'Action',
        render: (text, record) => {
            return <ActionComponent data={record} />
        },
    }
})
@observer
export default class BodyComponent extends React.Component<any, any> {
    Store = Store;
    /**
     * 多选删除
     */
    private async onDelete() {
        const params = this.Store.dataSource.list.filter(x => this.Store.selectedRowKeys.some(y => y == x.key));
        await this.Store.onDelete(params)
    }
    /**
     * 多选修改
     */
    async onUpdate() {
        if (this.Store.selectedRowKeys.length == 1) {
            this.Store.onModalShow(lodash.find(this.Store.dataSource.list, ['key', lodash.head(this.Store.selectedRowKeys)]))
        } else {
            message.warn("请选择一条数据")
        }
    }
    render() {
        const { selectedRowKeys } = this.Store;
        const deletelength = selectedRowKeys.length;
        return <Row className="app-table-buttons">
            <Col span={6} className="app-table-buttons-text" >
                <span className="text-title">aaaaaa列表</span><span className="text-count">共 <span>{Store.dataSource.count}</span> 条记录</span>
            </Col>
            <Col span={18} className="app-table-buttons-btn" >
                <Button icon="plus" onClick={this.Store.onModalShow.bind(this.Store, {})} type="primary">新建</Button>
                <Divider type="vertical" />
                <Button icon="edit" onClick={this.onUpdate.bind(this)} disabled={deletelength < 1}>修改</Button>
                <Divider type="vertical" />
                <Popconfirm placement="right" title={`确定删除 ${deletelength}条 数据？`} onConfirm={this.onDelete.bind(this)} okText="Yes" cancelText="No">
                    <Button icon="delete" disabled={deletelength < 1}>
                        删除
                 </Button>
                </Popconfirm>
                <Divider type="vertical" />
                <Button icon="folder-add" onClick={() => { this.Store.onPageState("visiblePort", true) }}>导入</Button>
                <Divider type="vertical" />
                <Button icon="download" onClick={() => { this.Store.onExport() }}>导出</Button>
                <Divider type="vertical" />
                <Dropdown overlay={<Menu>
                    <Menu.Item>
                        <a >按钮1</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a >按钮2</a>
                    </Menu.Item>
                </Menu>}
                    placement="bottomCenter">
                    <Button icon="ellipsis" />
                </Dropdown>
            </Col>
        </Row>
    }
}
/**
 * 重写 按钮渲染示例
 */
class ActionComponent extends React.Component<{ data: any }, any> {
    Store = Store;
    async onDelete() {
        let data = await this.Store.onDelete([this.props.data])
        if (data) {
            this.Store.onSearch();
        }
    }
    onUpdate() {
        this.Store.onModalShow(this.props.data, "Update")
    }
    onInfo() {
        this.Store.onModalShow(this.props.data, "Info")
    }
    render() {
        return (
            <div className="app-table-tr-action">
                <a onClick={this.onUpdate.bind(this)} >修改</a>
                <Divider type="vertical" />
                <a onClick={this.onInfo.bind(this)} >查看</a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={this.onDelete.bind(this)} >
                    <a >删除</a>
                </Popconfirm>
            </div>
        );
    }
}