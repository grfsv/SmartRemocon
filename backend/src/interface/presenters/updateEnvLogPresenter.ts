import { inject, injectable } from 'tsyringe';
import { WebSocketClient } from '../../infrastructure/websocket/websocket';
import EnvLog from '../../domain/entities/envLog';

@injectable()
export class UpdateEnvLogPresenter {
  constructor(@inject('WebSocketClient') private readonly wss: WebSocketClient) {}
  present(data: EnvLog): void {
    this.wss.present('env_log_update', data.toJSON());
  }
}
