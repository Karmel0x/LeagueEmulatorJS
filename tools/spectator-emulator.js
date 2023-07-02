
// spectator emulator for lol-s4
// something is wrong and you will see lags in game but anyway it may be usefull

// As first you need to unpack replay file (.lrf) with https://github.com/moonshadow565/LoLReplayUnpacker
// Example replay: https://github.com/Karmel0x/LeagueEmulatorJS/files/6702341/Ezreal.zip
// then run this with `node tools/spectator-emulator` and lol client with `runLol.bat`

const _replayreaders = require('./_replayreaders');
let replayUnpacked = _replayreaders(process.argv[2] || '../../LeagueEmulatorJS_replays/LOL-REPLAY.rlp.json');

// or if you just want packets in hex, uncomment these lines and run `node spectator-emulator > LOL-REPLAY.txt`
//for(let i = 0; i < replayUnpacked.length; i++){
//    let bytes = Buffer.from(replayUnpacked[i].Bytes, 'base64').toString('hex').match(/../g).join(' ');
//    console.log(('      ' + parseInt(replayUnpacked[i].Time)).substr(-7), replayUnpacked[i].Channel, ':', bytes);
//}
//return;

const enetLib = require('../src/core/network/libs/enet');
//const handlers = require('../src/core/handlers');
const BasePacket = require('../src/packets/BasePacket');
const Server = require('../src/app/Server');
require("../src/core/BufferExtend");


async function start_spectator() {
	let time = performance.now();

	console.log('packet count:', replayUnpacked.length);
	for (let i = 0; i < replayUnpacked.length; i++) {
		if (i < 5)
			continue;// skip key exchange

		while (performance.now() - time < (replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3))) {
			await Promise.wait(1);
		}

		// todo: ignore some packets: S2C.World_SendCamera_Server_Acknologment ?

		let buffer = null;
		if (replayUnpacked[i].Bytes || replayUnpacked[i].BytesB64)
			buffer = Buffer.from(replayUnpacked[i].Bytes || replayUnpacked[i].BytesB64, 'base64');
		else if (replayUnpacked[i].BytesHex)
			buffer = Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
		else if (replayUnpacked[i].BytesBuffer)
			buffer = replayUnpacked[i].BytesBuffer;

		Server.network.sendPacket([0], { buffer, channel: replayUnpacked[i].Channel });

		if (i % 100 == 0)
			console.log('packet number:', i);
	}

}

let _init_network_handler = false;
function init_network_handler(q) {
	let obj1 = q.buffer.readobj(BasePacket.struct_header);
	q.buffer.off = 0;
	if (obj1.cmd == 0x00) {
		let keyExchangePacket = '00 2a 00 ff 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';
		keyExchangePacket = keyExchangePacket.split(' ').join('');
		let buffer = Buffer.from(keyExchangePacket, 'hex');
		Server.network.sendPacket([0], { buffer, channel: 0 });
	}

	if (!_init_network_handler) {
		_init_network_handler = true;
		start_spectator();
	}
}

require('../src/core/init_utilities')();

enetLib.logPackets = () => { };

Server.network = enetLib.start({
	port: 5119,
	host: "127.0.0.1",
	blowfishKey: "17BLOhi6KZsTtldTsizvHg==",
});

Server.network.handlePackets = init_network_handler;
