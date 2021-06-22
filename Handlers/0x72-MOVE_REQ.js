
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.MOVE_REQ');

	{
        var obj1 = Packets.C2S.MOVE_REQ.packet(q.packet);
		console.log(obj1);
        //console.log('Waypoints', obj1.MovementData.Waypoints);
		q.packet.off = 0;

		//console.log(global.Players);
		global.Players[0].move(obj1.Position, obj1.MovementData.Waypoints);
		global.Units[0].move(obj1.Position, obj1.MovementData.Waypoints);
	}

};
