
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.QUERY_STATUS_REQ');
    
	var QUERY_STATUS_ANS = createPacket('QUERY_STATUS_ANS');
    QUERY_STATUS_ANS.packet.ok = true;
	var isSent = sendPacket(QUERY_STATUS_ANS);
};
