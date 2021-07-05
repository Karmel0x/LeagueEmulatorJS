
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.MOVE_REQ');
	console.log(obj1);
    //console.log('Waypoints', obj1.MovementData.Waypoints);


	{
		//console.log(global.Players);
		global.Players[0].move(obj1.Position, obj1.MovementData.Waypoints, obj1.MovementData.TranslateCenteredCoordinates);
		//global.Units[1].move(obj1.Position, obj1.MovementData.Waypoints, obj1.MovementData.TranslateCenteredCoordinates);
	}

};
