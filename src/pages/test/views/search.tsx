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
            
                <Col {...colLayout} key="productGroupCode">
                    <FormItem label="产品组编号" {...formItemLayout}>
                        {getFieldDecorator('productGroupCode', {
                            initialValue: searchParams['productGroupCode'],
                        })(Models.productGroupCode)}
                    </FormItem>
                </Col>,
                <Col {...colLayout} key="productGroupName">
                    <FormItem label="产品组名称" {...formItemLayout}>
                        {getFieldDecorator('productGroupName', {
                            initialValue: searchParams['productGroupName'],
                        })(Models.productGroupName)}
                    </FormItem>
                </Col>,
                <Col {...colLayout} key="buCode">
                    <FormItem label="事业部" {...formItemLayout}>
                        {getFieldDecorator('buCode', {
                            initialValue: searchParams['buCode'],
                        })(Models.buCode)}
                    </FormItem>
                </Col>,
                <Col {...colLayout} key="doaWhCode">
                    <FormItem label="DOA返回仓库" {...formItemLayout}>
                        {getFieldDecorator('doaWhCode', {
                            initialValue: searchParams['doaWhCode'],
                        })(Models.doaWhCode)}
                    </FormItem>
                </Col>,
                <Col {...colLayout} key="corpCode">
                    <FormItem label="法人编号" {...formItemLayout}>
                        {getFieldDecorator('corpCode', {
                            initialValue: searchParams['corpCode'],
                        })(Models.corpCode)}
                    </FormItem>
                </Col>
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
