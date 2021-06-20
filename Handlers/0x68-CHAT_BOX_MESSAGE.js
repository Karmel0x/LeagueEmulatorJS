
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const Minion = require("../Classes/Minion");


module.exports = function(q){
    console.log('handle: CHAT_BOX_MESSAGE');


	var obj1 = q.packet.readobj(Packets.cmd.CHAT_BOX_MESSAGE.packet[0]);
	Packets.cmd.CHAT_BOX_MESSAGE.packet[1](q.packet, obj1);
	q.packet.off = 0;
	console.log(obj1);

    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE');
	Object.assign(CHAT_BOX_MESSAGE.packet, obj1);
	CHAT_BOX_MESSAGE.packet.netId = 0x40000001;
	CHAT_BOX_MESSAGE.packetTemplate = {//CHAT_BOX_MESSAGE // TODO
		cmd: 'uint8',
		//netId: 'uint32',
	
		ClientID: 'int32',
		netId: 'uint32',
		Localized: 'uint8',
		ChatType: 'uint32',
	
		paramsSize: 'int32',
		messageSize: 'int32',
		pars: ['uint8', 32],
		msg: ['char', obj1.messageSize],
		pad1: 'uint8',
	};
	console.log(CHAT_BOX_MESSAGE);
    var isSent = sendPacket(CHAT_BOX_MESSAGE);

    //var S2C_DEBUG_MESSAGE = createPacket('S2C_DEBUG_MESSAGE');
	//S2C_DEBUG_MESSAGE.packet.netId = 0x40000001;
	//S2C_DEBUG_MESSAGE.packet.msg = obj1.msg;
    //var isSent = sendPacket(S2C_DEBUG_MESSAGE);
    

	if(obj1.msg[0] === '.'){
		if(obj1.msg[1] === 'q')
			new Minion('BLUE', 'MALEE', 0);
	}
};
