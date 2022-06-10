
//const fs = require('fs');
//
//var Handlers = {};
//
//var packetDir = __dirname + '/../Handlers/';
//fs.readdirSync(packetDir).forEach(function(file){
//	if(file.endsWith('.js') && file !== 'index.js')
//		Handlers['0x' + file.between('0x', '-')] = `./${file.replace('.js', '')}`;
//});
//
//Handlers = Object.keys(Handlers).sort((a, b) => parseInt(a, 16) - parseInt(b, 16)).reduce(
//	(obj, key) => {
//		obj[key] = Handlers[key];
//		return obj;
//	}, {}
//);
//
//console.log(`module.exports = {`);
//for(var packetId in Handlers){
//	console.log(`\t${packetId}: require('${Handlers[packetId]}'),`);
//}
//console.log(`};\n`);


const HandlersParse = require("./HandlersParse");
const { logPackets } = require("./PacketUtilities");

const Packets = require("./Packets");
const Handlers = require('../Handlers');


/**
 * Handles received packets
 * @param {Object} q packet {peer_num, channel, buffer}
 */
module.exports = async function(q){

	var player = q.peer_num;
	q.channel = q.channel || 0;

	if(q.channel){// not HANDSHAKE
		var clientId = global.PlayerPeers[q.peer_num];
		player = global.getUnitsF('ALL', 'Player')[clientId];
	}

	var packet = HandlersParse.parsePacket(q);
	logPackets({...q, packet});
	console.debug('peer:', q.peer_num, 'recv:', (Packets[q.channel]?.name || 0) + '.' + (Packets[q.channel]?.[packet.cmd]?.name || packet.cmd || ''));
	//console.log('packet:', packet);

	try {
		if(typeof Handlers[packet.cmd] == 'undefined')
			return console.log('packet handler not implemented yet :', q.channel, q.buffer.readUint8(0).toString(16));

		Handlers[packet.cmd](player, packet);
	}catch(e){
		console.log(e.stack);
	}

};
