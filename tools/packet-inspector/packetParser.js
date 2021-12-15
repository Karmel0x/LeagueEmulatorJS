
const HandlersParse = require('../../Core/HandlersParse');
var BatchPacket = require('../../Packets/BatchPacket');
const BasePacket = require('../../Packets/BasePacket');
const Packets = require('../../Core/Packets');


function packetParser(packet1) {

	var buffer;
	if(packet1.Bytes || packet1.BytesB64)
		buffer = Buffer.from(packet1.Bytes || packet1.BytesB64, 'base64');
	else if(packet1.BytesHex)
		buffer = Buffer.from(packet1.BytesHex.split(' ').join('').split('-').join(''), 'hex');

	if(!buffer)
		return false;

	var bytes = buffer.toString('hex').match(/../g)?.join(' ') || '';
	var parsed = HandlersParse.parsePacket({
		channel: packet1.Channel,
		buffer: buffer,
	});

	if(parsed.cmd == 0x95)//PING_LOAD_INFO
		return false;

	if(parsed.cmd == 0xFF){
		buffer.off = 0;
		let batchPackets = new BatchPacket();
		batchPackets.reader(buffer);//console.log(batchPackets);
		for(let i = 0; i < batchPackets.packets.length; i++){
			var packet = batchPackets.packets[i];

			// some batched packets are different..
			if(packet.cmd == 0x72) // MOVE_REQ
				continue;
			
			packet.channel = 3;
			if(typeof Packets[0][packet.cmd] !== 'undefined')
				packet.channel = 0;
			else if(typeof Packets[1][packet.cmd] !== 'undefined')
				packet.channel = 1;
			else if(typeof Packets[2][packet.cmd] !== 'undefined')
				packet.channel = 2;
			else if(typeof Packets[4][packet.cmd] !== 'undefined')
				packet.channel = 4;
			else if(typeof Packets[5][packet.cmd] !== 'undefined')
				packet.channel = 5;
			else if(typeof Packets[7][packet.cmd] !== 'undefined')
				packet.channel = 1;

			packet.cmdName = Packets[packet.channel]?.[packet.cmd]?.name || '';

			if(packet.cmd == 0xFE){
				packet.cmd1 = packet.cmd;
				packet.buffer.off = 9;
				packet.cmd = packet.buffer.read1('uint16');
			}

			packet.buffer.off = 0;
			//console.log(packet);
			Object.assign(packet, HandlersParse.parseBody(packet.buffer, packet.channel || 0, packet.cmd));
			delete packet.struct_header;
			delete packet.struct;
			delete packet.info;
			delete packet.buffer;
		}
		parsed = batchPackets;
	}

	delete parsed.struct_header;
	delete parsed.struct;
	delete parsed.info;

	var parsedStr = '';
	try{
		parsedStr = JSON.stringify(parsed, (key, value) =>
			typeof value === "bigint" ? value.toString() + "n" : value, 2);
	}catch(e){}

	var packetData = {
		Id: packet1.Id || 0,
		Time: packet1.Time || (packet1.TimeS * 1000).toFixed(3),
		Channel: packet1.Channel,
		Bytes: bytes,
		Parsed: parsedStr,
		channelName: Packets[packet1.Channel || 0]?.name || packet1.Channel,
		cmdName: Packets[packet1.Channel || 0]?.[parsed.cmd2 || parsed.cmd]?.name || parsed.cmd2 || parsed.cmd,
		offDEBUG: JSON.stringify(BasePacket.offDEBUG),
	}

	return packetData;
};

module.exports = packetParser;
