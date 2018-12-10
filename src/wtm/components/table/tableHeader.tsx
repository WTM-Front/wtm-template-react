/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:30
 * @modify date 2018-09-12 18:53:30
 * @desc [description]
*/
import { Button, Checkbox, Col, Divider, Drawer, Form, Icon, List, Row } from 'antd';
import lodash from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import Store from '../../core/StoreBasice';
import { mapValues, Props, renderItemParams } from './tableDetails';
import DecoForm from 'components/decorators/form';
interface ITableHeader {
  /** 状态 */
  Store: Store,
  /** 属性item */
  renderItem?: (params: renderItemParams) => JSX.Element | JSX.Element[];
}
/**
 * 搜索标题组件 
 * 
 * 不要直接修改 wtm 组件 使用继承重写的方式修改
 */
export default class TableHeaderComponent extends React.Component<ITableHeader, any> {
  Store = this.props.Store;
  // WrappedFormComponent = Form.create()(FormComponent);
  /**
   * 表单 item
   * @param param0 
   */
  renderItem(params: renderItemParams): JSX.Element | JSX.Element[] {
    if (this.props.renderItem) {
      return this.props.renderItem(params)
    }
  }
  render() {
    return (
      // <Spin spinning={this.Store.pageConfig.loading}>
      <Row>
        <FormComponent {...this.props} renderItem={this.renderItem.bind(this)} />
        {this.props.children}
      </Row>
      // </Spin>
    );
  }
}

@DecoForm()
@observer
class FormComponent extends React.Component<any, any> {
  Store: Store = this.props.Store;
  state = {
    // toggle: false,
    key: new Date().getTime()
  }
  onToggle() {
    // this.setState({ toggle: !this.state.toggle });
    this.Store.onPageState("searchToggle", !this.Store.pageState.searchToggle)
  }
  /**
   * 获取 数据类型默认值
   * @param key 属性名称
   * @param type 属性值类型
   */
  initialValue(key, type) {
    const value = this.Store.searchParams[key];
    // console.log(key, value, this.Store.searchParams);
    switch (type) {
      // case 'int32':
      //   return value == null ? 0 : value;
      //   break;
      case 'date-time':
        return this.moment(value);
        break;
      default://默认字符串
        return value
        break;
    }
  }

  /**
   * 时间转化
   * @param date 
   */
  moment(date) {
    if (date == '' || date == null || date == undefined) {
      return date;
    }
    if (typeof date == 'string') {
      date = moment(date, this.Store.Format.date)
    } else {
      date = moment(date)
    }
    return date
  }
  renderItem() {
    let items = null
    const FormItems = this.props.renderItem({ form: this.props.form, initialValue: this.initialValue.bind(this) })
    if (Array.isArray(FormItems)) {
      if (this.Store.pageState.searchToggle) {
        items = FormItems;
      } else {
        items = [...FormItems].splice(0, 3);
      }
    } else {
      items = FormItems
    }
    return {
      length: FormItems.length,
      items
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 转换时间对象  moment 对象 valueOf 为时间戳，其他类型数据 为原始数据。
        values = mapValues(values, this.Store.Format.date)
        console.log("搜索参数",values);
        this.Store.onSearch(values)
      }
    });
  }
  onReset() {
    const { resetFields } = this.props.form;
    resetFields();
    this.setState({ key: new Date().getTime() })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.Store.onSearch(lodash.mapValues(values, x => undefined))
      }
    });
  }
  render() {
    const renderItem = this.renderItem();
    const downUp = this.Store.pageState.searchToggle ? <> 收起 <Icon type='up' /></> : <>   展开 <Icon type='down' /></>
    const btns = <>
      <Button icon="search" htmlType="submit" loading={this.Store.pageState.loading}>查询</Button>
      <Divider type="vertical" />
      <Button icon="retweet" onClick={this.onReset.bind(this)} loading={this.Store.pageState.loading}>重置</Button>
      {renderItem.length > 3 ? <>
        <Divider type="vertical" /> <a onClick={this.onToggle.bind(this)}>
          {downUp}
        </a>
      </> : null}
    </>
    // 偏移值
    let offset = 0;
    switch (renderItem.length) {
      case 0:
        offset = 18;
        break;
      case 1:
        offset = 12;
        break;
      case 2:
        offset = 6;
        break;
    }
    return (
      <Form className="app-table-header-form" onSubmit={this.handleSubmit}>
        <Row type="flex" gutter={16} className="table-header-search" key={this.state.key}>
          {renderItem.items}
          {this.Store.pageState.searchToggle ? null : <Col span={6} offset={offset} className="table-header-btn">
            {btns}
          </Col>}
        </Row>
        {this.Store.pageState.searchToggle ? <Row type="flex" gutter={16} justify="end">
          <Col span={24} className="table-header-btn">
            {btns}
          </Col>
        </Row> : null}

      </Form>
    );
  }
}
/**
 * 列配置
 */
@observer
class ColumnsComponent extends React.Component<{ Store: Store }, any> {
  Store = this.props.Store;
  state = {
    visible: false
  }
  checkedValues = [];
  onVisible() {
    this.setState(state => {
      return { visible: !state.visible }
    });
  }
  onChange(checkedValues) {
    this.checkedValues = checkedValues
  }
  onSubmit() {
    if (this.checkedValues.length) {
      this.Store.SwaggerModel.columns = this.checkedValues;
      dispatchEvent(new CustomEvent('resize'));
    }
    this.onVisible();
  }
  render() {
    return (
      <>
        <Divider type="vertical" />
        <Button icon="edit" loading={this.Store.pageState.loading} onClick={this.onVisible.bind(this)}>隐藏列</Button>
        <Drawer
          title="隐藏列"
          width={320}
          onClose={this.onVisible.bind(this)}
          closable={false}
          visible={this.state.visible}
          destroyOnClose={true}
          className="app-hide-install-drawer"
        >
          <Checkbox.Group defaultValue={this.Store.SwaggerModel.columns.map(x => x.dataIndex)} onChange={this.onChange.bind(this)}>
            <List
              bordered
              dataSource={this.Store.SwaggerModel.allColumns}
              renderItem={item => (<List.Item>
                <Checkbox value={item.dataIndex} >{item.title}</Checkbox>
              </List.Item>)}
            />
          </Checkbox.Group>
          <div className="app-drawer-btns" >
            <Button onClick={this.onVisible.bind(this)} >取消 </Button>
            <Divider type="vertical" />
            <Button type="primary" onClick={this.onSubmit.bind(this)} >提交 </Button>
          </div>
        </Drawer>
      </>
    );
  }
}

/**
 * 编辑 装饰器
 * @param Store 状态
 */
export function DecoratorsTableHeader(params: ITableHeader) {
  return function <T extends { new(...args: any[]): {} }>(Component: any) {
    return class extends React.Component<any, any> {
      render() {
        return <TableHeaderComponent Store={params.Store} renderItem={params.renderItem}>
          <Component />
        </TableHeaderComponent>
      }
    }
  }
}