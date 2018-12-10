import { Col, Form } from 'antd';
import DataEntry from './DataEntry';
import * as React from 'react';
import { DecoratorsTableHeader } from 'wtm/components/table/tableHeader';
import Store from '../store';
const FormItem = Form.Item;
const colLayout = {
    xl: 6,
    lg: 8,
    md: 12
}
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
 * 组件继承 支持重写,
 */
@DecoratorsTableHeader({
    Store,
    renderItem: (props) => {
        const { form, initialValue } = props;
        const { getFieldDecorator } = form;
        return [
            {{{HeaderFormItem search}}}
        ]
    }
})
export default class HeaderComponent extends React.Component<any, any>{
    render() {
        return <div></div>
    }
}

