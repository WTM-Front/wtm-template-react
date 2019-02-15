const WTMComponent = {
    /**WTM**/ 
    /**test      产品组操作接口 **/
    test: {
        name: '用户列表',
        path: '/user',
        component: () => import('./user').then(x => x.default) 
    }
    /**WTM**/
}
export default {
    ...WTMComponent
}