
const { Vector2 } = require('three');
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.MOVE_REQ');
	//console.log(packet);
    //console.log('C2S.MOVE_REQ Waypoints', packet.MovementData.Waypoints);

	//todo: probably we should use `packet.Position` instead of `packet.MovementData.Waypoints`
	// because while dashing it gives us current using waypoints ?? instead of where we want to go
	if(packet.OrderType == 2){ // right click move
		//var MovementData = {
		//	Waypoints: [
		//		packet.MovementData.Waypoints[0],
		//		new Vector2(packet.Position.x, packet.Position.y),
		//	],
		//};
		player.Movement.move0(packet.MovementData);
	}
	else if(packet.OrderType == 3){ // right click attack
		if(packet.TargetNetId){
			player.attack_TargetNetId(packet.TargetNetId, packet.MovementData);
		}
	}
	else if(packet.OrderType == 10){ // s key stop
		var MovementData = {
			Waypoints: [
				new Vector2(packet.Position.x, packet.Position.y),
			],
		};
		player.Movement.halt0(true, MovementData);//todo:move to client position?
	}
};
