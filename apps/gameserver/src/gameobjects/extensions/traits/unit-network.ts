
import { PacketMessage } from '@repo/network/packets/packet';
import Server from '../../../app/server';
import loadingStages from '../../../constants/loading-stages';
import Unit from '../../units/unit';
import GameObjectList from '../../../app/game-object-list';


export default class UnitNetwork {

	owner: Unit;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	peerNum = -1;
	loadingStage = loadingStages.notConnected;

	sendPacket(packet: PacketMessage | undefined, minStage = loadingStages.inGame) {
		if (!packet)
			return;
		if (this.loadingStage < minStage)
			return;

		//if(this.packetBatching)
		//    this.batchPackets.push(packet);
		//else
		Server.network.sendPacket([this.peerNum], packet);
	}


	sendReconnectPackets() {
		GameObjectList.players.forEach(player => {
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
