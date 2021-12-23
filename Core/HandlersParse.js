const Packets = require("./Packets");

function parseBody(buffer, channel, cmd){
	var obj1 = {};
	if(typeof Packets[channel] == 'undefined' || typeof Packets[channel][cmd] == 'undefined' || typeof Packets[channel][cmd].packet == 'undefined'){
		obj1.error = ['packet not defined', (Packets[channel]?.name || channel), (Packets[channel]?.[cmd]?.name || cmd?.toString(16) || cmd)];
        console.log(obj1.error, buffer);
        return obj1;
    }

	obj1 = new Packets[channel][cmd].packet();
	obj1.reader(buffer);

	if(buffer.off != buffer.length)
		console.log('packet structure is incorrect : buffer.off != buffer.length :', buffer.off, buffer.length, (Packets[channel]?.name || channel), ':', (Packets[channel][cmd]?.name || cmd), buffer);

	//console.log(obj1);
	return obj1;
}
function parsePacket(packet){
	var obj1 = packet.buffer.readobj(Packets.Header);
    if(packet.buffer.off == packet.buffer.length){
        packet.buffer.off = 0;
        return obj1;
    }
	if(obj1.cmd == 0xFE){
		obj1.cmd1 = obj1.cmd;
		obj1.cmd = packet.buffer.read1('uint16');
	}
	if(obj1.cmd == 0xFF){
		return obj1;
	}

    packet.buffer.off = 0;
    Object.assign(obj1, parseBody(packet.buffer, packet.channel || 0, obj1.cmd));
    packet.buffer.off = 0;

	//obj1.cmd = obj1.cmd2 ?? obj1.cmd;

	return obj1;
}

module.exports = {parseBody, parsePacket};
