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
           {{{HeaderFormItem search}}}
        </DataViewSearch>
    }
}
