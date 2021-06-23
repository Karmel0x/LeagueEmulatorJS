const Packets = require("../Packets");
require("../BufferExtend");
const util = require('util');

var packet = {};
packet.channel = Packets.C2S.id;
//packet.cmd =  Packets.C2S.MOVE_REQ.id;
packet.bytes = `

`;

packet.bytes = packet.bytes.split("\r").join('');
packet.bytes = packet.bytes.split("\n").join('');
packet.bytes = packet.bytes.split('-').join(' ');
packet.bytes = packet.bytes.split(' ');

packet.cmd = packet.cmd || packet.bytes[0];
packet.buffer = Buffer.from(packet.bytes);

var obj1 = {};
if(typeof Packets[packet.channel][packet.cmd].packet == 'function'){
    obj1 = Packets[packet.channel][packet.cmd].packet(packet.buffer);
}else{
    obj1 = packet.buffer.readobj(Packets.C2S.MOVE_CONFIRM.packet);
}

console.log(util.inspect(obj1, false, null, true));
