
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_VIEW_REQ');


	var obj1 = q.packet.readobj(Packets.cmd.C2S_VIEW_REQ.packet);
	q.packet.off = 0;
	console.log(obj1);

    var S2C_VIEW_ANS = createPacket('S2C_VIEW_ANS');
	S2C_VIEW_ANS.packet.SyncID = obj1.SyncID;
    var isSent = sendPacket(S2C_VIEW_ANS);
    
};
