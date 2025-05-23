
import WebSocket from 'ws';

export function connectToInspector() {
    const ws = new WebSocket('ws://127.0.0.1/ws');
    console.log('connecting to inspector...');

    ws.on('error', function (error) {
        console.log('cannot connect to inspector');
    });

    ws.on('open', function () {
        console.log('connected to inspector');
        ws.send(JSON.stringify({
            cmd: 'gs',
        }));
    });

    //ws.on('message', function (data) {
    //    let res = JSON.parse(data as unknown as string);
    //    //console.log('message', data, res);
    //    if (res.cmd === 'sendpacket') {
    //        let { peerNums, data, channel } = res as { peerNums: number[], data: string, channel: number };
    //        let packetBuffer = Buffer.from(data.replaceAll(' ', ''), 'hex');
    //        console.log('sendpacket', peerNums, packetBuffer, channel);
    //        Server.network.sendData(peerNums, bufferToArrayBuffer(packetBuffer), channel);
    //    }
    //});

    return ws;
}
