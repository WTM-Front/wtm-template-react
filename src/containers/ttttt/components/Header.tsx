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
            
            <Col {...colLayout} key='whCode'>
                <FormItem label="仓库编号" {...formItemLayout}>
                    {getFieldDecorator('whCode',{
                        initialValue: initialValue('whCode',''),
                    })(
                        DataEntry.whCode
                    )}
                </FormItem>
            </Col> ,
            <Col {...colLayout} key='whName'>
                <FormItem label="仓库名称" {...formItemLayout}>
                    {getFieldDecorator('whName',{
                        initialValue: initialValue('whName',''),
                    })(
                        DataEntry.whName
                    )}
                </FormItem>
            </Col> ,
            <Col {...colLayout} key='whLevel'>
                <FormItem label="仓库级别" {...formItemLayout}>
                    {getFieldDecorator('whLevel',{
                        initialValue: initialValue('whLevel',''),
                    })(
                        DataEntry.whLevel
                    )}
                </FormItem>
            </Col> ,
            <Col {...colLayout} key='providerCode'>
                <FormItem label="仓库服务商编号" {...formItemLayout}>
                    {getFieldDecorator('providerCode',{
                        initialValue: initialValue('providerCode',''),
                    })(
                        DataEntry.providerCode
                    )}
                </FormItem>
            </Col> 
        ]
    }
})
export default class HeaderComponent extends React.Component<any, any>{
    render() {
        return <div></div>
    }
}

