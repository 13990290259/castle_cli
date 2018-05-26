import axios from 'axios'
import config from '../config'
export const request = axios.create({
    timeout: 10000,
    withCredentials: true,
})
request.interceptors.response.use((response: any) => {
    return response.data
})
const get_url = (Obj: string, Method: string): string => {
    if (config.HttpServer.length == 0) {
        console.error('request.ts server config is error,please confirm')
        alert('request中的服务器地址未配置，请检查配置')
    }
    return `http://${config.HttpServer}/${Obj}/${Method}`;
}
export async function post(Obj: string, Method: string, data: any) {
    return await request.post(get_url(Obj, Method), data)
}