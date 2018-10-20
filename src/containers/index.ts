export default {
    editer: () => import('./editer').then(x => x.default),
    /**WTM**/ 
    [object Object]: () => import('./[object Object]').then(x => x.default)
    /**WTM**/
}