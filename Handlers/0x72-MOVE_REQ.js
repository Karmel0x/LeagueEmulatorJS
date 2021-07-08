
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.MOVE_REQ');
	//console.log(packet);
    //console.log('Waypoints', packet.MovementData.Waypoints);

	if(packet.TargetNetID){
		player.attack(packet.TargetNetID, packet.MovementData.Waypoints, packet.MovementData.TranslateCenteredCoordinates);
		return;
	}

	//console.log(global.Units['BLUE'].PLAYER);
	player.move0(packet.Position, packet.MovementData.Waypoints, packet.MovementData.TranslateCenteredCoordinates);
	//global.Units['BLUE'].MINION[0].move0(packet.Position, packet.MovementData.Waypoints, packet.MovementData.TranslateCenteredCoordinates);


};
