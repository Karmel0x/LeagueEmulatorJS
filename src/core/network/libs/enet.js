
const Network = require('../Network');
const enet = require('../../../../../enetcppjs');


class NetworkEnet extends Network {

	async netLoop() {
		for (; ;) {
			let msg = enet.netLoop();
			if (typeof msg.type == 'undefined') {//no packets atm
				await Promise.wait(1);//don't overload cpu
				continue;
			}

			if (msg.type == enet.ENET_EVENT_TYPE_RECEIVE) {
				this.onPacketReceived(msg);
			}
		}
	}

	listen() {
		let enetInitialize = enet.initialize(this.port, this.host, this.blowfishKey);
		enetInitialize = Boolean(enetInitialize);

		console.log('enetInitialize:', enetInitialize);
		if (!enetInitialize)
			return false;

		this.netLoop();
		return true;
	}

	/**
	 * @param {PacketMessage} msg 
	 */
	sendPacketMsg(msg) {
		enet.sendPacket(msg.peerNum, msg.buffer, msg.channel);
	}
}

module.exports = NetworkEnet;
