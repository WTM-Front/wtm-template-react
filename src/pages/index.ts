const WTMComponent = {
    tmp: {
        name: '测试',
        path: '/tmp',
        component: () => import('./tmp').then(x => x.default) 
    }
    /**WTM**/ 
    
    /**WTM**/
}
export default {
    ...WTMComponent
}