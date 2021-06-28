
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const Minion = require("../Classes/Minion");


module.exports = function(q, obj1){
    console.log('handle: COMMUNICATION.CHAT_BOX_MESSAGE');
	console.log(obj1);


    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	Object.assign(CHAT_BOX_MESSAGE.packet, obj1);
	CHAT_BOX_MESSAGE.packet.netId = global.Players[0].netId;
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

    //var DEBUG_MESSAGE = createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.packet.netId = global.Players[0].netId;
	//DEBUG_MESSAGE.packet.msg = obj1.msg;
    //var isSent = sendPacket(DEBUG_MESSAGE);
    

	if(obj1.msg[0] === '.'){
		if(obj1.msg[1] === 'q')
			new Minion('BLUE', 'MALEE', 0);
	}
};
