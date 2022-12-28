
const Network = require('../Network');
var { WebSocketServer } = require('ws');


class NetworkWs extends Network {

	peer_num_number = 0;
	peers = {};

	listen() {
		const wss = new WebSocketServer({ port: this.port, host: this.host });

		wss.on('connection', function connection(ws) {
			ws.peer_num = peer_num_number++;
			peers[c.peer_num] = c;

			ws.on('message', function message(data) {
				var msg = {
					peer_num: ws.peer_num,
					channel: 1,//C2S // channels should not exists here
					buffer: data,
				};
				this.onPacketReceived(msg);
			});
		});
	}
	sendPacketMsg(msg) {
		peers[msg.peer_num].send(msg.buffer);
	}
}

module.exports = NetworkWs;
