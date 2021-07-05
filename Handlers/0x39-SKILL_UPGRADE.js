
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.SKILL_UPGRADE');
	console.log(obj1);

    
    let player = global.Players[0];
    player.stats.skillUpgrade(obj1.Slot, obj1.IsEvolve);

};
