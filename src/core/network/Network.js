
import handlers from '../../handlers/index.js';
import * as parse from './parse.js';
import UnitList from '../../app/UnitList.js';
import Server from '../../app/Server.js';
import Team from '../../gameobjects/extensions/traits/Team.js';


/**
 * @typedef {import('../../packets/BasePacket.js').default} BasePacket
 * @typedef {import('../../gameobjects/units/Player.js').default} Player
 * @typedef {import('../../gameobjects/units/Unit.js').default} Unit
 */

class Network {

	/**
	 * @abstract
	 * @param {*} config 
	 * @returns 
	 */
	static start(config = {}) {
		let network = new this(config);
		network.listen();
		return network;
	}

	/**
	 * 
	 * @param {Object} config 
	 * @param {number} [config.port] 
	 * @param {string} [config.host] 
	 * @param {string} [config.blowfishKey] 
	 */
	constructor(config = {}) {

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

	/**
	 * @param {PacketMessage} msg 
	 */
	onPacketReceived(msg) {
		this.handlePackets(msg);
	}

	/**
	 * @abstract
	 * @param {*} msg 
	 */
	sendPacketMsg(msg) {

	}


	///**
	// * Create packet instance to pass to sendPacket
	// * @param {string} packetName 
	// * @param {string} channel (S2C/C2S/...)
	// * @returns 
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
	//	let packet = /** @type {BasePacket} */ (new Packet());
	//	packet.cmd = Packet.id;
	//
	//	return packet;
	//}

	/**
	 * 
	 * @param {number} peerNum 
	 * @param {number} channel 
	 * @param {ArrayBuffer} buffer 
	 */
	static sendPacketS(peerNum, channel, buffer) {
		//console.log('sendPacketS', peerNum, buffer, channel);
		Server.network.sendPacketMsg({ peerNum, buffer, channel });
	}

	/**
	 * 
	 * @param {number[]} peerNums 
	 * @param {BasePacket} packet 
	 */
	static sendPacketM(peerNums, packet) {
		this.logPackets(packet, peerNums);
		console.debug('peer:', peerNums, 'sent:', `${packet.channelName}.${packet.name}`, 'size:', packet.buffer.byteLength);
		//console.debug(packet, packet.buffer);

		peerNums.forEach((peerNum) => {
			this.sendPacketS(peerNum, packet.channel, packet.buffer);
		});
	}

	/**
	 * 
	 * @param {number[]} peerNums 
	 * @param {BasePacket} packet 
	 */
	static sendPacket(peerNums, packet) {
		if (!packet || !packet.buffer) {
			//console.log('packet is not yet implemented', packet.id);
			return;
		}
		this.sendPacketM(peerNums, packet);
	}

	/**
	 * 
	 * @param {Player[]} players 
	 * @param {*} packet 
	 */
	static sendPacketP(players, packet) {
		/** @type {number[]} */
		let peerNums = [];
		players.forEach((player) => {
			if (typeof player.network.peerNum === 'undefined' || player.network.peerNum < 0)
				return;

			peerNums.push(player.network.peerNum);
		});

		this.sendPacket(peerNums, packet);
	}

	///**
	// * 
	// * @param {string} packetName 
	// * @param {string} channel 
	// * @returns 
	// */
	//createPacket(packetName, channel = 'S2C') {
	//	return this.constructor.createPacket(packetName, channel);
	//}

	/**
	 * 
	 * @param {number[]} peerNums 
	 * @param {*} packet 
	 */
	sendPacket(peerNums, packet) {
		const constructor = /** @type {typeof Network} */ (/** @type {any} */ (this.constructor));
		constructor.sendPacket(peerNums, packet);
	}

	/**
	 * 
	 * @param {Player[]} players 
	 * @param {*} packet 
	 */
	sendPacketP(players, packet) {
		const constructor = /** @type {typeof Network} */ (/** @type {any} */ (this.constructor));
		constructor.sendPacketP(players, packet);
	}


	/**
	 * @param {*} packet 
	 * @param {number[]} [peerNums] 
	 */
	static logPackets(packet, peerNums = []) {
		Server.logging.packet({
			channel: packet.channel || 0,
			bytes: Buffer.from(packet.buffer).toString('hex'),
			time: Math.round(performance.now()),
			packet: packet.packet || packet,
			peerNums: peerNums,
		});
	}

	/**
	 * Handles received packets
	 * @param {PacketMessage} msg
	 */
	async handlePackets(msg) {

		/** @type {number | Player | Unit} */
		let player = msg.peerNum;
		msg.channel = msg.channel || 0;

		if (msg.channel) {// not HANDSHAKE
			let clientId = Server.playerPeers[msg.peerNum];
			player = UnitList.getUnitsF(Team.TEAM_MAX, 'Player')[clientId];
		}

		let packet = parse.parsePacket(msg);

		const constructor = /** @type {typeof Network} */ (/** @type {any} */ (this.constructor));
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
			const handler = handlers[packet.cmd];
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
