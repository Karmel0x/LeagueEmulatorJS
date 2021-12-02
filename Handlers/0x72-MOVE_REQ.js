
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.MOVE_REQ');
	//console.log(packet);
    //console.log('C2S.MOVE_REQ Waypoints', packet.MovementData.Waypoints);

	//todo: probably we should use `packet.Position` instead of `packet.MovementData.Waypoints`
	// because while dashing it gives us current using waypoints ?? instead of where we want to go
	if(packet.OrderType == 2){ // right click move
		player.move0(packet.MovementData);
	}
	else if(packet.OrderType == 3){ // right click attack
		if(packet.TargetNetID){
			player.attack_TargetNetID(packet.TargetNetID, packet.MovementData);
		}
	}
	else if(packet.OrderType == 10){ // s key stop
		player.halt0(true);//todo:move to client position?
	}
};
