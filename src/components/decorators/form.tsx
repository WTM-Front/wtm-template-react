import * as React from 'react';
import { Form } from 'antd';
import { FormCreateOption } from 'antd/lib/form';
export default function (params?: FormCreateOption<any>) {
    return function (Component: any) {
        return Form.create({ ...params })(Component) as any
    }
}