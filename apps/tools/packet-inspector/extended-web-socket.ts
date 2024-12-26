import ws from 'ws';
import { IncomingMessage } from 'http';

class ExtendedWebSocket extends ws.WebSocket {
    sendJson(data: any) {
        this.send(JSON.stringify(data));
    }
}

class ExtendedWebSocketServer extends ws.Server<typeof ExtendedWebSocket, typeof IncomingMessage> {
    constructor(options: ws.ServerOptions<typeof ExtendedWebSocket, typeof IncomingMessage>) {
        options.WebSocket = options.WebSocket || ExtendedWebSocket;
        super(options);

        this.on('connection', (ws) => {
            ws.on('message', (data) => this.onMessage(ws, data));
        });
    }

    sendToAll(data: any) {
        for (let client of this.clients) {
            client.send(data);
        }
    }

    sendJsonToAll(data: any) {
        for (let client of this.clients) {
            client.sendJson(data);
        }
    }

    onMessage(ws: ExtendedWebSocket, data: any) { }
}

export {
    ExtendedWebSocket as WebSocket,
    ExtendedWebSocketServer as WebSocketServer,
}
