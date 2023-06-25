
const Server = require('../../app/Server');
const loadingStages = require('../../constants/loadingStages');

/**
 * 
 * @mixin
 * @param {Player} I
 */
module.exports = (I) => class INetwork extends I {

	peerNum = -1;

	sendPacket(packet, minStage = loadingStages.IN_GAME) {
		if (this.loadingStage < minStage)
			return;

		//if(this.packetBatching)
		//    this.batchPackets.push(packet);
		//else
		Server.network.sendPacket([this.peerNum], packet);
	}


	sendReconnectPackets() {
		Server.players.forEach(player => {
			player.CreateHero(this);
			player.AvatarInfo_Server(this);
		});
	}

	//@todo packet batching
	//_storePacket = [];
	//
	//storePacket(packet) {
	//	this._storePacket.push(packet);
	//}
	//
	//restorePackets() {
	//	console.log('restorePackets', this._storePacket);
	//	while (this._storePacket.length) {
	//		var packet = this._storePacket.shift();
	//		sendPacketS([this.peerNum], packet.channel, packet.buffer);
	//	}
	//}
	//packetBatching = false;
	//batchedPackets = [];
	//
	//batch_begin() {
	//	this.packetBatching = true;
	//}
	//
	//batch_end() {
	//	this.packetBatching = false;
	//	var packet = {};
	//	packet.packets = this.batchedPackets;
	//	this.batchedPackets = [];
	//	//todo: create batchet packet
	//	sendPacket(this.peerNum, packet);
	//}

};
