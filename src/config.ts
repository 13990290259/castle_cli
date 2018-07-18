import { set_server } from "../node_modules/castle-request";

const config = {
    HttpServer: '',
    MqttServer: '',
    AppName: '',
    AppDebug: false
}
export const Topic = {
    UserByUID: 'uu/',
    UserPermissionByUID: 'upu/'
}
export const Permission = {

}
set_server(config.HttpServer)
export default config;