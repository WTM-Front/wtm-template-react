import { Form, Col } from 'antd';
import DataEntry from './DataEntry';
import * as React from 'react';
import { DecoratorsTableEdit } from 'wtm/components/table/tableDetails';
import Store from '../store';
import { observer } from 'mobx-react';
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
@DecoratorsTableEdit(Store)
@observer
export default class DetailsComponent extends React.Component<any, any>{
    render() {
        if (Store.pageState.detailsType == "Update") {
            return <UpdateComponent {...this.props} />
        }
        if (Store.pageState.detailsType == "Info") {
            return <InfoComponent {...this.props} />
        }
        return <InsertComponent {...this.props} />
    }
}
/**
 * 添加
 */
class InsertComponent extends React.Component<any, any>{
    render() {
        const { form, initialValue } = this.props;
        const { getFieldDecorator } = form;
        return <>
            {{{EditFormItem insert}}}
        </>
    }
}
/**
 * 修改
 */
class UpdateComponent extends React.Component<any, any>{
    render() {
        const { form, initialValue } = this.props;
        const { getFieldDecorator } = form;
        return <>
            {{{EditFormItem insert}}}
        </>
    }
}
/**
 * 信息
 */
class InfoComponent extends React.Component<any, any>{
    render() {
        const { form, initialValue } = this.props;
        const { getFieldDecorator } = form;
        return <>
            {{{InfoFormItem columns}}}
        </>
    }
}