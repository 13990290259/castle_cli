import Vue from 'vue'
import Router, { Route } from 'vue-router'
import store from '../store'
// import webStorage from 'webStorage'
import { A_RELOGIN } from '../store/base/Login'
Vue.use(Router)
declare let require: any;
export enum RouterPath {
    Login = '/'
}
const router = new Router({
    routes: [
        {
            path: RouterPath.Login,
            name: '登录',
            component: r =>
                require(["../user/Login.vue"], r),
            meta: {
            }
        },
    ]
})

router.beforeEach((to: Route, from: Route, next: Function) => {
    if (store.state.Login.UID > 0) {
        next()
    } else if (to.path != RouterPath.Login) {
        // to.path = RouterPath.Login;
        //TODO 自动登录及重登请求
        store.dispatch(A_RELOGIN, {
            s: (d: any) => {
                next();
            },
            e: (e: any) => {
                next(RouterPath.Login)
            }
        })
    } else {
        next()
    }
})

export default router;