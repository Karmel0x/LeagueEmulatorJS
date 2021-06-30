// sends recorded packets to the server, will give more control than in game client and possibility to verify response
// ... for now it's more 'todo' than 'ready', but it's parsing packets at least
// bad code and bad behavior here, but who cares, it's only for testing / developing purposes

// run with 'node client-emulator' then open link in your browser: `http://127.0.0.1/`
//Example recordings: https://github.com/Karmel0x/LeagueEmulatorJS/issues/2


//var replayUnpacked = require('../../../LOL-REPLAY.rlp.json');
var replayUnpacked = require('../../../dumps-4.12-Riven vs Miss Fortune 1v1.json');


require('../../init_utilities')();
var {server, wss} = require('./init_client-server');


const enet = require('../../../enetcppjs/build/Release/enetcppjs.node');
const Packets = require("../../Packets");
require("../../BufferExtend");
const {createPacket, sendPacket} = require("../../PacketUtilities");
const HandlersParse = require("../../HandlersParse");
var BatchPacket = require('../../Packets/BatchPacket');

wss.onMessage = (data) => {

	var res = JSON.parse(data);
	console.log(res);

	if(res.cmd == 'loadpackets'){
		
		for(let i = 0; i < replayUnpacked.length && i < res.limit; i++){

      		var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
      		var bytes = buffer.toString('hex').match(/../g).join(' ');
      		var parsed = HandlersParse.parsePacket({
				channel: replayUnpacked[i].Channel,
				buffer: buffer,
			});
			
			if(parsed.cmd == 0xFF){
    			buffer.off = 0;
				let batchPackets = new BatchPacket();
				batchPackets.reader(buffer);//console.log(batchPackets);
				for(let i = 0; i < batchPackets.packets.length; i++){
					packet = batchPackets.packets[i];
					
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

			wss.clients.sendToAll(JSON.stringify({
				cmd: 'newpacket',
				packet: {
					Id: i,
					Time: replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3),
					Channel: replayUnpacked[i].Channel,
					Bytes: bytes,
					Parsed: parsedStr,
					channelName: Packets[replayUnpacked[i].Channel || 0]?.name || replayUnpacked[i].Channel,
					cmdName: Packets[replayUnpacked[i].Channel || 0][parsed.cmd2 || parsed.cmd]?.name || parsed.cmd2 || parsed.cmd,
				},
			}));

		}
	}else if(res.cmd == 'initialize_client'){
		require('./init_client-network')();
	}else if(res.cmd == 'sendpacket'){
		let i = res.Id;
		var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		
        enet.sendPacket(buffer, replayUnpacked[i].Channel);
	}else if(res.cmd == 'sendpacket_type'){
		var KEY_CHECK = createPacket(res.name, res.channel);
		KEY_CHECK.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.ClientID = 0;
		KEY_CHECK.PlayerID = 1;
		var isSent = sendPacket(KEY_CHECK);
	}

}
