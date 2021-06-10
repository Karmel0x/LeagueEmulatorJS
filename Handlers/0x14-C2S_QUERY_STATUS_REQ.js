
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_QUERY_STATUS_REQ');
    
	var S2C_QUERY_STATUS_ANS = createPacket('S2C_QUERY_STATUS_ANS');
    S2C_QUERY_STATUS_ANS.packet.ok = true;
	var isSent = sendPacket(S2C_QUERY_STATUS_ANS);
};
