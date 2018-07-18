import MQTT from 'castle-mqtt'
import config from '../config'
import { UUID } from '../store/base/Login';
const mqtt = new MQTT(config.MqttServer, config.AppName + '/', UUID)
export default mqtt