import mqtt from 'mqtt';

class MqttClient {
  private static mqttClient: mqtt.MqttClient;

  static getInstance() {
    if (!MqttClient.mqttClient) {
      MqttClient.mqttClient = mqtt.connect('mqtt://mosquitto:1883'); // ローカルホストの MQTT サーバーに接続
      MqttClient.mqttClient.on('connect', () => {
        console.log('MQTT connected');
      });
    }
    return MqttClient.mqttClient;
  }

  publish(topic: string, message: string) {
    // メッセージを指定したトピックにパブリッシュ
    MqttClient.mqttClient.publish(topic, message, (err) => {
      if (err) {
        console.error(`Failed to publish message to topic "${topic}":`, err);
      } else {
        console.log(`Message published to topic "${topic}":`, message);
      }
    });
  }

  subscribe(topic: string, callback: (message: string) => void) {
    // 指定したトピックを購読
    MqttClient.mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe to topic "${topic}":`, err);
      } else {
        console.log(`Successfully subscribed to topic "${topic}"`);
      }
    });

    // メッセージを受信した際のイベントハンドラー
    MqttClient.mqttClient.on('message', (receivedTopic: string, message: Buffer) => {
      if (receivedTopic === topic) {
        console.log(`Received message from topic "${receivedTopic}":`, message.toString());
        // 受信したメッセージに基づいて何か処理を行う
        callback(message.toString());
      }
    });
  }
}

export const mqttClient = MqttClient.getInstance();
