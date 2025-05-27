import { inject } from 'tsyringe';
import { WebSocketClient } from '../../infrastructure/websocket/websocket';

export class UpdateEnvLogPresenter {
    constructor(@inject('WebSocketClient') private readonly wss: WebSocketClient) {}
    present(data: any): void {
        this.wss.present(data);
    }
}
