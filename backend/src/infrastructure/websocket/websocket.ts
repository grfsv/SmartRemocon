import { injectable, inject } from 'tsyringe';
import http from 'http';
import { Server } from 'socket.io';
import { UpdateEnvLogsOutputPort } from '../../interface/presenters/updateEnvLogsOutputPort';
import { EnvLog } from '../../domain/entities/envLog';

@injectable()
export class WebSocketController implements UpdateEnvLogsOutputPort {
    private wss: Server;

    constructor(@inject('WebServer') webServer: http.Server) {
        this.wss = new Server(webServer, {});

        this.wss.on('connection', (ws) => {
            console.log('WebSocket client connected');

            ws.on('close', () => {
                console.log('WebSocket client disconnected');
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
        });
    }

    present(data: EnvLog | null): void {
        if (data) {
            this.wss.emit('env-data', data);
        } else {
            console.error('No data to emit');
        }
    }
}
