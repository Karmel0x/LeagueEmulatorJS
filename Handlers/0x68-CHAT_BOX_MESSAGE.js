
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

const Minion = require("../Classes/Minion");


module.exports = function(q, obj1){
    console.log('handle: COMMUNICATION.CHAT_BOX_MESSAGE');
	console.log(obj1);


    var CHAT_BOX_MESSAGE = createPacket('CHAT_BOX_MESSAGE', 'COMMUNICATION');
	Object.assign(CHAT_BOX_MESSAGE, obj1);
	CHAT_BOX_MESSAGE.netId = global.Players[0].netId;
	console.log(CHAT_BOX_MESSAGE);
    var isSent = sendPacket(CHAT_BOX_MESSAGE);

    //var DEBUG_MESSAGE = createPacket('DEBUG_MESSAGE');
	//DEBUG_MESSAGE.netId = global.Players[0].netId;
	//DEBUG_MESSAGE.msg = obj1.msg;
    //var isSent = sendPacket(DEBUG_MESSAGE);
    

	if(obj1.msg[0] === '.'){
		if(obj1.msg[1] === 'q')
			new Minion('BLUE', 'MALEE', 0);
		if(obj1.msg[1] === 'w')
			global.command_START_GAME = true;
	}
};
