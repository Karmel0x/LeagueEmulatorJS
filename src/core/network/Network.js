
const packets = require('./packets');
const handlers = require('../../handlers');
const parse = require('./parse');
const UnitList = require('../../app/UnitList');
const Server = require('../../app/Server');
require('../BufferExtend');


/**
 * @typedef {import('../../packets/BasePacket')} BasePacket
 * @typedef {import('../../gameobjects/units/Player')} Player
 * @typedef {import('../../gameobjects/units/Unit')} Unit
 */

class Network {

	/**
	 * @abstract
	 * @param {*} config 
	 * @returns 
	 */
	static start(config = {}) {
		var network = new this(config);
		network.listen();
		return network;
	}

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
		msg.peerNum = msg.peerNum || msg.peer_num;// todo
		this.handlePackets(msg);
	}

	/**
	 * @abstract
	 * @param {*} msg 
	 */
	sendPacketMsg(msg) {

	}


	/**
	 * Create packet instance to pass to sendPacket
	 * @param {string} packetName 
	 * @param {string} channel (S2C/C2S/...)
	 * @returns 
	 */
	static createPacket(packetName, channel = 'S2C') {
		const ChannelPackets = packets[channel];
		if (!ChannelPackets) {
			console.log('channel is not yet implemented', channel);
			return {};
		}

		const Packet = ChannelPackets[packetName];
		if (!Packet) {
			console.log('packet is not yet implemented', channel, packetName);
			return {};
		}

		var packet = /** @type {BasePacket} */ (new Packet());
		packet.cmd = Packet.id;

		return packet;
	}

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
		this.logPackets(packet);
		console.debug('peer:', peerNums, 'sent:', (packet.channelName || packets[packet.channel]?.name || packet.channel) + '.' + (packet.name || packets[packet.channel]?.[packet.buffer.readUint8(0)]?.name || packet.buffer.readUint8(0)));
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
		var peerNums = [];
		players.forEach((player) => {
			if (typeof player.peerNum == 'undefined' || player.peerNum < 0)
				return;

			peerNums.push(player.peerNum);
		});

		this.sendPacket(peerNums, packet);
	}

	/**
	 * 
	 * @param {string} packetName 
	 * @param {string} channel 
	 * @returns 
	 */
	createPacket(packetName, channel = 'S2C') {
		return this.constructor.createPacket(packetName, channel);
	}

	/**
	 * 
	 * @param {number[]} peerNums 
	 * @param {*} packet 
	 * @returns 
	 */
	sendPacket(peerNums, packet) {
		return this.constructor.sendPacket(peerNums, packet);
	}

	/**
	 * 
	 * @param {Player[]} players 
	 * @param {*} packet 
	 * @returns 
	 */
	sendPacketP(players, packet) {
		return this.constructor.sendPacketP(players, packet);
	}


	/**
	 * @param {*} packet 
	 */
	static logPackets(packet) {
		Server.logging.packet({
			channel: packet.channel || 0,
			//peerNum: packet.peerNum,
			bytes: packet.buffer.toString('hex'),
			time: Math.round(performance.now()),
			packet: packet.packet || packet,
		});
	}

	/**
	 * Handles received packets
	 * @param {PacketMessage} msg
	 */
	async handlePackets(msg) {

		/** @type {number | Player | Unit} */
		var player = msg.peerNum;
		msg.channel = msg.channel || 0;

		if (msg.channel) {// not HANDSHAKE
			var clientId = Server.playerPeers[msg.peerNum];
			player = UnitList.getUnitsF('ALL', 'Player')[clientId];
		}

		var packet = parse.parsePacket(msg);
		this.constructor.logPackets({ ...msg, packet });
		console.debug('peer:', msg.peerNum, 'recv:', (packets[msg.channel]?.name || msg.channel || 0) + '.' + (packets[msg.channel]?.[packet.cmd]?.name || packet.cmd || ''));
		//console.log('packet:', packet);

		try {
			const handler = handlers[packet.cmd];
			if (!handler)
				return console.log('packet handler not implemented yet :', msg.channel, msg.buffer.readUint8(0).toString(16));

			handler(player, packet);
		} catch (e) {
			console.log(e.stack);
		}

	}

}

module.exports = Network;
