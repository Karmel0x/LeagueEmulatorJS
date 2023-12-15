
import Server from '../../../app/Server.js';
import loadingStages from '../../../constants/loadingStages.js';


export default class Network {

	/**
	 * 
	 * @param {import('../../units/Unit.js').default} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	peerNum = -1;
	loadingStage = loadingStages.NOT_CONNECTED;

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
			player.packets.CreateHero(this);
			player.packets.AvatarInfo_Server(this);
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
	//		let packet = this._storePacket.shift();
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
	//	let packet = {};
	//	packet.packets = this.batchedPackets;
	//	this.batchedPackets = [];
	//	//todo: create batchet packet
	//	sendPacket(this.peerNum, packet);
	//}

}
