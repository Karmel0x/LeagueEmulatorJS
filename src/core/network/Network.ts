
import handlers from '../../handlers/index';
import * as parse from './parse';
import UnitList from '../../app/UnitList';
import Server from '../../app/Server';
import Team from '../../gameobjects/extensions/traits/Team';

import BasePacket from '../../packets/BasePacket';
import Player from '../../gameobjects/units/Player';
import Unit from '../../gameobjects/units/Unit';
import { PacketMessage } from '../Core';

class Network {

	/**
	 * @abstract
	 */
	static start(config: any = {}) {
		let network = new this(config);
		network.listen();
		return network;
	}

	port;
	host;
	blowfishKey;

	constructor(config: { port?: number; host?: string; blowfishKey?: string; } = {}) {

		this.port = config.port || 5119;
		this.host = config.host || '127.0.0.1';
		// todo: blowfishKey should be different for every player
		this.blowfishKey = config.blowfishKey || '17BLOhi6KZsTtldTsizvHg==';

	}

	/**
	 * @abstract
	 */
	listen() {

	}

	onPacketReceived(msg: PacketMessage) {
		this.handlePackets(msg);
	}

	/**
	 * @abstract
	 */
	sendPacketMsg(msg: PacketMessage) {

	}


	///**
	// * Create packet instance to pass to sendPacket
	// */
	//static createPacket(packetName, channel = 'S2C') {
	//	const ChannelPackets = packets[channel];
	//	if (!ChannelPackets) {
	//		console.log('channel is not yet implemented', channel);
	//		return {};
	//	}
	//
	//	const Packet = ChannelPackets[packetName];
	//	if (!Packet) {
	//		console.log('packet is not yet implemented', channel, packetName);
	//		return {};
	//	}
	//
	//	let packet = /** @//type {BasePacket} */ (new Packet());
	//	packet.cmd = Packet.id;
	//
	//	return packet;
	//}

	static sendPacketS(peerNum: number, channel: number, buffer: ArrayBuffer) {
		//console.log('sendPacketS', peerNum, buffer, channel);
		Server.network.sendPacketMsg({ peerNum, buffer, channel });
	}

	static sendPacketM(peerNums: number[], packet: BasePacket) {
		this.logPackets(packet, peerNums);
		console.debug('peer:', peerNums, 'sent:', `${packet.channelName}.${packet.name}`, 'size:', packet.buffer.byteLength);
		//console.debug(packet, packet.buffer);

		peerNums.forEach((peerNum) => {
			this.sendPacketS(peerNum, packet.channel, packet.buffer);
		});
	}

	static sendPacket(peerNums: number[], packet: BasePacket) {
		if (!packet || !packet.buffer) {
			//console.log('packet is not yet implemented', packet.id);
			return;
		}
		this.sendPacketM(peerNums, packet);
	}

	static sendPacketP(players: Player[], packet: BasePacket) {
		let peerNums: number[] = [];
		players.forEach((player) => {
			if (typeof player.network.peerNum === 'undefined' || player.network.peerNum < 0)
				return;

			peerNums.push(player.network.peerNum);
		});

		this.sendPacket(peerNums, packet);
	}

	//createPacket(packetName, channel = 'S2C') {
	//	return this.constructor.createPacket(packetName, channel);
	//}

	sendPacket(peerNums: number[], packet: BasePacket) {
		const constructor = this.constructor as typeof Network;
		constructor.sendPacket(peerNums, packet);
	}

	sendPacketP(players: Player[], packet: BasePacket) {
		const constructor = this.constructor as typeof Network;
		constructor.sendPacketP(players, packet);
	}


	static logPackets(packet: BasePacket, peerNums: number[] = []) {
		Server.logging.packet({
			channel: packet.channel || 0,
			bytes: Buffer.from(packet.buffer).toString('hex'),
			time: Math.round(performance.now()),
			packet: packet.packet || packet,
			peerNums: peerNums,
		});
	}

	async handlePackets(msg: PacketMessage) {

		let player: number | Player = msg.peerNum;
		msg.channel = msg.channel || 0;

		if (msg.channel) {// not HANDSHAKE
			let clientId = Server.playerPeers[msg.peerNum];
			player = UnitList.getUnitsF(Team.TEAM_MAX, 'Player')[clientId] as Player;
		}

		let packet = parse.parsePacket(msg);

		const constructor = this.constructor as typeof Network;
		//@ts-ignore
		constructor.logPackets({ ...msg, packet }, ['C2S', msg.peerNum]);

		if (!packet)
			return;

		console.debug(
			'peer:', msg.peerNum,
			'recv:', packet.channelName + '.' + packet.name,
			//'(' + msg.channel + '.' + packet.id + ')',
			//'(' + msg.channel.toString(16) + '.' + packet.id.toString(16) + ')'
		);
		//console.log('packet:', packet);

		try {
			const handler = handlers[packet.cmd as keyof typeof handlers];
			if (!handler)
				return console.log('packet handler not implemented yet :', msg.channel, msg.buffer.readUint8(0).toString(16));

			handler(player, packet);
		} catch (e) {
			//@ts-ignore
			console.log(e.stack);
		}

	}

}

export default Network;
