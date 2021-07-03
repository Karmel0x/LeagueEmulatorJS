
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.SKILL_UPGRADE');
	console.log(obj1);

    
    let player = global.Players[0];
    player.skillUpgrade(obj1.Slot, obj1.IsEvolve);

	var SKILL_UP = createPacket('SKILL_UP', 'S2C');
	SKILL_UP.netId = player.netId;
	SKILL_UP.Slot = obj1.Slot;
	SKILL_UP.SpellLevel = player.SpellLevel[obj1.Slot];
	SKILL_UP.SkillPoints = player.SkillPoints;
	var isSent = sendPacket(SKILL_UP);
	console.log(SKILL_UP);

};
