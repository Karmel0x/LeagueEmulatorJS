
const Network = require('../Network');
const net = require('net');


class NetworkWs extends Network {

	peerNumIndex = 0;

	/**
	 * @type {Object.<number, net.Socket>}
	 */
	peers = {};

	listen() {
		const server = net.createServer((c) => {
			const peerNum = this.peerNumIndex++;
			this.peers[peerNum] = c;

			c.on('data', (data) => {
				/**
				 * @type {PacketMessage}
				 */
				let msg = {
					peerNum: peerNum,
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

	/**
	 * @param {PacketMessage} msg 
	 */
	sendPacketMsg(msg) {
		this.peers[msg.peerNum].write(msg.buffer);
	}
}

module.exports = NetworkWs;
