import { Button, Divider, Drawer, Form, Spin } from 'antd';
import decoForm from 'components/decorators/form';
import { observer } from 'mobx-react';
import * as React from 'react';
import Regular from 'utils/Regular';
import ToImg from 'components/dataView/help/toImg';
import Store from '../store';
import Models from './models';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
/**
 *  详情 窗口 
 *  根据 类型 显示不同的 窗口
 */
@observer
export default class extends React.Component<any, any> {
    /**
     * 根据状态类型 渲染  添加。修改，详情信息
     * @param detailsType 
     */
    renderBody(detailsType) {
        switch (detailsType) {
            case 'Insert':
                //添加
                return <InsertForm {...this.props} />
                break;
            case 'Update':
                // 修改
                return <UpdateForm {...this.props} />
                break;
            default:
                // 详情
                return <InfoForm {...this.props} />
                break;
        }
    }
    render() {
        const enums = {
            Insert: "新建",
            Update: "修改",
            Info: "详情"
        };
        const { detailsType, visibleEdit, loadingEdit } = Store.pageState
        return <Drawer
            title={enums[detailsType]}
            className="app-drawer"
            width={500}
            placement="right"
            closable={false}
            onClose={() => { Store.onPageState("visibleEdit", false) }}
            visible={visibleEdit}
            destroyOnClose={true}
        >
            {this.renderBody(detailsType)}
        </Drawer>
    }
}
/**
 * 添加表单
 */
@decoForm
@observer
class InsertForm extends React.Component<any, any> {
    onSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Store.onEdit(values);
            }
        });
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <DrawerFormItem submit>
                {{{InsertFormItem insert}}}
            </DrawerFormItem>

        </Form>
    }
}
/**
 * 修改表单
 */
@decoForm
@observer
class UpdateForm extends React.Component<any, any> {
    onSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // values = mapValues(values, "YYYY-MM-DD")
                Store.onEdit(values);
            }
        });
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const details = { ...Store.details };
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <DrawerFormItem submit>
                 {{{EditFormItem insert}}}
            </DrawerFormItem>
        </Form>
    }
}
/**
 * 详情
 */
@observer
class InfoForm extends React.Component<any, any> {
    render() {
        const details = { ...Store.details };
        return <Form >
            <DrawerFormItem>
                {{{InfoFormItem insert}}}
            </DrawerFormItem>
        </Form>
    }
}
/**
 * Items 外壳
 */
@observer
class DrawerFormItem extends React.Component<{ submit?: boolean }, any> {
    render() {
        const { loadingEdit } = Store.pageState;
        return < >
            <div className="app-drawer-formItem">
                <Spin tip="Loading..." spinning={loadingEdit}>
                    {this.props.children}
                </Spin>
            </div>
            <div className="app-drawer-btns" >
                <Button onClick={() => Store.onPageState("visibleEdit", false)} >取消 </Button>
                {this.props.submit && <>
                    <Divider type="vertical" />
                    <Button loading={Store.pageState.loadingEdit} type="primary" htmlType="submit"  >提交 </Button>
                </>}
            </div>
        </>
    }
}
