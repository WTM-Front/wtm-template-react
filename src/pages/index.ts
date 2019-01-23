const WTMComponent = {
    /**WTM**/ 
    /**test      产品组操作接口 **/
    test: {
        name: 'test',
        path: '/test',
        component: () => import('./test').then(x => x.default) 
    }
    /**WTM**/
}
export default {
    ...WTMComponent
}