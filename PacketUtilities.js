
const enet = require('../enetcppjs/build/Release/enetcppjs.node');
const Packets = require("./Packets");
require("./BufferExtend");


/*function packetSize(packet, source = false){

	if(typeof packet == 'string'){
		if(packet == 'string')
			return source.length + 5;
		return Buffer.typeSize[packet];
	}
	if(typeof packet == 'object'){
		if(Array.isArray(packet))
			return packet[1] ? packetSize(packet[0]) * packet[1] : 0;
		
		var packetSizeCount = 0;
		for(var i in packet){
			packetSizeCount += packetSize(packet[i], source[i] || 0);
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
*/
function createPacket(packetName){
	if(typeof Packets.cmd[packetName] === 'undefined'){
		console.log('packet is not yet implemented [packet]', packetName);
		return {packet: {}};
	}

	var packet = JSON.parse(JSON.stringify(Packets.cmd[packetName]));//Object.assign({}, Packets.cmd[packetName]);

	if(typeof Packets.cmd[packetName].packet == 'function'){
		packet.packetTemplate = Packets.cmd[packetName].packet;
		packet.packet = {};
	}else{
		packet.packetTemplate = JSON.parse(JSON.stringify(Packets.cmd[packetName].packet));
		for(var i in packet.packet)
			packet.packet[i] = 0;
	}
	if(typeof packet.packetTemplate === 'undefined'){
		console.log('packet is not yet [packet.packet]', packetName);
		return {packet: {}};
	}

	packet.packetName = packetName;
	packet.packet.cmd = packet.id;

	return packet;
}

function childByAddressPlusMath(element, address){
    var addressSplitted = address.split('.');
    if(addressSplitted.length > 1)
        return childByAddressPlusMath(element[addressSplitted.shift()] || 0, addressSplitted.join('.'));

	var addressMath = address.split('|');
	address = addressMath[0] || '';
	addressMath = addressMath[1] || '';
	if(typeof element[address] == 'undefined')
		return 0;

	if(addressMath.length){
		if(addressMath[0] == '+')
			element[address] += parseInt(addressMath[1]);
		else if(addressMath[0] == '-')
			element[address] -= parseInt(addressMath[1]);
		else if(addressMath[0] == '*')
			element[address] *= parseInt(addressMath[1]);
		else if(addressMath[0] == '/')
			element[address] /= parseInt(addressMath[1]);
		else if(addressMath[0] == '!'){
			element[address] = !element[address];
			if(addressMath[1] == '!')
				element[address] = !element[address];
		}
	}

    return element[address];
}
function fill_packetTemplate_length(packetTemplate, source){
    for(let i in packetTemplate)
        if(typeof packetTemplate[i] == 'object' && typeof packetTemplate[i][1] == 'string'){
            packetTemplate[i][1] = childByAddressPlusMath(source, packetTemplate[i][1]);
			if(isNaN(packetTemplate[i][1]))
				packetTemplate[i][1] = 0;
			if(typeof packetTemplate[i][0] == 'object')
				fill_packetTemplate_length(packetTemplate[i][0], source[i][0] || 0);
		}

}

/*function sendPacket(packet){
	if(typeof packet.packet === 'undefined' || typeof PacketsSizes[packet.id] === 'undefined'){
		//console.log('packet is not yet implemented', packet.id);
		return {};
	}
	
	packet.packetSize = PacketsSizes[Packets.cmd[packet.packetName].id];
	if(isNaN(packet.packetSize)){
		//if(!packet.packetTemplate)
		//	packet.packetTemplate = JSON.parse(JSON.stringify(Packets.cmd[packet.packetName].packet));
		fill_packetTemplate_length(packet.packetTemplate, packet.packet);
		packet.packetSize = packetSize(packet.packetTemplate, packet.packet);
		//console.log('------------DynamicSizedPacket---------', packet, packet.packetTemplate.Packet);
		console.log(packet.packet.CharacterStackData, packet.packetTemplate.CharacterStackData);
	}

	var buffer = Buffer.allocUnsafe(packet.packetSize);
	buffer.writeobj(packet.packetTemplate || Packets.cmd[Packets.ids[packet.id]].packet, packet.packet);

	return sendPacket2(packet, buffer);
}*/
function sendPacket(packet){
	if(typeof packet.packet === 'undefined'){
		//console.log('packet is not yet implemented', packet.id);
		return {};
	}
	

	var buffer = Buffer.allocUnsafe(10240);
	if(typeof packet.packetTemplate == 'function'){
		packet.packetTemplate(buffer, packet.packet);
	}else{
		fill_packetTemplate_length(packet.packetTemplate, packet.packet);
		buffer.writeobj(packet.packetTemplate || Packets.cmd[Packets.ids[packet.id]].packet, packet.packet);
	}
	
	var bufferSize = buffer.off;
	buffer = Buffer.concat([buffer], buffer.off);
	buffer.off = bufferSize;

	return sendPacket2(packet, buffer);
}
function sendPacket2(packet, buffer){
	console.log('sent:', Packets.ids[packet.id], packet.packet, buffer);
	console.log('send:', buffer.toString('hex').match(/../g).join('-'));
	var enet_sendPacket = enet.sendPacket(buffer, packet.channel);

	console.log('enet_sendPacket:', enet_sendPacket);
	return enet_sendPacket;
}

module.exports = {createPacket, sendPacket, sendPacket2};
