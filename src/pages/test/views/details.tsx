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
                
                <FormItem label="主键" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        rules: [{"required":true,"message":"主键 不能为空!"}],
                    })(Models.id)}
                </FormItem>
                <FormItem label="产品组编号" {...formItemLayout}>
                    {getFieldDecorator('productGroupCode', {
                        rules: [{"required":true,"message":"产品组编号 不能为空!"},{"min":0,"message":"产品组编号 最小长度 0位!"},{"max":50,"message":"产品组编号 最大长度 50位!"}],
                    })(Models.productGroupCode)}
                </FormItem>
                <FormItem label="产品组名称" {...formItemLayout}>
                    {getFieldDecorator('productGroupName', {
                        rules: [{"required":true,"message":"产品组名称 不能为空!"},{"min":0,"message":"产品组名称 最小长度 0位!"},{"max":200,"message":"产品组名称 最大长度 200位!"}],
                    })(Models.productGroupName)}
                </FormItem>
                <FormItem label="事业部" {...formItemLayout}>
                    {getFieldDecorator('buCode', {
                        rules: [{"required":true,"message":"事业部 不能为空!"},{"min":0,"message":"事业部 最小长度 0位!"},{"max":50,"message":"事业部 最大长度 50位!"}],
                    })(Models.buCode)}
                </FormItem>
                <FormItem label="DOA返回仓库" {...formItemLayout}>
                    {getFieldDecorator('doaWhCode', {
                        rules: [{"min":0,"message":"DOA返回仓库 最小长度 0位!"},{"max":50,"message":"DOA返回仓库 最大长度 50位!"}],
                    })(Models.doaWhCode)}
                </FormItem>
                <FormItem label="法人编号" {...formItemLayout}>
                    {getFieldDecorator('corpCode', {
                        rules: [{"min":0,"message":"法人编号 最小长度 0位!"},{"max":50,"message":"法人编号 最大长度 50位!"}],
                    })(Models.corpCode)}
                </FormItem>
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
                 
                <FormItem label="主键" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        rules: [{"required":true,"message":"主键 不能为空!"}],
                        initialValue: details['id'],
                    })(Models.id)}
                </FormItem>
                <FormItem label="产品组编号" {...formItemLayout}>
                    {getFieldDecorator('productGroupCode', {
                        rules: [{"required":true,"message":"产品组编号 不能为空!"},{"min":0,"message":"产品组编号 最小长度 0位!"},{"max":50,"message":"产品组编号 最大长度 50位!"}],
                        initialValue: details['productGroupCode'],
                    })(Models.productGroupCode)}
                </FormItem>
                <FormItem label="产品组名称" {...formItemLayout}>
                    {getFieldDecorator('productGroupName', {
                        rules: [{"required":true,"message":"产品组名称 不能为空!"},{"min":0,"message":"产品组名称 最小长度 0位!"},{"max":200,"message":"产品组名称 最大长度 200位!"}],
                        initialValue: details['productGroupName'],
                    })(Models.productGroupName)}
                </FormItem>
                <FormItem label="事业部" {...formItemLayout}>
                    {getFieldDecorator('buCode', {
                        rules: [{"required":true,"message":"事业部 不能为空!"},{"min":0,"message":"事业部 最小长度 0位!"},{"max":50,"message":"事业部 最大长度 50位!"}],
                        initialValue: details['buCode'],
                    })(Models.buCode)}
                </FormItem>
                <FormItem label="DOA返回仓库" {...formItemLayout}>
                    {getFieldDecorator('doaWhCode', {
                        rules: [{"min":0,"message":"DOA返回仓库 最小长度 0位!"},{"max":50,"message":"DOA返回仓库 最大长度 50位!"}],
                        initialValue: details['doaWhCode'],
                    })(Models.doaWhCode)}
                </FormItem>
                <FormItem label="法人编号" {...formItemLayout}>
                    {getFieldDecorator('corpCode', {
                        rules: [{"min":0,"message":"法人编号 最小长度 0位!"},{"max":50,"message":"法人编号 最大长度 50位!"}],
                        initialValue: details['corpCode'],
                    })(Models.corpCode)}
                </FormItem>
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
                
                <FormItem label="主键" {...formItemLayout}>
                    <span>{details['id']}</span>
                </FormItem>
                <FormItem label="产品组编号" {...formItemLayout}>
                    <span>{details['productGroupCode']}</span>
                </FormItem>
                <FormItem label="产品组名称" {...formItemLayout}>
                    <span>{details['productGroupName']}</span>
                </FormItem>
                <FormItem label="事业部" {...formItemLayout}>
                    <span>{details['buCode']}</span>
                </FormItem>
                <FormItem label="DOA返回仓库" {...formItemLayout}>
                    <span>{details['doaWhCode']}</span>
                </FormItem>
                <FormItem label="法人编号" {...formItemLayout}>
                    <span>{details['corpCode']}</span>
                </FormItem>
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
