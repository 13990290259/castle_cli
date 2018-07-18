export function hasPermission(PermissionName: string | number, tip: boolean = true, redirect: any = false) {
    return true;
    // let p = 'undefined' != typeof vuex.getters[G_USER_PERMISSIONS][PermissionName]
    // if (!p && tip) { error('抱歉，您不具有该操作权限'); if (redirect) { router.push(redirect) } }
    // return p;
}