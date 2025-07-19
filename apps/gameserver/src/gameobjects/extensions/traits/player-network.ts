
import type { PacketMessage } from '@repo/network/packets/packet';
import * as packets from '@repo/packets/list';
import Server from '../../../app/server';
import UnitAiList from '../../../app/unit-ai-list';
import loadingStages from '../../../constants/game-state';
import Game from '../../../game/initializers/game';
import type { Player } from '../../unit-ai';


export default class PlayerNetwork {

	readonly owner: Player;

	constructor(owner: Player) {
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

	async sendReconnectPackets() {
		await Game.resolveOnGameLoaded();

		const packet1 = packets.StartSpawn.create({});
		this.sendPacket(packet1, loadingStages.notConnected);

		//Game.eventEmitter.emit('playerStartSpawn', this.owner);
		UnitAiList.objects.forEach(unit => {
			unit.onSpawnPackets((packet) => this.sendPacket(packet, loadingStages.loading));
		});

		//if (!spawned) {//temporary here
		//	spawned = true;
		//	Game.loaded();
		//}

		const players = Server.players.map(player => player.ai as Player);
		players.forEach(player => {
			player.packets.CreateHero(this);
			player.packets.AvatarInfo_Server(this);
		});

		const packet2 = packets.EndSpawn.create({});
		this.sendPacket(packet2, loadingStages.notConnected);
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
