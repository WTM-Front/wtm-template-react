/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:27
 * @modify date 2018-09-12 18:52:27
 * @desc [description] .
 */
import * as React from 'react';
import { message, notification, List, Row, Col, Button } from 'antd';
import { action, computed, observable, runInAction } from 'mobx';
import { Request } from 'utils/Request';
import lodash from 'lodash';
export default class Store {
  constructor() {

  }
  /** 数据 ID 索引 */
  protected IdKey = 'id'
  /** 页面操按钮 */
  Actions: WTM.IActions = {
    insert: true,
    update: true,
    delete: true,
    import: true,
    export: true,
  }
  /** url 地址 */
  Urls: WTM.IUrls = {
    search: {
      src: "/test/search",
      method: "post"
    },
    details: {
      src: "/test/details/{id}",
      method: "get"
    },
    insert: {
      src: "/test/insert",
      method: "post"
    },
    update: {
      src: "/test/update",
      method: "post"
    },
    delete: {
      src: "/test/delete",
      method: "post"
    },
    import: {
      src: "/test/import",
      method: "post"
    },
    export: {
      src: "/test/export",
      method: "post"
    },
    exportIds: {
      src: "/test/export",
      method: "post"
    },
    template: {
      src: "/test/template",
      method: "post"
    },
    fileUpload: {
      src: "/file/upload",
      method: "post"
    },
    fileDelete: {
      src: "/file/deleteFile/{id}",
      method: "get"
    },
    fileGet: {
      src: "/file/getFile",
      method: "get"
    },
    fileDownload: {
      src: "/file/downloadFile",
      method: "get"
    }
  };
  /** 默认排序 */
  DefaultSort = ""
  /** 格式化数据参数 */
  Format = {
    date: "YYYY-MM-DD",
    dateTime: "YYYY-MM-DD HH:mm:ss",
  }
  /** Ajax   */
  Request = new Request("/masterdata");
  /** 搜索数据参数 */
  searchParams: any = {

  }
  /** 数据列表 */
  @observable dataSource = {
    count: 0,
    list: [],
    pageNo: 1,
    pageSize: 10
  }
  /** 多选行 key */
  @observable selectedRowKeys = [];
  /**  详情 */
  @observable details: any = {};
  /** 页面动作 */
  @observable pageState = {
    visibleEdit: false,//编辑窗口
    visiblePort: false,//导入窗口
    loading: false,//数据加载
    loadingEdit: false,//数据提交
    detailsType: 'Insert'//详情类型 Insert/添加 Update/修改 Info/详情信息
  }
  /**
   *  修改页面动作状态
   * @param key 
   * @param value 
   */
  @action.bound
  onPageState(key: "visibleEdit" | "visiblePort" | "loading" | "loadingEdit" | "detailsType", value?: boolean | string) {
    const prevVal = this.pageState[key];
    if (prevVal == value) {
      return
    }
    if (typeof value == "undefined") {
      value = !prevVal;
    }
    this.pageState[key] = value;
  }
  /**
   * 多选 行 
   * @param selectedRowKeys 选中的keys
   */
  @action.bound
  onSelectChange(selectedRowKeys) {
    this.selectedRowKeys = selectedRowKeys
  }
  /**
   * 详情 窗口
   * @param details 
   * @param detailsType 
   */
  async onModalShow(details = {}, detailsType: 'Insert' | 'Update' | 'Info' = 'Insert') {
    this.onPageState("detailsType", detailsType)
    if (detailsType != "Insert") {
      details = await this.onDetails(details)
    }
    runInAction(() => {
      this.details = details
    })
    console.log(details);
    this.onPageState("visibleEdit", true)
  }

  /**
   * 加载数据 列表
   * @param search 搜索条件 
   * @param SortInfo 排序字段
   * @param Page 页码
   * @param Limit 数据条数
   */
  async onSearch(search: any = {}, sort: string = this.DefaultSort, pageNo: number = 1, pageSize: number = 10) {
    if (this.pageState.loading == true) {
      return message.warn('数据正在加载中')
    }
    this.onPageState("loading", true);
    this.searchParams = { ...this.searchParams, ...search };
    search = {
      pageNo,
      pageSize,
      sort,
      searcher: this.searchParams
    }
    const method = this.Urls.search.method;
    const src = this.Urls.search.src;
    try {
      const res = await this.Request[method](src, search).map(data => {
        if (data.list) {
          data.list = data.list.map((x, i) => {
            // antd table 列表属性需要一个唯一key
            return { key: i, ...x }
          })
        } else {
          notification.warn({
            message: '返回数据并为标准table数据类型'
          })
          // message.warn('返回数据并为标准table数据类型')
        }
        return data
      }).toPromise()
      runInAction(() => {
        this.dataSource = res || this.dataSource
      })
      return res
    } catch (error) {
      // console.log(error);
      this.onErrorMessage(error)
    } finally {
      this.onPageState("loading", false)
    }
  }
  /**
   * 详情
   * @param params 数据实体
   */
  async onDetails(params) {
    this.onPageState("loadingEdit", true)
    const method = this.Urls.details.method;
    const src = this.Urls.details.src;
    const res = await this.Request[method](src, params).toPromise()
    this.onPageState("loadingEdit", false)
    return res || {}
  }
  /**
   * 编辑数据
   * @param params 数据实体
   */
  async onEdit(params) {
    const Update = this.pageState.detailsType == "Update"
    try {
      if (this.pageState.loadingEdit) {
        return
      }
      const details = { ...this.details, ...params }
      this.onPageState("loadingEdit", true);
      let res = null;
      // 添加 | 修改
      if (Update) {
        res = await this.onUpdate(details)
      } else {
        res = await this.onInsert(details)
      }
      this.onSearch();
      this.onPageState("visibleEdit", false)
      return res
    } catch (error) {
      this.onErrorMessage(error)
    }
    finally {
      this.onPageState("loadingEdit", false)
    }
  }
  /**
   * 添加数据
   * @param params 数据实体
   */
  async onInsert(params) {
    const method = this.Urls.insert.method;
    const src = this.Urls.insert.src;
    const res = await this.Request[method](src, params).toPromise()
    notification.success({ message: "添加成功" })
    return res
  }
  /**
   * 更新数据
   * @param params 数据实体
   */
  async onUpdate(params) {
    const method = this.Urls.update.method;
    const src = this.Urls.update.src;
    const res = await this.Request[method](src, params).toPromise();
    return res
    notification.success({ message: "修改成功" })
  }
  /**
   * 删除
   * @param params 
   */
  async onDelete(params) {
    try {
      console.log(params);
      if (!params) {
        return notification.warn({
          message: '没有选择任何数据'
        })
      }
      if (!Array.isArray(params)) {
        params = [params];
      }
      params = params.map(x => x[this.IdKey])
      const method = this.Urls.delete.method;
      const src = this.Urls.delete.src;
      const res = await this.Request[method](src, params).toPromise()
      this.onSelectChange([]);
      // 刷新数据
      this.onSearch();
      notification.success({ message: "删除成功" })
      return res
    } catch (error) {
      notification.error({ message: "删除失败" })
    }
  }
  /**
   * 导入 配置 参数
   * https://ant.design/components/upload-cn/#components-upload-demo-picture-style
   */
  @computed
  get importConfig() {
    const action = this.Request.compatibleUrl(this.Request.address, this.Urls.import.src)
    return {
      name: 'file',
      multiple: true,
      accept: ".xlsx,.xls",
      action: action,
      // 重写默认请求
      customRequest: (option) => {
        return this.Request.customRequest(option, "blob")
      },
      onChange: info => {
        const status = info.file.status
        // NProgress.start();
        if (status !== 'uploading' && process.env.NODE_ENV == "development") {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          const blob = info.file.response
          // NProgress.done();
          if (blob.type == "application/json") {
            const reader = new FileReader();
            reader.addEventListener("load", (evt: any) => {
              try {
                const result = JSON.parse(evt.target.result)
                if (result.status == 200) {
                  // 刷新数据
                  this.onSearch();
                  notification.success({
                    message: `${info.file.name} 导入成功`
                  })
                } else {
                  throw result.message
                }
              } catch (error) {
                notification.error({
                  message: `${info.file.name} 导入失败`,
                  description: String(error)
                })
              }
            });
            reader.readAsText(blob);
          } else {
            const filedow = this.Request.onCreateBlob(blob);
            notification.error({
              duration: 10,
              key: "import",
              message: `${info.file.name} 导入失败`,
              btn: <Button type="primary" size="small" onClick={() => {
                notification.close("import");
                filedow.click();
              }}>
                下载文件
            </Button>
            })
          }
        } else if (status === 'error') {
          // message.error(`${info.file.name} file upload failed.`)
          notification.error({
            message: `${info.file.name} 导入失败`
          })
        }
      }
    }
  }
  /**
   * 删除文件
   * @param id 
   */
  async onFileDelete(id) {
    const method = this.Urls.fileDelete.method;
    const src = this.Urls.fileDelete.src;
    const res = await this.Request[method](src, { id }).toPromise();
    if (res) {
    }
    return res
  }
  /**
   * 获取文件
   * @param id 
   */
  onGetFile(id) {
    if (id) {
      const src = this.Urls.fileGet.src;
      return `${this.Request.address}${src}/${id}`
    }
  }
  /**
   * 获取文件
   * @param id 
   */
  onFileDownload(id) {
    if (id) {
      const src = this.Urls.fileDownload.src;
      return `${this.Request.address}${src}/${id}`
    }
  }
  /**
   * 导入
   * @param UpdateFileId 
   */
  async onImport(UpdateFileId) {
    const method = this.Urls.import.method;
    const src = this.Urls.import.src;
    try {
      const res = await this.Request[method](src, { UpdateFileId }, { "Content-Type": "application/x-www-form-urlencoded" }).toPromise();
      message.success('导入成功')
      // 刷新数据
      this.onSearch()
      this.onPageState("visiblePort", false)
      return res
    } catch (error) {
      this.onErrorMessage(error)
    }
  }
  /**
   * 导出
   * @param params 筛选参数
   */
  async onExport(params = this.searchParams) {
    await this.Request.download({
      url: this.Urls.export.src,
      method: this.Urls.export.method,
      body: params
    })
  }
  /**
   * 导出
   * @param params 筛选参数
   */
  async onExportIds() {
    if (this.selectedRowKeys.length > 0) {
      await this.Request.download({
        url: this.Urls.exportIds.src,
        method: this.Urls.exportIds.method,
        body: [...this.selectedRowKeys]
      })
    }
  }
  /**
  * 数据模板
  */
  async onTemplate() {
    await this.Request.download({
      url: this.Urls.template.src,
      method: this.Urls.template.method
    })
  }
  /**
   * 错误提示
   * @param message 
   * @param dataSource 
   */
  onErrorMessage(message, dataSource?: { key: string, value: string }[]) {
    notification.error({
      duration: 5,
      message: message,
      description: dataSource && <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col span={10}>{item.key}</Col>
              <Col span={14}>{item.value}</Col>
            </Row>
          </List.Item>
        )}
      />
    })
  }
}
