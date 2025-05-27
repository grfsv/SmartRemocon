import { injectable, inject } from 'tsyringe';
import http from 'http';
import { Server } from 'socket.io';

@injectable()
export class WebSocketClient {
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
    
    present(data: any) {
        this.wss.emit('present', data);
    }
}
