
// spectator emulator for lol-s4
// something is wrong and you will see lags in game but anyway it may be usefull

// As first you need to unpack replay file (.lrf) with https://github.com/moonshadow565/LoLReplayUnpacker
// Example replay: https://github.com/Karmel0x/LeagueEmulatorJS/files/6702341/Ezreal.zip
// then run this with `node tools/spectator-emulator` and lol client with `runLol.bat`

var replayUnpacked = require(process.argv[2] || '../../LeagueEmulatorJS_replays/LOL-REPLAY.rlp.json');

// or if you just want packets in hex, uncomment these lines and run `node spectator-emulator > LOL-REPLAY.txt`
//for(let i = 0; i < replayUnpacked.length; i++){
//    var bytes = Buffer.from(replayUnpacked[i].Bytes, 'base64').toString('hex').match(/../g).join(' ');
//    console.log(('      ' + parseInt(replayUnpacked[i].Time)).substr(-7), replayUnpacked[i].Channel, ':', bytes);
//}
//return;

const enet = require('../../enetcppjs/build/Release/enetcppjs.node');
//const Handlers = require('../Core/Handlers');
const Packets = require('../Core/Packets');
require("../Core/BufferExtend");

async function start_spectator(){
	var time = Date.now();

	console.log('packet count:', replayUnpacked.length);
	for(let i = 0; i < replayUnpacked.length; i++){
		if(i < 5)
			continue;// skip key exchange
		
		while(Date.now() - time < (replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3))){
			await global.Utilities.wait(1);
		};

		// todo: ignore some packets: S2C.VIEW_ANS ?

		var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		enet.sendPacket(0, buffer, replayUnpacked[i].Channel);

		if(i % 100 == 0)
			console.log('packet number:', i);
	}

}

var _init_network_handler = false;
function init_network_handler(q){
	var obj1 = q.buffer.readobj(Packets.Header);
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
require('../Core/init_network')(undefined, init_network_handler);
