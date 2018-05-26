import { RouterPath } from '../router'
//本地存储

export function cache(key: string, value?: any) {
    if (null === value) {
        //如果值为空,清除键名对应的数据
        localStorage.removeItem(key);
    } else {
        if (value !== undefined) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            try {
                let p: any = localStorage.getItem(key);
                return 'string' == typeof p ? JSON.parse(p) : '';
            } catch (error) {

            }
            return ''
        }
    }
}
export function uuid() {
    var s: any = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010 
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01 
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

export function hasPermission(PermissionName: string | number, tip: boolean = true, redirect: RouterPath | any = false) {
    return true;
    // let p = 'undefined' != typeof vuex.getters[G_USER_PERMISSIONS][PermissionName]
    // if (!p && tip) { error('抱歉，您不具有该操作权限'); if (redirect) { router.push(redirect) } }
    // return p;
}