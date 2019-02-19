import { Form } from 'antd';
import { InfoShell, InfoShellCol, InfoShellFooter, ToImg, toValues } from 'components/dataView';
import { DesError, DesForm } from 'components/decorators'; //错误
import GlobalConfig from 'global.config'; //全局配置
import lodash from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import Regular from 'utils/Regular'; //正则
import Store from '../store'; //页面状态
import ModelsCreate from './models'; //模型
const formItemLayout = { ...GlobalConfig.formItemLayout };//布局
const formItemLayoutRow = { ...GlobalConfig.formItemLayoutRow }
/**
 *  详情 窗口 
 *  根据 类型 显示不同的 窗口
 */
@DesError
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
        return <InfoShell
            title={enums[detailsType]}
            onClose={() => { Store.onPageState("visibleEdit", false) }}
            visible={visibleEdit}
        >
            {this.renderBody(detailsType)}
        </InfoShell>
    }
}
/**
 * 添加表单
 */
@DesError
@DesForm
@observer
class InsertForm extends React.Component<any, any> {
    onSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log("数据", values);
            if (!err) {
                Store.onEdit(values);
            }
        });
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const Models = ModelsCreate(this.props);
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <FooterFormItem submit>
               
                <Form.Item label="主键" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        rules: [{"required":true,"message":"主键 不能为空!"}],
                    })(Models.id)}
                </Form.Item>
                <Form.Item label="产品组编号" {...formItemLayout}>
                    {getFieldDecorator('productGroupCode', {
                        rules: [{"required":true,"message":"产品组编号 不能为空!"},{"min":0,"message":"产品组编号 最小长度 0位!"},{"max":50,"message":"产品组编号 最大长度 50位!"}],
                    })(Models.productGroupCode)}
                </Form.Item>
                <Form.Item label="产品组名称" {...formItemLayout}>
                    {getFieldDecorator('productGroupName', {
                        rules: [{"required":true,"message":"产品组名称 不能为空!"},{"min":0,"message":"产品组名称 最小长度 0位!"},{"max":200,"message":"产品组名称 最大长度 200位!"}],
                    })(Models.productGroupName)}
                </Form.Item>
                <Form.Item label="事业部" {...formItemLayout}>
                    {getFieldDecorator('buCode', {
                        rules: [{"required":true,"message":"事业部 不能为空!"},{"min":0,"message":"事业部 最小长度 0位!"},{"max":50,"message":"事业部 最大长度 50位!"}],
                    })(Models.buCode)}
                </Form.Item>
                <Form.Item label="DOA返回仓库" {...formItemLayout}>
                    {getFieldDecorator('doaWhCode', {
                        rules: [{"min":0,"message":"DOA返回仓库 最小长度 0位!"},{"max":50,"message":"DOA返回仓库 最大长度 50位!"}],
                    })(Models.doaWhCode)}
                </Form.Item>
                <Form.Item label="法人编号" {...formItemLayout}>
                    {getFieldDecorator('corpCode', {
                        rules: [{"min":0,"message":"法人编号 最小长度 0位!"},{"max":50,"message":"法人编号 最大长度 50位!"}],
                    })(Models.corpCode)}
                </Form.Item>
                <Form.Item label="产品组大类" {...formItemLayout}>
                    {getFieldDecorator('productGroupType', {
                        rules: [{"min":0,"message":"产品组大类 最小长度 0位!"},{"max":50,"message":"产品组大类 最大长度 50位!"}],
                    })(Models.productGroupType)}
                </Form.Item>
            </FooterFormItem>

        </Form>
    }
}
/**
 * 修改表单
 */
@DesError
@DesForm
@observer
class UpdateForm extends React.Component<any, any> {
    onSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log("数据", values);
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
        const Models = ModelsCreate(this.props);
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <FooterFormItem submit>
                
                <Form.Item label="主键" {...formItemLayout}>
                    {getFieldDecorator('id', {
                        rules: [{"required":true,"message":"主键 不能为空!"}],
                        initialValue: details['id'],
                    })(Models.id)}
                </Form.Item>
                <Form.Item label="产品组编号" {...formItemLayout}>
                    {getFieldDecorator('productGroupCode', {
                        rules: [{"required":true,"message":"产品组编号 不能为空!"},{"min":0,"message":"产品组编号 最小长度 0位!"},{"max":50,"message":"产品组编号 最大长度 50位!"}],
                        initialValue: details['productGroupCode'],
                    })(Models.productGroupCode)}
                </Form.Item>
                <Form.Item label="产品组名称" {...formItemLayout}>
                    {getFieldDecorator('productGroupName', {
                        rules: [{"required":true,"message":"产品组名称 不能为空!"},{"min":0,"message":"产品组名称 最小长度 0位!"},{"max":200,"message":"产品组名称 最大长度 200位!"}],
                        initialValue: details['productGroupName'],
                    })(Models.productGroupName)}
                </Form.Item>
                <Form.Item label="事业部" {...formItemLayout}>
                    {getFieldDecorator('buCode', {
                        rules: [{"required":true,"message":"事业部 不能为空!"},{"min":0,"message":"事业部 最小长度 0位!"},{"max":50,"message":"事业部 最大长度 50位!"}],
                        initialValue: details['buCode'],
                    })(Models.buCode)}
                </Form.Item>
                <Form.Item label="DOA返回仓库" {...formItemLayout}>
                    {getFieldDecorator('doaWhCode', {
                        rules: [{"min":0,"message":"DOA返回仓库 最小长度 0位!"},{"max":50,"message":"DOA返回仓库 最大长度 50位!"}],
                        initialValue: details['doaWhCode'],
                    })(Models.doaWhCode)}
                </Form.Item>
                <Form.Item label="法人编号" {...formItemLayout}>
                    {getFieldDecorator('corpCode', {
                        rules: [{"min":0,"message":"法人编号 最小长度 0位!"},{"max":50,"message":"法人编号 最大长度 50位!"}],
                        initialValue: details['corpCode'],
                    })(Models.corpCode)}
                </Form.Item>
                <Form.Item label="产品组大类" {...formItemLayout}>
                    {getFieldDecorator('productGroupType', {
                        rules: [{"min":0,"message":"产品组大类 最小长度 0位!"},{"max":50,"message":"产品组大类 最大长度 50位!"}],
                        initialValue: details['productGroupType'],
                    })(Models.productGroupType)}
                </Form.Item>               
            </FooterFormItem>
        </Form>
    }
}
/**
 * 详情
 */
@DesError
@observer
class InfoForm extends React.Component<any, any> {
    render() {
        const details = { ...Store.details };
        return <Form >
            <FooterFormItem>
                
                <Form.Item label="主键" {...formItemLayout}>
                    <span>{lodash.get(details,"id", "")}</span>
                </Form.Item>
                <Form.Item label="产品组编号" {...formItemLayout}>
                    <span>{lodash.get(details,"productGroupCode", "")}</span>
                </Form.Item>
                <Form.Item label="产品组名称" {...formItemLayout}>
                    <span>{lodash.get(details,"productGroupName", "")}</span>
                </Form.Item>
                <Form.Item label="事业部" {...formItemLayout}>
                    <span>{lodash.get(details,"buCode", "")}</span>
                </Form.Item>
                <Form.Item label="DOA返回仓库" {...formItemLayout}>
                    <span>{lodash.get(details,"doaWhCode", "")}</span>
                </Form.Item>
                <Form.Item label="法人编号" {...formItemLayout}>
                    <span>{lodash.get(details,"corpCode", "")}</span>
                </Form.Item>
                <Form.Item label="产品组大类" {...formItemLayout}>
                    <span>{lodash.get(details,"productGroupType", "")}</span>
                </Form.Item>                
            </FooterFormItem>
        </Form>
    }
}
/**
 * Items 外壳
 */
@DesError
@observer
class FooterFormItem extends React.Component<{ submit?: boolean }, any> {
    render() {
        const { loadingEdit } = Store.pageState;
        return <InfoShellFooter
            submit={this.props.submit}
            loadingEdit={loadingEdit}
            onCancel={() => Store.onPageState("visibleEdit", false)}>
            {this.props.children}
        </InfoShellFooter>
    }
}