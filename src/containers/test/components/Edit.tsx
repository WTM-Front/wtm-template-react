import { Form, Button, Popconfirm, Divider } from 'antd';
import DataEntry from 'components/table/dataEntry';
import TableEdit from 'components/table/tableEdit';
import * as React from 'react';
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
 * 组件继承 支持重写,
 */
export default class EditComponent extends TableEdit {
    renderItem({ form, initialValue }) {
        const { getFieldDecorator } = form;
        return <>
            <FormItem label="id" {...formItemLayout}>
            {getFieldDecorator('id',{
                rules: [{"required":true,"message":"Please input your undefined!"}],
                initialValue: initialValue('id','int64'),
            })(
               <DataEntry {...this.props}  format="int64"  placeholder='id'  />
            )}
        </FormItem> 
         <FormItem label="名称" {...formItemLayout}>
            {getFieldDecorator('name',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('name',''),
            })(
               <DataEntry {...this.props}  placeholder='名称'  />
            )}
        </FormItem> 
         <FormItem label="地址" {...formItemLayout}>
            {getFieldDecorator('address',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":500,"message":"max length 500!"}],
                initialValue: initialValue('address',''),
            })(
               <DataEntry {...this.props}  placeholder='地址'  />
            )}
        </FormItem> 
         <FormItem label="创建日期" {...formItemLayout}>
            {getFieldDecorator('createdate',{
                rules: [{"required":true,"message":"Please input your undefined!"}],
                initialValue: initialValue('createdate','date-time'),
            })(
               <DataEntry {...this.props}  format="date-time"  placeholder='创建日期'  />
            )}
        </FormItem> 
         <FormItem label="创建人" {...formItemLayout}>
            {getFieldDecorator('createby',{
                rules: [{"required":true,"message":"Please input your undefined!"},{"min":0,"message":"min length 0!"},{"max":50,"message":"max length 50!"}],
                initialValue: initialValue('createby',''),
            })(
               <DataEntry {...this.props}  placeholder='创建人'  />
            )}
        </FormItem> 
        </>
    }
      // 重写示例
    // renderButtons() {
    //     return <Button icon="folder-add" onClick={this.Store.onModalShow.bind(this.Store, {})}>添加</Button>
    // }
}