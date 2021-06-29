const Packets = require("../Packets");
require("../BufferExtend");
const util = require('util');

var packet = {};
packet.bytes = `
61 00 00 00 00 3a 6d 0d 00 13 00 04 19 00 00 40 02 f8 05 3a f4 5a 07 f3 04 1a 00 00 40 01 58 f7 ce 0a ff 6a 0b 08 1c 00 00 40 3f 41 f7 66 0b fd 36 19 19 7f f3 02 1d 00 00 40 8b 02 dd 01 02 1f 00 00 40 b4 07 4f f4 02 21 00 00 40 32 f9 ce 0b 04 24 00 00 40 01 18 04 86 03 47 d1 02 02 f8 18 00 40 a1 07 d1 f4 02 2b 19 00 40 7d f7 55 0b 02 2c 19 00 40 e3 f6 d1 0a 02 2f 19 00 40 86 02 93 01 02 30 19 00 40 df 07 eb f4 02 3d 19 00 40 ad f7 d4 0a 02 3e 19 00 40 7f f6 83 0a 02 67 19 00 40 e8 01 e1 01 02 52 1b 00 40 b8 02 2c 02 04 5e 1b 00 40 03 43 02 0b 02 d1 e6 04 73 1b 00 40 02 bf ff 28 0c a8 fe 05 04 91 1b 00 40 02 b0 00 24 0c a8 fe 09
`;
//packet.channel = Packets.C2S.id;
//packet.cmd =  Packets.C2S.MOVE_REQ.id;

packet.bytes = packet.bytes.split("\r").join('');
packet.bytes = packet.bytes.split("\n").join('');
packet.bytes = packet.bytes.split('-').join(' ');
packet.bytes = packet.bytes.split(' ');

//packet.cmd = packet.cmd || packet.bytes[0];
packet.buffer = Buffer.from(packet.bytes);

//var obj1 = {};
//if(typeof Packets[packet.channel][packet.cmd].packet == 'function'){
//    obj1 = Packets[packet.channel][packet.cmd].packet(packet.buffer);
//}else{
//    obj1 = packet.buffer.readobj(Packets.C2S.MOVE_CONFIRM.packet);
//}
//
//console.log(util.inspect(obj1, false, null, true));



var MovementDataNormal = require('../Packets/SharedStruct/MovementDataNormal');


function MOVE_ANS(buffer){//LOW_PRIORITY.MOVE_ANS
    var obj = buffer.readobj({
        cmd: 'uint8',
        netId: 'uint32',
    
        SyncID: 'int32',
        MovementDataNormal_length: 'int16',
    });
    MovementDataNormal.reader(buffer, obj);
    return obj;
};
var obj1 = MOVE_ANS(packet.buffer);

console.log(util.inspect(obj1, false, null, true));