import { Col, Form, Input, Button } from 'antd';
import { DecoratorsSearch } from 'components/dataView/header/search';
import * as React from 'react';
import Models from './models';
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
 * 搜索条件头
 */
@DecoratorsSearch({
    Store,
    FormItems: ({ getFieldDecorator }) => {
        const { searchParams } = Store
        return [
            {{{HeaderFormItem search}}}
        ]
    }
})
export default class extends React.Component<any, any> {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return this.props.children
    }
}
