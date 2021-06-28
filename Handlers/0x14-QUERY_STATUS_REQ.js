
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.QUERY_STATUS_REQ');
	//console.log(obj1);
    

	var QUERY_STATUS_ANS = createPacket('QUERY_STATUS_ANS');
    QUERY_STATUS_ANS.ok = true;
	var isSent = sendPacket(QUERY_STATUS_ANS);
};
