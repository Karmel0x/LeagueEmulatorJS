
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.MOVE_REQ');
	//console.log(packet);
    //console.log('Waypoints', packet.MovementData.Waypoints);

	if(packet.TargetNetID){
		player.attack_TargetNetID(packet.TargetNetID, packet.MovementData);
		return;
	}

	//console.log(global.Units['BLUE'].Player);
	player.move0(packet.MovementData);//packet.Position, 
	//global.Units['RED'].Minion[Object.keys(global.Units['RED'].Minion)[0]].move0(packet.MovementData);


};
