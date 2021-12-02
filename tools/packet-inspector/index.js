
// allows you to inspect packets, parses them to readable objects
// bad code and behavior here, but who cares, it's only for testing / developing purposes

// todo: reading .lrf files (for now it has to be unpacked with https://github.com/moonshadow565/LoLReplayUnpacker)
// todo: sending recorded packets to the server, will give more control than in game client and possibility to verify response
// todo: sending recorded packets to the client, with ability to set breakpoints, pause etc.

// run with 'node tools/packet-inspector' then open link in your browser: `http://127.0.0.1/`
// example recordings: https://github.com/Karmel0x/LeagueEmulatorJS/issues/2

var replayDir = '../LeagueEmulatorJS_replays/';


require('../../Core/init_utilities')();
var {server, wss} = require('./init_client-server');
const fs = require('fs');

const enet = require('../../../enetcppjs/build/Release/enetcppjs.node');
require("../../Core/BufferExtend");
const Packets = require('../../Core/Packets');
const {createPacket, sendPacket} = require('../../Core/PacketUtilities');

const HandlersParse = require("../../Core/HandlersParse");
var BatchPacket = require('../../Packets/BatchPacket');
const BasePacket = require('../../Packets/BasePacket');


var replayUnpacked;

wss.onMessage = (data) => {

	var res = JSON.parse(data);
	console.log(res);

	if(res.cmd == 'loadpackets'){
		
		let offset = res.offset || 0;
		let limit = (res.limit || 5000) + offset;
		let packetnames = res.packetnames || [];
		for(let i = offset; i < replayUnpacked.length && i < limit; i++){

      		var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join('').split('-').join(''), 'hex');
      		var bytes = buffer.toString('hex').match(/../g).join(' ');
      		var parsed = HandlersParse.parsePacket({
				channel: replayUnpacked[i].Channel,
				buffer: buffer,
			});

			if(parsed.cmd == 0x95)//PING_LOAD_INFO
				continue;

			if(parsed.cmd == 0xFF){
    			buffer.off = 0;
				let batchPackets = new BatchPacket();
				batchPackets.reader(buffer);//console.log(batchPackets);
				for(let i = 0; i < batchPackets.packets.length; i++){
					packet = batchPackets.packets[i];

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
				Id: i,
				Time: replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3),
				Channel: replayUnpacked[i].Channel,
				Bytes: bytes,
				Parsed: parsedStr,
				channelName: Packets[replayUnpacked[i].Channel || 0]?.name || replayUnpacked[i].Channel,
				cmdName: Packets[replayUnpacked[i].Channel || 0]?.[parsed.cmd2 || parsed.cmd]?.name || parsed.cmd2 || parsed.cmd,
				offDEBUG: JSON.stringify(BasePacket.offDEBUG),
			}

			if(packetnames && packetnames.length && !packetnames.includes(packetData.cmdName))
				continue;

			wss.clients.sendToAll(JSON.stringify({
				cmd: 'newpacket',
				packet: packetData,
			}));

		}
	}else if(res.cmd == 'initialize_client'){
		require('./init_client-network')();
	}else if(res.cmd == 'sendpacket'){
		let i = res.Id;
		var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		
        enet.sendPacket(0, buffer, replayUnpacked[i].Channel);
	}else if(res.cmd == 'sendpacket_type'){
		var KEY_CHECK = createPacket(res.name, res.channel);
		KEY_CHECK.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.ClientID = 0;
		KEY_CHECK.PlayerID = 1;
		sendPacket(0, KEY_CHECK);
	}else if(res.cmd == 'loadreplaylist'){
		var replayList = fs.readdirSync(replayDir).filter((value) => {
			return value.endsWith('.json');
		});
		wss.clients.sendToAll(JSON.stringify({
			cmd: 'loadreplaylist',
			list: replayList,
		}));
	}else if(res.cmd == 'loadreplayfile'){
		//try{
			replayUnpacked = require('../../' + replayDir + res.name);
		//}catch(e){
		//	console.log(e);
		//}
	}

}
