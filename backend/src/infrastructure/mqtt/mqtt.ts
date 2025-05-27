import mqtt from 'mqtt';

export class MqttClient {
    private client: mqtt.MqttClient;

    constructor() {
        console.log('MQTT Controller initialized');
        this.client = mqtt.connect('mqtt://mosquitto:1883', {
            clientId: 'my-app-client', // 任意の一意なIDを指定
            clean: true, // 必要に応じて false（セッション保持）
            reconnectPeriod: 1000, // 切断時に1秒ごとに再接続
            connectTimeout: 30 * 1000, // 接続タイムアウト
        }); // ローカルホストの MQTT サーバーに接続
        // 接続成功時
        this.client.on('connect', () => {
            console.log('✅ MQTT connected');

            // トピック購読
            // env-data
            this.client.subscribe('env-data', () => {
                console.log('env-log subscribed');
            });
        });

        this.client.on('message', (topic, message) => {
            const receivedMessage = message.toString;
            if (topic == 'env-log') {
            }
            console.log();
        });
    }
}
