import { Form } from 'antd';
import { DataViewSearch } from 'components/dataView/header/search';
import { DesForm } from 'components/decorators';
import GlobalConfig from 'global.config'; //全局配置
import lodash from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import Store from '../store';
import ModelsCreate from './models';

const formItemLayout = {
    ...GlobalConfig.formItemLayout
};
@DesForm
@observer
export default class extends React.Component<any, any> {
    render() {
        const { getFieldDecorator } = this.props.form;
        const Models = ModelsCreate(this.props);
        return <DataViewSearch
            // columnCount={4} 默认全局
            // onReset={() => { }} 覆盖默认方法
            // onSubmit={() => { }} 覆盖默认方法
            Store={Store}
            form={this.props.form}
        >
           
                    <Form.Item label="产品组编号" {...formItemLayout}>
                        {getFieldDecorator('productGroupCode', {
                            initialValue:lodash.get(Store.searchParams,"productGroupCode"),
                        })(Models.productGroupCode)}
                    </Form.Item>
                    <Form.Item label="产品组名称" {...formItemLayout}>
                        {getFieldDecorator('productGroupName', {
                            initialValue:lodash.get(Store.searchParams,"productGroupName"),
                        })(Models.productGroupName)}
                    </Form.Item>
                    <Form.Item label="事业部" {...formItemLayout}>
                        {getFieldDecorator('buCode', {
                            initialValue:lodash.get(Store.searchParams,"buCode"),
                        })(Models.buCode)}
                    </Form.Item>
                    <Form.Item label="DOA返回仓库" {...formItemLayout}>
                        {getFieldDecorator('doaWhCode', {
                            initialValue:lodash.get(Store.searchParams,"doaWhCode"),
                        })(Models.doaWhCode)}
                    </Form.Item>
                    <Form.Item label="法人编号" {...formItemLayout}>
                        {getFieldDecorator('corpCode', {
                            initialValue:lodash.get(Store.searchParams,"corpCode"),
                        })(Models.corpCode)}
                    </Form.Item>
                    <Form.Item label="产品组大类" {...formItemLayout}>
                        {getFieldDecorator('productGroupType', {
                            initialValue:lodash.get(Store.searchParams,"productGroupType"),
                        })(Models.productGroupType)}
                    </Form.Item>
        </DataViewSearch>
    }
}
