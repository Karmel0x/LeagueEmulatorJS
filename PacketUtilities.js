
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
function createPacket(packetName, channel = 'S2C'){
	if(typeof Packets[channel] === 'undefined' || typeof Packets[channel][packetName] === 'undefined'){
		console.log('packet is not yet implemented', channel, packetName);
		return {};
	}

	var packet = new Packets[channel][packetName].packet;

	packet.cmd = Packets[channel][packetName].id;
	packet.info = {
		channel: {
			id: Packets[channel].id,
			name: Packets[channel].name,
		},
		packet: {
			id: Packets[channel][packetName].id,
			name: Packets[channel][packetName].name,
		}
	};

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

function sendPacket(packet){
	if(typeof packet === 'undefined'){
		//console.log('packet is not yet implemented', packet.id);
		return {};
	}

	var buffer = Buffer.allocUnsafe(10240);
	if(typeof packet.struct_header !== 'undefined'){
		buffer.writeobj(packet.struct_header, packet);
	}
	if(typeof packet.struct !== 'undefined'){
		fill_packetTemplate_length(packet.struct, packet);
		buffer.writeobj(packet.struct, packet);
	}
	if(typeof packet.writer !== 'undefined'){
		packet.writer(buffer);
	}
	
	var bufferSize = buffer.off;
	buffer = Buffer.concat([buffer], buffer.off);
	buffer.off = bufferSize;

	return sendPacket2(packet, buffer);
}
function sendPacket2(packet, buffer){
	console.log('sent:', packet.info.channel.name + '.' + packet.info.packet.name, buffer);
	//console.log('send:' + buffer.toString('hex').match(/../g).join('-'));
	var enet_sendPacket = enet.sendPacket(buffer, packet.info.channel.id);

	console.log('enet_sendPacket:', enet_sendPacket);
	return enet_sendPacket;
}

module.exports = {createPacket, sendPacket, sendPacket2};
