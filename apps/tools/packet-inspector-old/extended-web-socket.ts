import ws from 'ws';

export function sendJson(ws: ws, data: any) {
    ws.send(JSON.stringify(data));
}

export function sendToAll(wss: ws.Server, data: any) {
    for (let client of wss.clients) {
        client.send(data);
    }
}

export function sendJsonToAll(wss: ws.Server, data: any) {
    for (let client of wss.clients) {
        sendJson(client, data);
    }
}
