
import type { PacketMessages } from '@repo/network/network';
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import UnitAiList from '../../app/unit-ai-list';
import loadingStages from '../../constants/game-state';
import Game from '../../game/initializers/game';
import type { Player } from '../../gameobjects/unit-ai';


export default class PlayerNetwork {

	readonly owner: Player;

	constructor(owner: Player) {
		this.owner = owner;
	}

	peerNum = -1;
	loadingStage = loadingStages.notConnected;

	sendPacket(packet: PacketMessages, minStage = loadingStages.inGame) {
		if (!packet)
			return;
		if (this.loadingStage < minStage)
			return;

		//if (this.packetBatching) {
		//	this.batchPackets.push(packet);
		//	return;
		//}

		Server.network.sendPackets([this.peerNum], packet);
	}

	sendReconnectPackets2() {
		const packet1 = packets.StartSpawn.create({});
		this.sendPacket(packet1, loadingStages.notConnected);

		//const ai = this.owner;
		//Game.eventEmitter.emit('playerStartSpawn', ai);

		const objects = UnitAiList.objects;
		for (let i = 0; i < objects.length; i++) {
			const object = objects[i]!;
			const packets2 = object.onSpawnPackets();
			this.sendPacket(packets2, loadingStages.notConnected);
		}

		//if (!spawned) {//temporary here
		//	spawned = true;
		//	Game.loaded();
		//}

		const players = Server.players.map(player => player.ai as Player);
		for (let i = 0; i < players.length; i++) {
			const player = players[i]!;

			const packet3 = player.packets.CreateHero();
			this.sendPacket(packet3, loadingStages.notConnected);
			const packet4 = player.packets.AvatarInfo_Server();
			this.sendPacket(packet4, loadingStages.notConnected);

			//const unit = player.owner;
			//const team = Server.teams[unit.team.id];
			//if (team)
			//	team.showUnit(unit, loadingStages.loading);
		}

		const packet5 = packets.EndSpawn.create({});
		this.sendPacket(packet5, loadingStages.notConnected);
	}

	async sendReconnectPackets() {
		await Game.resolveOnGameLoaded();
		this.sendReconnectPackets2();
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
