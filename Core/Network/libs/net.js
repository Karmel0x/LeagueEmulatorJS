
const Network = require('../Network');
const net = require('net');

class NetworkWs extends Network {

	peer_num_number = 0;
	peers = {};

	listen(){
		const server = net.createServer((c) => {
			c.peer_num = this.peer_num_number++;
			this.peers[c.peer_num] = c;
			
			c.on('data', (data) => {
				var msg = {
					peer_num: c.peer_num,
					channel: 1,//C2S // channels should not exists here
					buffer: data,
				};
				this.onPacketReceived(msg);
			});
		});
		server.on('error', (err) => {
			
		});
		server.listen(this.port, this.host, () => {
			
		});
	}
	sendPacketMsg(msg){
		this.peers[msg.peer_num].write(msg.buffer);
	}
}

module.exports = NetworkWs;
