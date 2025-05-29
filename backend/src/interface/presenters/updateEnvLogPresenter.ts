import { inject, injectable } from 'tsyringe';
import { WebSocketClient } from '../../infrastructure/websocket/websocket';

@injectable()
export class UpdateEnvLogPresenter {
  constructor(@inject('WebSocketClient') private readonly wss: WebSocketClient) {}
  present(data: any): void {
    this.wss.present(data);
  }
}
