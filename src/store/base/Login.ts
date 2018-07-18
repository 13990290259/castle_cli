import { ActionContextBasic } from '../index';
import router from '../../router'
import { findIndex, isFunction } from 'lodash'
import { Permission, Topic } from '../../config';
import { get_uuid } from 'castle-utils';
import { QosType } from 'castle-mqtt'
import mqtt from '../../api/Mqtt'
import UserApi from '../../api/User'
export const G_UID = 'G_UID';
export const G_UUID = 'G_UUID';
export const G_STORE_ID = 'G_STORE_ID';
export const G_UNIT_ID = 'G_UNIT_ID';
export const G_STORE = 'G_STORE'
export const G_UNIT = 'G_UNIT'
export const A_SELECT = 'A_SELECT'
export const A_LOGIN_SUCCESS = 'A_LOGIN_SUCCESS'
export const M_UID = 'M_UID'
export const M_GET_STORE = 'M_GET_STORE'
export const M_SELECTED = 'M_SELECTED'
export const A_SELECTED = 'A_SELECTED'
export const A_RELOGIN = 'A_RELOGIN';
export const M_USER = 'M_USER';
export const A_UNSELECT = 'A_UNSELECT';
export const M_UNSELECT = 'M_UNSELECT';
export const A_LOGOUT = 'A_LOGOUT'
export const M_LOGOUT = 'M_LOGOUT'
export const G_USER_PERMISSIONS = 'G_USER_PERMISSIONS';
export const M_USER_PERMISSIONS = 'M_USER_PERMISSIONS';
export const A_USER_PERMISSIONS = 'A_USER_PERMISSIONS';
export const UUID = get_uuid();
export interface State {
    UID: number,
    StoreID: number,
    UnitID: number,
    Unit: any,
    Store: any,
    User: any,
    Stores: any[],
    UUID: string,
    Permissions: any,
}
const state: State = {
    UID: 0,
    StoreID: 0,
    UnitID: 0,
    Stores: [],
    User: {
        UID: 0,
        Account: '',
        Name: ''
    },
    Unit: {
        UnitID: 0,
        Title: ''
    },
    Store: {
        StoreID: 0,
        UnitID: 0,
        Title: ''
    },
    UUID: '',
    Permissions: {
        // [Permission.ShowOrderCreateBtn]: {}
    },
}
const getters = {
    [G_UID]() { return state.UID; },
    [G_STORE_ID]() { return state.StoreID; },
    [G_UNIT_ID]() { return state.UnitID; },
    [G_STORE]() {
        return state.Store;
    },
    [G_UNIT]() { return state.Unit },
    [G_UUID]() {
        return state.UUID
    },
    [G_USER_PERMISSIONS]() {
        return state.Permissions;
    }
}
const actions = {
    [A_SELECT](context: ActionContextBasic) {
        //TODO 选择单位和库房
    },
    async [A_USER_PERMISSIONS](context: ActionContextBasic) {
        //TODO 获取该用户的权限数据
        let d = await UserApi.getMyPermission()
        context.commit(M_USER_PERMISSIONS, d)
    },
    [A_LOGIN_SUCCESS](context: ActionContextBasic, Login: any) {
        // login(login.Account, login.PWD, (d: any) => { }, )
        context.commit(M_UID, Login.UID)
        context.commit(M_USER, Login)
        mqtt.subscribe(Topic.UserByUID + Login.UID, QosType.LESS_ONE, (data) => {

        })
        mqtt.subscribe(Topic.UserPermissionByUID + Login.UID, QosType.LESS_ONE, () => {
            context.dispatch(A_USER_PERMISSIONS)
        })
    },
    [A_LOGOUT](context: ActionContextBasic) {
        context.commit(M_LOGOUT);
        context.commit(M_UNSELECT);
        UserApi.logout();
    },
    async [A_RELOGIN](context: ActionContextBasic, { s, e }: { s: Function, e?: Function }) {
        let d: any = await UserApi.relogin()
        if (d.UID && d.UID > 0) {
            context.dispatch(A_LOGIN_SUCCESS, d);
            if (isFunction(s)) {
                s(d)
            }
        } else {
            if (isFunction(e)) {
                e()
            }
        }
    }
};
const mutations = {
    [M_UID](state: State, UID: number) {
        state.UID = Number(UID);
    },
    [M_LOGOUT](state: State, ) {
        state.UID = 0;
    },
    [M_USER](state: State, User: any) {
        state.User = User;
    },
    [M_USER_PERMISSIONS](state: State, Permission: any) {
        state.Permissions = Permission;
    }
};
export default {
    state, getters, actions, mutations
}