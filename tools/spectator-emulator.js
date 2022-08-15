
// spectator emulator for lol-s4
// something is wrong and you will see lags in game but anyway it may be usefull

// As first you need to unpack replay file (.lrf) with https://github.com/moonshadow565/LoLReplayUnpacker
// Example replay: https://github.com/Karmel0x/LeagueEmulatorJS/files/6702341/Ezreal.zip
// then run this with `node tools/spectator-emulator` and lol client with `runLol.bat`

const _replayreaders = require('./_replayreaders');
var replayUnpacked = _replayreaders(process.argv[2] || '../../LeagueEmulatorJS_replays/LOL-REPLAY.rlp.json');

// or if you just want packets in hex, uncomment these lines and run `node spectator-emulator > LOL-REPLAY.txt`
//for(let i = 0; i < replayUnpacked.length; i++){
//    var bytes = Buffer.from(replayUnpacked[i].Bytes, 'base64').toString('hex').match(/../g).join(' ');
//    console.log(('      ' + parseInt(replayUnpacked[i].Time)).substr(-7), replayUnpacked[i].Channel, ':', bytes);
//}
//return;

const enet = require('../Core/enet');
//const Handlers = require('../Core/Handlers');
const BasePacket = require('../Packets/BasePacket');
require("../Core/BufferExtend");

async function start_spectator(){
	var time = performance.now();

	console.log('packet count:', replayUnpacked.length);
	for(let i = 0; i < replayUnpacked.length; i++){
		if(i < 5)
			continue;// skip key exchange
		
		while(performance.now() - time < (replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3))){
			await Promise.wait(1);
		};

		// todo: ignore some packets: S2C.World_SendCamera_Server_Acknologment ?

		var buffer = null;
		if(replayUnpacked[i].Bytes || replayUnpacked[i].BytesB64)
			buffer = Buffer.from(replayUnpacked[i].Bytes || replayUnpacked[i].BytesB64, 'base64');
		else if(replayUnpacked[i].BytesHex)
			buffer = Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		else if(replayUnpacked[i].BytesBuffer)
			buffer = replayUnpacked[i].BytesBuffer;

		enet.sendPacket(0, buffer, replayUnpacked[i].Channel);

		if(i % 100 == 0)
			console.log('packet number:', i);
	}

}

var _init_network_handler = false;
function init_network_handler(q){
	var obj1 = q.buffer.readobj(BasePacket.struct_header);
	q.buffer.off = 0;
	if(obj1.cmd == 0x00){
		var keyExchangePacket = '00 2a 00 ff 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';
		keyExchangePacket = keyExchangePacket.split(' ').join('');
		var buffer = Buffer.from(keyExchangePacket, 'hex');
		enet.sendPacket(0, buffer, 0);
	}

	if(!_init_network_handler){
		_init_network_handler = true;
		start_spectator();
	}
}

require('../Core/init_utilities')();
require('../Core/Network/libs/enet')(undefined, init_network_handler);
