import { Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { FormItem } from 'components/dataView';
import Selects from 'components/form/select';
import Transfer from 'components/form/transfer';
import UploadImg from 'components/form/uploadImg';
import lodash from 'lodash';
import * as React from 'react';
import Regular from 'utils/Regular'; //正则
import Store from '../store';

/**
 * label  标识
 * rules   校验规则，参考下方文档  https://ant.design/components/form-cn/#components-form-demo-validate-other
 * formItem  表单组件
 */
export default {
    /**
     * 编辑 模型 
     * @param props 
     */
    editModels(props?) {
        const { form } = props;
        const { getFieldDecorator }: WrappedFormUtils = form;

        return {
            /** ITCode */
            ITCode: {
                label: "账号",
                rules: [{ "required": true, "message": "账号 不能为空" }],
                /**
                 * 使用 getFieldDecorator 组件 替换默认的 封装组件 
                 * 需要注意的是 details 中的 Models.editModels(this.props) 需要放到 render 方法中
                 */
                formItem: getFieldDecorator("ITCode", {

                })(<Input placeholder="请输入 ITCode" />)
            },
            /** Password */
            Password: {
                label: "密码",
                rules: [{ "required": true, "message": "密码 不能为空" }],
                formItem: <Input placeholder="请输入 Password" />
            },
            /** Email */
            Email: {
                label: "邮箱",
                rules: [{ pattern: Regular.email, message: "请输入正确的 邮箱" }],
                formItem: <Input placeholder="请输入 Email" />
            },
            /** Name */
            Name: {
                label: "名称",
                rules: [],
                formItem: <Input placeholder="请输入 Name" />
            },
            /** 照片 */
            PhotoId: {
                label: "照片",
                rules: [],
                formItem: <UploadImg />
            },
            /** 性别 */
            Sex: {
                label: "性别",
                rules: [],
                formItem: <Selects
                    placeholder="性别"
                    //请求 数据 Observable 对象，
                    dataSource={Store.Request.cache({ url: "/frameworkuser/GetSex" })}
                />
            },
            /** 用户组 */
            UserGroups: {
                label: "用户组",
                rules: [],
                formItem: <Selects
                    placeholder="用户组"
                    multiple // 多选标记
                    //请求 数据 Observable 对象，
                    dataSource={Store.Request.cache({ url: "/frameworkuser/GetUserGroups" })}
                    dataKey="GroupId"
                />
            },
            /** 角色 */
            UserRoles: {
                label: "角色",
                rules: [],
                formItem: <Transfer
                    //请求 数据 Observable 对象，
                    dataSource={Store.Request.cache({ url: "/frameworkuser/GetUserRoles" })}
                    dataKey="RoleId"
                />
            }
        }
    },
    /**
     * 搜索 模型 
     * @param props 
     */
    searchModels(props?) {
        return {
            /** ITCode */
            ITCode: {
                label: "账号",
                rules: [],
                formItem: <Input placeholder="请输入 ITCode" />
            },
            /** Name */
            Name: {
                label: "名称",
                rules: [],
                formItem: <Input placeholder="请输入 Name" />
            },
            /** 用户组 */
            UserGroups: {
                label: "用户组",
                rules: [],
                formItem: <Selects
                    placeholder="用户组"
                    //请求 数据 Observable 对象，
                    dataSource={Store.Request.cache({ url: "/frameworkuser/GetUserGroups" })}
                    dataKey="GroupId"
                />
            }
        }
    },
    /**
     * 渲染 模型
     */
    renderModels(props?) {
        return lodash.map(props.models, (value, key) => {
            return <FormItem {...props} fieId={key} key={key} />
        })
    }
}