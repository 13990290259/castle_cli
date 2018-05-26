import { connect } from 'mqtt'
import config from '../config'
import { uuid } from '../utils'
const UUID = uuid();
const client = connect(config.MqttServer)
client.on('message', (topic: string, payload: any) => {
    console.log(topic, payload.toString());
    topic = topic.replace(prefix, '');
    try {
        let j = JSON.parse(payload)
        payload = j;
    } catch (e) {

    } finally {
        console.log(topic, payload)
        if ((payload.u != UUID || payload.a == 1) && cb[topic.replace(prefix, '')] instanceof Function) {
            cb[topic](payload.d, payload.u, payload.i)
        }
    }
})
const cb: any = {};
const prefix = config.AppName + '/';

export function publish(topic: string, data: any, all: boolean = false) {
    client.publish(prefix + topic, JSON.stringify({
        u: UUID,
        d: data,
        a: all ? 1 : 0
    }));
}
export const QosType = {
    ONLY_ONE: 2,
    LESS_ONE: 1,
    NOT_ENSURE: 0
}

export function subscribe(topic: string, type: any, message: Function) {
    client.subscribe(prefix + topic, { qos: type });
    cb[topic] = message;
}
export function unsubscribe(topic: string) {
    if (cb[topic]) {
        delete cb[topic]
        client.unsubscribe(prefix + topic)
    }
}
export enum LogType {
    ERROR = 'E',
    LOG = 'L',
}
/**
 * 发送日志数据
 * @param data 
 */
export function log(type: LogType, who: string, where: string, when: string, what: string) {
    client.publish(prefix + 'log', JSON.stringify({
        T: type,
        WO: who,
        WE: where,
        WN: when,
        WT: what
    }))
}