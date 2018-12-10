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
            
        <Col span={12} >
            <FormItem label="主键ID" {...formItemLayout}>
                {getFieldDecorator('id',{
                    rules: [{"required":true,"message":"主键ID 不能为空!"}],
                    initialValue: initialValue('id',''),
                })(
                    DataEntry.id
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库编号" {...formItemLayout}>
                {getFieldDecorator('whCode',{
                    rules: [{"required":true,"message":"仓库编号 不能为空!"},{"min":0,"message":"仓库编号 最小长度 0位!"},{"max":50,"message":"仓库编号 最大长度 50位!"}],
                    initialValue: initialValue('whCode',''),
                })(
                    DataEntry.whCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库名称" {...formItemLayout}>
                {getFieldDecorator('whName',{
                    rules: [{"required":true,"message":"仓库名称 不能为空!"},{"min":0,"message":"仓库名称 最小长度 0位!"},{"max":500,"message":"仓库名称 最大长度 500位!"}],
                    initialValue: initialValue('whName',''),
                })(
                    DataEntry.whName
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="是否实仓" {...formItemLayout}>
                {getFieldDecorator('isReal',{
                    rules: [{"required":true,"message":"是否实仓 不能为空!"}],
                    initialValue: initialValue('isReal','int32'),
                })(
                    DataEntry.isReal
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('addr',{
                    rules: [{"required":true,"message":"地址 不能为空!"},{"min":0,"message":"地址 最小长度 0位!"},{"max":500,"message":"地址 最大长度 500位!"}],
                    initialValue: initialValue('addr',''),
                })(
                    DataEntry.addr
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('manager',{
                    rules: [{"required":true,"message":"负责人 不能为空!"},{"min":0,"message":"负责人 最小长度 0位!"},{"max":50,"message":"负责人 最大长度 50位!"}],
                    initialValue: initialValue('manager',''),
                })(
                    DataEntry.manager
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人电话" {...formItemLayout}>
                {getFieldDecorator('managerTel',{
                    rules: [{"required":true,"message":"负责人电话 不能为空!"},{"min":0,"message":"负责人电话 最小长度 0位!"},{"max":50,"message":"负责人电话 最大长度 50位!"}],
                    initialValue: initialValue('managerTel',''),
                })(
                    DataEntry.managerTel
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人E-mail" {...formItemLayout}>
                {getFieldDecorator('managerEmail',{
                    rules: [{"required":true,"message":"负责人E-mail 不能为空!"},{"min":0,"message":"负责人E-mail 最小长度 0位!"},{"max":100,"message":"负责人E-mail 最大长度 100位!"}],
                    initialValue: initialValue('managerEmail',''),
                })(
                    DataEntry.managerEmail
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="省份编号" {...formItemLayout}>
                {getFieldDecorator('provinceCode',{
                    rules: [{"required":true,"message":"省份编号 不能为空!"},{"min":0,"message":"省份编号 最小长度 0位!"},{"max":50,"message":"省份编号 最大长度 50位!"}],
                    initialValue: initialValue('provinceCode',''),
                })(
                    DataEntry.provinceCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="城市编号" {...formItemLayout}>
                {getFieldDecorator('cityCode',{
                    rules: [{"required":true,"message":"城市编号 不能为空!"},{"min":0,"message":"城市编号 最小长度 0位!"},{"max":50,"message":"城市编号 最大长度 50位!"}],
                    initialValue: initialValue('cityCode',''),
                })(
                    DataEntry.cityCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="区县编号" {...formItemLayout}>
                {getFieldDecorator('areaCode',{
                    rules: [{"required":true,"message":"区县编号 不能为空!"},{"min":0,"message":"区县编号 最小长度 0位!"},{"max":50,"message":"区县编号 最大长度 50位!"}],
                    initialValue: initialValue('areaCode',''),
                })(
                    DataEntry.areaCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="面积" {...formItemLayout}>
                {getFieldDecorator('acreage',{
                    rules: [{"min":0,"message":"面积 最小长度 0位!"},{"max":100,"message":"面积 最大长度 100位!"}],
                    initialValue: initialValue('acreage',''),
                })(
                    DataEntry.acreage
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="容积" {...formItemLayout}>
                {getFieldDecorator('cubage',{
                    rules: [{"min":0,"message":"容积 最小长度 0位!"},{"max":100,"message":"容积 最大长度 100位!"}],
                    initialValue: initialValue('cubage',''),
                })(
                    DataEntry.cubage
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库级别" {...formItemLayout}>
                {getFieldDecorator('whLevel',{
                    rules: [{"required":true,"message":"仓库级别 不能为空!"},{"min":0,"message":"仓库级别 最小长度 0位!"},{"max":50,"message":"仓库级别 最大长度 50位!"}],
                    initialValue: initialValue('whLevel',''),
                })(
                    DataEntry.whLevel
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="经度" {...formItemLayout}>
                {getFieldDecorator('longitude',{
                    rules: [{"required":true,"message":"经度 不能为空!"},{"min":0,"message":"经度 最小长度 0位!"},{"max":100,"message":"经度 最大长度 100位!"}],
                    initialValue: initialValue('longitude',''),
                })(
                    DataEntry.longitude
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="纬度" {...formItemLayout}>
                {getFieldDecorator('latitude',{
                    rules: [{"required":true,"message":"纬度 不能为空!"},{"min":0,"message":"纬度 最小长度 0位!"},{"max":100,"message":"纬度 最大长度 100位!"}],
                    initialValue: initialValue('latitude',''),
                })(
                    DataEntry.latitude
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库服务商编号" {...formItemLayout}>
                {getFieldDecorator('providerCode',{
                    rules: [{"min":0,"message":"仓库服务商编号 最小长度 0位!"},{"max":100,"message":"仓库服务商编号 最大长度 100位!"}],
                    initialValue: initialValue('providerCode',''),
                })(
                    DataEntry.providerCode
                )}
            </FormItem> 
        </Col>
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
            
        <Col span={12} >
            <FormItem label="主键ID" {...formItemLayout}>
                {getFieldDecorator('id',{
                    rules: [{"required":true,"message":"主键ID 不能为空!"}],
                    initialValue: initialValue('id',''),
                })(
                    DataEntry.id
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库编号" {...formItemLayout}>
                {getFieldDecorator('whCode',{
                    rules: [{"required":true,"message":"仓库编号 不能为空!"},{"min":0,"message":"仓库编号 最小长度 0位!"},{"max":50,"message":"仓库编号 最大长度 50位!"}],
                    initialValue: initialValue('whCode',''),
                })(
                    DataEntry.whCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库名称" {...formItemLayout}>
                {getFieldDecorator('whName',{
                    rules: [{"required":true,"message":"仓库名称 不能为空!"},{"min":0,"message":"仓库名称 最小长度 0位!"},{"max":500,"message":"仓库名称 最大长度 500位!"}],
                    initialValue: initialValue('whName',''),
                })(
                    DataEntry.whName
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="是否实仓" {...formItemLayout}>
                {getFieldDecorator('isReal',{
                    rules: [{"required":true,"message":"是否实仓 不能为空!"}],
                    initialValue: initialValue('isReal','int32'),
                })(
                    DataEntry.isReal
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="地址" {...formItemLayout}>
                {getFieldDecorator('addr',{
                    rules: [{"required":true,"message":"地址 不能为空!"},{"min":0,"message":"地址 最小长度 0位!"},{"max":500,"message":"地址 最大长度 500位!"}],
                    initialValue: initialValue('addr',''),
                })(
                    DataEntry.addr
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人" {...formItemLayout}>
                {getFieldDecorator('manager',{
                    rules: [{"required":true,"message":"负责人 不能为空!"},{"min":0,"message":"负责人 最小长度 0位!"},{"max":50,"message":"负责人 最大长度 50位!"}],
                    initialValue: initialValue('manager',''),
                })(
                    DataEntry.manager
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人电话" {...formItemLayout}>
                {getFieldDecorator('managerTel',{
                    rules: [{"required":true,"message":"负责人电话 不能为空!"},{"min":0,"message":"负责人电话 最小长度 0位!"},{"max":50,"message":"负责人电话 最大长度 50位!"}],
                    initialValue: initialValue('managerTel',''),
                })(
                    DataEntry.managerTel
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人E-mail" {...formItemLayout}>
                {getFieldDecorator('managerEmail',{
                    rules: [{"required":true,"message":"负责人E-mail 不能为空!"},{"min":0,"message":"负责人E-mail 最小长度 0位!"},{"max":100,"message":"负责人E-mail 最大长度 100位!"}],
                    initialValue: initialValue('managerEmail',''),
                })(
                    DataEntry.managerEmail
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="省份编号" {...formItemLayout}>
                {getFieldDecorator('provinceCode',{
                    rules: [{"required":true,"message":"省份编号 不能为空!"},{"min":0,"message":"省份编号 最小长度 0位!"},{"max":50,"message":"省份编号 最大长度 50位!"}],
                    initialValue: initialValue('provinceCode',''),
                })(
                    DataEntry.provinceCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="城市编号" {...formItemLayout}>
                {getFieldDecorator('cityCode',{
                    rules: [{"required":true,"message":"城市编号 不能为空!"},{"min":0,"message":"城市编号 最小长度 0位!"},{"max":50,"message":"城市编号 最大长度 50位!"}],
                    initialValue: initialValue('cityCode',''),
                })(
                    DataEntry.cityCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="区县编号" {...formItemLayout}>
                {getFieldDecorator('areaCode',{
                    rules: [{"required":true,"message":"区县编号 不能为空!"},{"min":0,"message":"区县编号 最小长度 0位!"},{"max":50,"message":"区县编号 最大长度 50位!"}],
                    initialValue: initialValue('areaCode',''),
                })(
                    DataEntry.areaCode
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="面积" {...formItemLayout}>
                {getFieldDecorator('acreage',{
                    rules: [{"min":0,"message":"面积 最小长度 0位!"},{"max":100,"message":"面积 最大长度 100位!"}],
                    initialValue: initialValue('acreage',''),
                })(
                    DataEntry.acreage
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="容积" {...formItemLayout}>
                {getFieldDecorator('cubage',{
                    rules: [{"min":0,"message":"容积 最小长度 0位!"},{"max":100,"message":"容积 最大长度 100位!"}],
                    initialValue: initialValue('cubage',''),
                })(
                    DataEntry.cubage
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库级别" {...formItemLayout}>
                {getFieldDecorator('whLevel',{
                    rules: [{"required":true,"message":"仓库级别 不能为空!"},{"min":0,"message":"仓库级别 最小长度 0位!"},{"max":50,"message":"仓库级别 最大长度 50位!"}],
                    initialValue: initialValue('whLevel',''),
                })(
                    DataEntry.whLevel
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="经度" {...formItemLayout}>
                {getFieldDecorator('longitude',{
                    rules: [{"required":true,"message":"经度 不能为空!"},{"min":0,"message":"经度 最小长度 0位!"},{"max":100,"message":"经度 最大长度 100位!"}],
                    initialValue: initialValue('longitude',''),
                })(
                    DataEntry.longitude
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="纬度" {...formItemLayout}>
                {getFieldDecorator('latitude',{
                    rules: [{"required":true,"message":"纬度 不能为空!"},{"min":0,"message":"纬度 最小长度 0位!"},{"max":100,"message":"纬度 最大长度 100位!"}],
                    initialValue: initialValue('latitude',''),
                })(
                    DataEntry.latitude
                )}
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库服务商编号" {...formItemLayout}>
                {getFieldDecorator('providerCode',{
                    rules: [{"min":0,"message":"仓库服务商编号 最小长度 0位!"},{"max":100,"message":"仓库服务商编号 最大长度 100位!"}],
                    initialValue: initialValue('providerCode',''),
                })(
                    DataEntry.providerCode
                )}
            </FormItem> 
        </Col>
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
            
        <Col span={12} >
            <FormItem label="主键ID" {...formItemLayout}>
               <span>{initialValue('id','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库编号" {...formItemLayout}>
               <span>{initialValue('whCode','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库名称" {...formItemLayout}>
               <span>{initialValue('whName','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="地址" {...formItemLayout}>
               <span>{initialValue('addr','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人" {...formItemLayout}>
               <span>{initialValue('manager','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人电话" {...formItemLayout}>
               <span>{initialValue('managerTel','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="负责人E-mail" {...formItemLayout}>
               <span>{initialValue('managerEmail','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库级别" {...formItemLayout}>
               <span>{initialValue('whLevel','',true)}</span>
            </FormItem> 
        </Col>
        <Col span={12} >
            <FormItem label="仓库服务商编号" {...formItemLayout}>
               <span>{initialValue('providerCode','',true)}</span>
            </FormItem> 
        </Col>
        </>
    }
}