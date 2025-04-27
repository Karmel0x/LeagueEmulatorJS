import WebSocket from 'ws';
import { EnetSocketUsingEvents } from "../../../../packages/enetcppjs/src/enet-using-events";
import { connectToInspector } from "./inspector-connection";


const config = {
    port: 5118,
    host: '127.0.0.1',
};

const destConfig = {
    port: 5119,
    host: '127.0.0.1',
};

let ws: WebSocket;

function logPacketReceive(peerNum: number, data: ArrayBuffer, channel: number) {
    const packet = Buffer.from(data);
    console.log('received packet of size', packet.byteLength, 'from', peerNum, 'on channel', channel, 'data:', data);

    if (!ws || ws.readyState !== WebSocket.OPEN)
        return;

    ws.send(JSON.stringify({
        cmd: 'addpacketforall',
        data: {
            channel: channel,
            data: packet.toString('hex'),
            //time: performance.now(),
            peerNums: [peerNum],
        },
    }));
}

function main() {
    ws = connectToInspector();

    const server = new EnetSocketUsingEvents();
    server.bind(config.port, config.host);
    console.log('network started on', config.host + ':' + config.port);
    console.log('proxying to', destConfig.host + ':' + destConfig.port);

    const client = new EnetSocketUsingEvents();

    server.on('connect', (peerNum: number) => {
        console.log('server.connect', peerNum);
        client.connect(destConfig.port, destConfig.host);
    });

    server.on('disconnect', (peerNum: number) => {
        console.log('server.disconnect', peerNum);
        client.disconnect(peerNum);
    });

    let blowfishSet = false;
    server.on('receive', (peerNum: number, data: ArrayBuffer, channel: number) => {
        logPacketReceive(peerNum, data, channel);

        if (!blowfishSet) {
            server.setBlowfish(peerNum, '17BLOhi6KZsTtldTsizvHg==');
        }

        client.send(peerNum, data, channel);

        if (!blowfishSet) {
            client.setBlowfish(peerNum, '17BLOhi6KZsTtldTsizvHg==');
            blowfishSet = true;
        }
    });

    client.on('receive', (peerNum: number, data: ArrayBuffer, channel: number) => {
        logPacketReceive(peerNum, data, channel);
        server.send(peerNum, data, channel);
    });

}

main();
