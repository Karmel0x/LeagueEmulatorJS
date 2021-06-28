const Packets = require("./Packets");

function parseBody(buffer, channel, cmd){
	var obj1 = {};
	if(typeof Packets[channel] == 'undefined' || typeof Packets[channel][cmd] == 'undefined' || typeof Packets[channel][cmd].packet == 'undefined'){
		obj1.error = ['packet not defined', (Packets[channel]?.name || channel), (Packets[channel][cmd]?.name || cmd.toString(16))];
        console.log(obj1.error);
        return obj1;
    }

	obj1 = new Packets[channel][cmd].packet();
	if(typeof obj1.struct_header !== 'undefined')
		Object.assign(obj1, buffer.readobj(obj1.struct_header));
	if(typeof obj1.struct !== 'undefined')
		Object.assign(obj1, buffer.readobj(obj1.struct));
	if(typeof obj1.reader !== 'undefined')
		obj1.reader(buffer);

	if(buffer.off != buffer.length)
		console.log('packet structure is incorrect : buffer.off != buffer.length :', (Packets[channel]?.name || channel), ':', (Packets[channel][cmd]?.name || cmd));

	//console.log(obj1);
	return obj1;
}
function parsePacket(packet){
	var obj1 = packet.buffer.readobj(Packets.Header);
    if(packet.buffer.off == packet.buffer.length){
        packet.buffer.off = 0;
        return obj1;
    }
    
    packet.buffer.off = 0;
    Object.assign(obj1, parseBody(packet.buffer, packet.channel || 0, obj1.cmd));
    packet.buffer.off = 0;
	return obj1;
}

module.exports = {parseBody, parsePacket};
