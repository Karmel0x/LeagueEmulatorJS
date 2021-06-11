
const enet = require('../enetcppjs/build/Release/enetcppjs.node');
const Packets = require("./Packets");
require("./BufferExtend");


function packetSize(packet){

	if(typeof packet == 'string')
		return Buffer.typeSize[packet];
	if(typeof packet == 'object'){
		if(Array.isArray(packet))
			return packetSize(packet[0]) * packet[1];
		
		var packetSizeCount = 0;
		for(var i in packet){
			packetSizeCount += packetSize(packet[i]);
			//console.log(packet[i], packetSizeCount);
		}
		return packetSizeCount;
	}
	return 0;
}
const PacketsSizes = {};
for(var i in Packets.cmd)
	if(typeof Packets.cmd[i].packet !== 'undefined')
		PacketsSizes[Packets.cmd[i].id] = packetSize(Packets.cmd[i].packet);

function createPacket(packetName){
	if(typeof Packets.cmd[packetName] === 'undefined'){
		console.log('packet is not yet implemented', 1, packetName);
		return {packet: {}};
	}
	var packet = JSON.parse(JSON.stringify(Packets.cmd[packetName]));//Object.assign({}, Packets.cmd[packetName]);

	if(typeof packet.packet === 'undefined'){
		console.log('packet is not yet implemented', 2, packetName);
		return {packet: {}};
	}

	//var obj2 = Object.assign({}, packet);
	for(var i in packet.packet)
		packet.packet[i] = 0;

	packet.packetName = packetName;
	packet.packet.cmd = packet.id;

	return packet;
}

function fill_packetTemplate_length(packetTemplate, source){

    for(let i in packetTemplate)
        if(typeof packetTemplate[i] == 'object' && typeof packetTemplate[i][1] == 'string'){
            packetTemplate[i][1] = source[packetTemplate[i][1]] || 0;
			if(isNaN(packetTemplate[i][1]))
				packetTemplate[i][1] = 0;
			if(typeof packetTemplate[i][0] == 'object')
				fill_packetTemplate_length(packetTemplate[i][0], source[i][0] || 0);
		}
}

function sendPacket(packet){
	if(typeof packet.packet === 'undefined' || typeof PacketsSizes[packet.id] === 'undefined'){
		//console.log('packet is not yet implemented', packet.id);
		return {};
	}
	
	packet.packetSize = PacketsSizes[Packets.cmd[packet.packetName].id];
	if(isNaN(packet.packetSize)){
		packet.packetTemplate = JSON.parse(JSON.stringify(Packets.cmd[packet.packetName])).packet;
		fill_packetTemplate_length(packet.packetTemplate, packet.packet);
		packet.packetSize = packetSize(packet.packetTemplate);
		//console.log('------------DynamicSizedPacket---------', packet, packet.packetTemplate.Packet);
	}

	var p1 = Buffer.allocUnsafe(packet.packetSize);
	p1.writeobj(packet.packetTemplate || Packets.cmd[Packets.ids[packet.id]].packet, packet.packet);

	console.log('sent:', Packets.ids[packet.id], packet.packet, p1);//.toString('hex').match(/../g).join(' '));
	var enet_sendPacket = enet.sendPacket(p1, packet.channel).toString();

	console.log('enet_sendPacket:', enet_sendPacket);
	return enet_sendPacket;
}

module.exports = {createPacket, sendPacket};
