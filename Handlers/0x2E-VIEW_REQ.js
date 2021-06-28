
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.VIEW_REQ');
	//console.log(obj1);

    var VIEW_ANS = createPacket('VIEW_ANS');
	VIEW_ANS.packet.SyncID = obj1.SyncID;
    var isSent = sendPacket(VIEW_ANS);
    
};
