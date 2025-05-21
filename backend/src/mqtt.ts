import mqtt from 'mqtt';

export class MqttController {
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
            this.subscribe('env-data', (message: string) => {
                console.log('📨 Received message:', message);
                try {
                    const data = JSON.parse(message);
                    console.log('🧾 Parsed data:', data);
                } catch (err) {
                    console.error('❌ Failed to parse JSON:', err);
                }
            });
        });

        // 接続エラー時
        this.client.on('error', (err) => {
            console.error('❌ MQTT connection error:', err.message);
        });

        // 切断時
        this.client.on('close', () => {
            console.warn('⚠️ MQTT connection closed');
        });

        // 再接続時
        this.client.on('reconnect', () => {
            console.log('🔁 MQTT reconnecting...');
        });

        // オフライン時
        this.client.on('offline', () => {
            console.log('📴 MQTT offline');
        });
    }

    private subscribe(topic: string, callback: (message: string) => void) {
        // 指定したトピックを購読
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.error(`Failed to subscribe to topic "${topic}":`, err);
            } else {
                console.log(`Successfully subscribed to topic "${topic}"`);
            }
        });

        // メッセージを受信した際のイベントハンドラー
        this.client.on('message', (receivedTopic: string, message: Buffer) => {
            console.log(`Received message on topic "${receivedTopic}":`, message.toString());
            if (receivedTopic === topic) {
                // 受信したメッセージに基づいて何か処理を行う
                callback(message.toString());
            }
        });
    }
}
