import { IMenu } from './Menu';
import { RouterPath } from '../../router/index';
import { hasPermission } from '../../utils/index';
import Permission from '../../config';
import { cloneDeep as clone } from 'lodash';
export const G_PERMISSION_MENUS = 'G_PERMISSION_MENUS'
export interface IMenu {
    Name: String,
    Router?: RouterPath | String,
    Icon?: String,
    Subs?: IMenu[]
}
export interface State {
    Menus: IMenu[]
}
export function menu(Name: string, Router?: RouterPath | String, Icon?: string, Subs: IMenu[] = [], Permission: string | number = '') {
    return {
        Name, Router, Icon, Subs, Permission
    }
}
const state: State = {
    Menus: [
        // menu("控制面板", "", "", [
        //     menu('控制面板', RouterPath.Dashboard, "", [], Permission.ShowDashboard),
        //     // menu('系统设定', RouterPath.OrdersList, ""),
        // ], Permission.ShowDashboard),

    ],

}
const getters = {
    [G_PERMISSION_MENUS]() {
        let m: any = [];
        state.Menus.forEach((d: any) => {
            if (d.Permission.length == 0 || hasPermission(d.Permission, false)) {
                let p = clone(d)
                p.Subs = [];
                d.Subs.forEach((s: any) => {
                    if (s.Permission.length == 0 || hasPermission(s.Permission, false)) {
                        p.Subs.push(s)
                    }
                });
                m.push(p)
            }
        })
        return m;
    }
}
const actions = {

};
const mutations = {

};
export default {
    state, getters, actions, mutations
}