
const Packets = require('./Packets');
const Handlers = require('../../Handlers');
const Parse = require('./Parse');
require("../BufferExtend");

global.PlayerPeers = global.PlayerPeers || {};


class Network {

	/**
	 * @abstract
	 * @param {*} config 
	 * @returns {*|Network}
	 */
	static start(config = {}){
		var network = new this(config);
		network.listen();
		return network;
	}

	constructor(config = {}){

		this.port = config.port || 5119;
		this.host = config.host || '127.0.0.1';
		// todo: blowfishKey should be different for every player
		this.blowfishKey = config.blowfishKey || '17BLOhi6KZsTtldTsizvHg==';

	}

	/**
	 * @abstract
	 */
	listen(){

	}

	onPacketReceived(msg){
		this.handlePackets(msg);
	}

	/**
	 * @abstract
	 * @param {*} msg 
	 */
	sendPacketMsg(msg){

	}

	
	/**
	 * Create packet instance to pass to sendPacket
	 * @param {String} packetName 
	 * @param {String} channel (S2C/C2S/...)
	 * @returns {BasePacket}
	 */
	 static createPacket(packetName, channel = 'S2C'){
		if(typeof Packets[channel] == 'undefined' || typeof Packets[channel][packetName] == 'undefined'){
			console.log('packet is not yet implemented', channel, packetName);
			return {};
		}

		var packet = new Packets[channel][packetName]();
		packet.cmd = Packets[channel][packetName].id;

		return packet;
	}

	static sendPacketS(peer_num, channel, buffer){
		//console.log('sendPacketS', peer_num, buffer, channel);
		global.Network.sendPacketMsg({peer_num, buffer, channel});
	}
	static sendPacketM(peer_nums, packet){
		this.logPackets(packet);
		console.debug('peer:', peer_nums, 'sent:', packet.channelName + '.' + packet.name);
		//console.debug(packet, packet.buffer);

		peer_nums.forEach((peer_num) => {
			this.sendPacketS(peer_num, packet.channel, packet.buffer);
		});
	}
	/**
	 * 
	 * @param {Array.<Number>} peer_nums 
	 * @param {BasePacket} packet 
	 * @returns 
	 */
	static sendPacket(peer_nums, packet){
		if(!packet || !packet.buffer){
			//console.log('packet is not yet implemented', packet.id);
			return;
		}
		this.sendPacketM(peer_nums, packet);
	}

	static sendPacketP(players, packet){
		var peer_nums = [];
		players.forEach((player) => {
			if(typeof player.peer_num == 'undefined' || player.peer_num < 0)
				return;

			peer_nums.push(player.peer_num);
		});

		this.sendPacket(peer_nums, packet);
	}
	
	createPacket(packetName, channel = 'S2C'){
		return this.constructor.createPacket(packetName, channel);
	}
	sendPacket(peer_nums, packet){
		return this.constructor.sendPacket(peer_nums, packet);
	}
	sendPacketP(players, packet){
		return this.constructor.sendPacketP(players, packet);
	}

	
	static logPackets(packet){
		global.Logging.packet({
			channel: packet.channel || 0,
			//peer_num: packet.peer_num,
			bytes: packet.buffer.toString('hex'),
			time: Math.round(performance.now()),
			packet: packet.packet || packet,
		});
	}

	/**
	 * Handles received packets
	 * @param {Object} q packet {peer_num, channel, buffer}
	 */
	async handlePackets(msg){

		var player = msg.peer_num;
		msg.channel = msg.channel || 0;

		if(msg.channel){// not HANDSHAKE
			var clientId = global.PlayerPeers[msg.peer_num];
			player = global.getUnitsF('ALL', 'Player')[clientId];
		}

		var packet = Parse.parsePacket(msg);
		this.constructor.logPackets({...msg, packet});
		console.debug('peer:', msg.peer_num, 'recv:', (Packets[msg.channel]?.name || 0) + '.' + (Packets[msg.channel]?.[packet.cmd]?.name || packet.cmd || ''));
		//console.log('packet:', packet);

		try {
			if(typeof Handlers[packet.cmd] == 'undefined')
				return console.log('packet handler not implemented yet :', msg.channel, msg.buffer.readUint8(0).toString(16));

			Handlers[packet.cmd](player, packet);
		}catch(e){
			console.log(e.stack);
		}

	}

}

module.exports = Network;
