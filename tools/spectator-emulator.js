
// spectator emulator for lol-s4
// something is wrong and you will see lags in game but anyway it may be usefull

// As first you need to unpack replay file (.lrf) with https://github.com/moonshadow565/LoLReplayUnpacker
// Example replay: https://github.com/Karmel0x/LeagueEmulatorJS/files/6702341/Ezreal.zip
// then run this with `node spectator-emulator` and lol client with `runLol.bat`

var replayUnpacked = require('../../LOL-REPLAY.rlp.json');

// or if you just want packets in hex, uncomment these lines and run `node spectator-emulator > LOL-REPLAY.txt`
//for(let i = 0; i < replayUnpacked.length; i++){
//    var bytes = Buffer.from(replayUnpacked[i].Bytes, 'base64').toString('hex').match(/../g).join(' ');
//    console.log(('      ' + parseInt(replayUnpacked[i].Time)).substr(-7), replayUnpacked[i].Channel, ':', bytes);
//}
//return;

const enet = require('../../enetcppjs/build/Release/enetcppjs.node');
//const Handlers = require('../Handlers');
const Packets = require('../Packets');
require("../BufferExtend");

async function start_spectator(){
    var time = Date.now();

    for(let i = 0; i < replayUnpacked.length; i++){
        if(i < 5)
            continue;// skip key exchange
        
        while(Date.now() - time < (replayUnpacked[i].Time || (replayUnpacked[i].TimeS * 1000).toFixed(3))){
            await global.Utilities.wait(1);
        };


        var buffer = replayUnpacked[i].Bytes ? Buffer.from(replayUnpacked[i].Bytes, 'base64') : Buffer.from(replayUnpacked[i].BytesHex.split(' ').join(''), 'hex');
        enet.sendPacket(buffer, replayUnpacked[i].Channel);

    }

}

var _start_spectator = false;

async function init_network(){
	var enet_initialize = Boolean(enet.initialize());
	console.log('enet_initialize:', enet_initialize);
	var q = {};
	while(true){
		q = enet.netLoop();
		if(typeof q.type === 'undefined'){//no packets atm
			await global.Utilities.wait(1);//don't overload cpu
			continue;
		}

		if(q.type == enet.ENET_EVENT_TYPE_RECEIVE){
            var obj1 = q.buffer.readobj(Packets.Header);
            q.buffer.off = 0;
            if(obj1.cmd == 0x00){
                var keyExchangePacket = '00 2a 00 ff 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00';
                var buffer = Buffer.from(keyExchangePacket, 'hex');
                enet.sendPacket(buffer, 0);
            }

            if(!_start_spectator){
                _start_spectator = true;
                start_spectator();
            }
		}
	}
}

require('../init_utilities')();
init_network();
