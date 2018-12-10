/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:37
 * @modify date 2018-09-12 18:52:37
 * @desc [description]
*/
import Rx from "rxjs";
import { message, notification } from "antd";
import NProgress from 'nprogress';
import lodash from 'lodash';
import moment from 'moment';
interface Preview {
    data: any
    message: string
    status: number
}
export class HttpBasics {
    /**
     * 
     * @param address 替换默认地址前缀
     * @param newResponseMap 替换默认过滤函数
     */
    constructor(address?, public newResponseMap?) {
        if (typeof address == "string") {
            // if (/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(address)) {
            //     this.address = address;
            // } else {
            //     this.address += address;
            // }
            this.address = address;
        }
        this.getHeaders()
        // this.create({ type: "get", name: "test/{c}/{a}/{b}" }, { a: 1, b: 2, c: 3 }).toPromise();
    }
    /** 
     * 请求路径前缀
     */
    address = process.env.NODE_ENV === "development" ? '/' : '/masterdata/'
    /**
     * 请求头
     */
    headers = {
        credentials: 'include',
        accept: "*/*",
        "Content-Type": "application/json",
        "token": null
    };
    getHeaders() {
        this.headers.token = window.localStorage.getItem('__token') || null;
        return this.headers
    }
    /**
     * 请求超时设置
     */
    timeout = 10000;
    /**
     * ajax
     */
    ajax = Rx.Observable.ajax;
    /**
     * 创建请求
     * @param request 
     * @param body 
     * @param headers 
     */
    create(request: { type: string, name: string }, body?: { [key: string]: any } | string, headers?: Object): Rx.Observable<any> {
        request = { ...request };
        // 处理 路由参数  示例 "test/{c}/{a}/{b}"  从 body 提取参数
        if (/\/{\S*}/.test(request.name)) {
            if (typeof body == "object") {
                const urlStr = lodash.compact(request.name.match(/\/{\w[^\/{]*}/g).map(x => {
                    return body[x.match(/{(\w*)}/)[1]];
                })).join("/");

                request.name = request.name.replace(/\/{\S*}/, "/") + urlStr;
                if (request.type.toLocaleLowerCase() == "get") {
                    body = {};
                }
            }
        }
        return this[request.type.toLocaleLowerCase()](request.name, body, headers)
    }
    /**
     * get
     * @param url 
     * @param body 
     * @param headers 
     */
    get(url: string, body?: { [key: string]: any } | string, headers?: Object): Rx.Observable<Preview> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        if (/\/{\S*}/.test(url)) {
            if (typeof body == "object") {
                const urlStr = lodash.compact(url.match(/\/{\w[^\/{]*}/g).map(x => {
                    return body[x.match(/{(\w*)}/)[1]];
                })).join("/");
                url = url.replace(/\/{\S*}/, "/") + urlStr;
                body = {};
            }
        }
        body = this.formatBody(body);
        url = this.compatibleUrl(this.address, url, body as any);
        return Rx.Observable.ajax.get(
            url,
            headers
        ).timeout(this.timeout).catch(err => Rx.Observable.of(err)).map(this.responseMap).filter(this.filter);
    }
    /**
     * post
     * @param url 
     * @param body 
     * @param headers 
     */
    post(url: string, body?: any, headers?: Object): Rx.Observable<Preview> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        body = this.formatBody(body, "body", headers);
        url = this.compatibleUrl(this.address, url);
        return Rx.Observable.ajax.post(
            url,
            body,
            headers
        ).timeout(this.timeout).catch(err => Rx.Observable.of(err)).map(this.responseMap).filter(this.filter);
    }
    /**
     * put
     * @param url 
     * @param body 
     * @param headers 
     */
    put(url: string, body?: any, headers?: Object): Rx.Observable<Preview> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        body = this.formatBody(body, "body", headers);
        url = this.compatibleUrl(this.address, url);
        return Rx.Observable.ajax.put(
            url,
            body,
            headers
        ).timeout(this.timeout).catch(err => Rx.Observable.of(err)).map(this.responseMap).filter(this.filter);
    }
    /**
     * delete
     * @param url 
     * @param body 
     * @param headers 
     */
    delete(url: string, body?: { [key: string]: any } | string, headers?: Object): Rx.Observable<Preview> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        body = this.formatBody(body);
        url = this.compatibleUrl(this.address, url, body as any);
        return Rx.Observable.ajax.delete(
            url,
            headers
        ).timeout(this.timeout).catch(err => Rx.Observable.of(err)).map(this.responseMap).filter(this.filter);
    }
    /** 文件获取状态 */
    downloadLoading = false
    /**
     * 下载文件
     * @param AjaxRequest 
     * @param fileType 
     * @param fileName 
     */
    async download(AjaxRequest: Rx.AjaxRequest, fileType = '.xls', fileName = moment().format("YYYY_MM_DD_hh_mm_ss")) {
        this.getHeaders();
        if (this.downloadLoading) {
            return message.warn('文件获取中，请勿重复操作~')
        }
        this.downloadLoading = true;
        NProgress.start();
        AjaxRequest.url = this.compatibleUrl(this.address, AjaxRequest.url);
        AjaxRequest = {
            // url: url,
            method: "post",
            responseType: "blob",
            timeout: this.timeout,
            headers: this.headers,
            ...AjaxRequest
        }
        if (AjaxRequest.body) {
            AjaxRequest.body = this.formatBody(AjaxRequest.body, "body", AjaxRequest.headers);
        }
        const result = await Rx.Observable.ajax(AjaxRequest).catch(err => Rx.Observable.of(err)).toPromise();
        NProgress.done();
        this.downloadLoading = false;
        try {
            if (result.status == 200) {
                const blob = result.response;
                const a = document.createElement('a');
                const downUrl = window.URL.createObjectURL(blob);
                a.href = downUrl;
                switch (blob.type) {
                    case 'application/vnd.ms-excel':
                        a.download = fileName + '.xls';
                        break;
                    default:
                        a.download = fileName + fileType;
                        break;
                }
                a.click();
                window.URL.revokeObjectURL(downUrl);
                // message.success(`文件下载成功`)
                notification.success({
                    message: `文件下载成功`
                })
            } else {
                notification['error']({
                    key: this.notificationKey,
                    message: '文件下载失败',
                    description: result.message,
                });
            }

        } catch (error) {
            notification['error']({
                key: this.notificationKey,
                message: '文件下载失败',
                description: error.message,
            });
        }
    }
    /** jsonp 回调 计数 */
    jsonpCounter = 0;
    /**
     * jsonP
     */
    jsonp(url, body?: { [key: string]: any } | string, callbackKey = 'callback') {
        this.getHeaders();
        body = this.formatBody(body);
        url = this.compatibleUrl(this.address, url, `${body || '?time=' + new Date().getTime()}&${callbackKey}=`);
        return new Rx.Observable(observer => {
            this.jsonpCounter++;
            const key = '_jsonp_callback_' + this.jsonpCounter;
            const script = document.createElement('script');
            script.src = url + key;
            script.onerror = (err) => observer.error(err);
            document.body.appendChild(script);
            window[key] = (response) => {
                // clean up
                script.parentNode.removeChild(script);
                delete window[key];
                // push response downstream
                observer.next(response);
                observer.complete();
            };
        })
    };
    /**
     * url 兼容处理 
     * @param address 前缀
     * @param url url
     * @param endStr 结尾，参数等
     */
    compatibleUrl(address: string, url: string, endStr?: string) {
        endStr = endStr || ''
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(url)) {
            return `${url}${endStr}`;
        }
        else {
            // address  / 结尾  url / 开头
            const isAddressWith = lodash.endsWith(address, "/")
            const isUrlWith = lodash.startsWith(url, "/")
            // debugger
            if (isAddressWith) {
                if (isUrlWith) {
                    url = lodash.trimStart(url, "/")
                }
            } else {
                if (isUrlWith) {

                } else {
                    url = "/" + url;
                }
            }
        }
        return `${address}${url}${endStr}`
    }
    /**
     * 格式化 参数
     * @param body  参数 
     * @param type  参数传递类型
     * @param headers 请求头 type = body 使用
     */
    formatBody(
        body?: { [key: string]: any } | any[] | string,
        type: "url" | "body" = "url",
        headers?: Object
    ): any {
        // 加载进度条
        NProgress.start();
        // if (typeof body === 'undefined') {
        //     return '';
        // }
        if (type === "url") {
            let param = "";
            if (typeof body != 'string') {
                let parlist = [];
                lodash.forEach(body, (value, key) => {
                    if (!lodash.isNil(value) && value != "") {
                        parlist.push(`${key}=${value}`);
                    }
                });
                if (parlist.length) {
                    param = "?" + parlist.join("&");
                }
            } else {
                param = body;
            }
            return param;
        } else {
            // 处理 Content-Type body 类型 
            switch (headers["Content-Type"]) {
                case 'application/json;charset=UTF-8':
                    body = JSON.stringify(body)
                    break;
                case 'application/json':
                    if (lodash.isArray(body)) {
                        body = [...body]
                    }
                    if (lodash.isPlainObject(body)) {
                        body = { ...body as any }
                    }
                    break;
                case 'application/x-www-form-urlencoded':

                    break;
                case 'multipart/form-data':

                    break;
                case null:
                    delete headers["Content-Type"];
                    break;
                default:
                    break;
            }
            return body;
        }
    }
    notificationKey = "notificationKey"
    /**
     * ajax过滤
     */
    responseMap = (res) => {
        // 关闭加载进度条
        setTimeout(() => {
            NProgress.done();
        });
        try {
            // 使用传入得 过滤函数
            if (this.newResponseMap && typeof this.newResponseMap == "function") {
                return this.newResponseMap(res);
            }
            if (res.status == 200) {
                // 判断是否统一数据格式，是走状态判断，否直接返回 response
                if (res.response && res.response.status) {
                    switch (res.response.status) {
                        case 200:
                            return res.response.data;
                            break;
                        case 204:
                            return false;
                            break;
                        default:
                            throw {
                                url: res.request.url,
                                request: res,
                                message: res.response.message,
                                response: res.response
                            }
                            return false
                            break;
                    }
                }
                return res.response
            }
            throw {
                url: res.request.url,
                request: res,
                message: res.message,
                response: false
            }

        } catch (error) {
            console.error(error);
            notification['error']({
                key: 'ajaxError',
                message: error.message,
                duration: 10,
                description: `Url: ${error.url}`,
            });
            return false
        }
    }
    /**
     * 过滤 map 返回的 假值  
     */
    filter = (data) => {
        return data;
    }
    /** 日志 */
    log(url, body, headers) {

    }
}
export default new HttpBasics();