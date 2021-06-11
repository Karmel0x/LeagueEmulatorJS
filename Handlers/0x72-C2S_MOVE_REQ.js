
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_MOVE_REQ');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_MOVE_REQ.packet[0]);
        obj1.MovementData = Packets.cmd.C2S_MOVE_REQ.packet[1](q.packet);
		console.log(obj1);
        console.log('Waypoints', obj1.MovementData.Waypoints);
		q.packet.off = 0;

	}

};
