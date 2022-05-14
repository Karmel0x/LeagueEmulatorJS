
const {createPacket, sendPacket, sendPacketS} = require("../../../Core/PacketUtilities");

class PacketConstructorsUnit {

	constructor(parent){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;
		
	}

	//SET_HEALTH(){
	//    var SET_HEALTH = createPacket('SET_HEALTH');
	//    SET_HEALTH.netId = this.netId;
	//    SET_HEALTH.count = 0;
	//    this.packetController.sendTo_vision(SET_HEALTH);
	//}
	SET_HEALTH(){
		var SET_HEALTH = createPacket('SET_HEALTH');
		SET_HEALTH.netId = this.parent.netId;
		SET_HEALTH.count = 0;
		SET_HEALTH.MaxHealth = this.parent.stats.HealthPoints.Total;
		SET_HEALTH.Health = this.parent.stats.CurrentHealth;
		this.parent.packetController.sendTo_vision(SET_HEALTH);
	}
	UPDATE_MODEL(character){
		var UPDATE_MODEL = createPacket('UPDATE_MODEL');
		UPDATE_MODEL.netId = this.parent.netId;
		UPDATE_MODEL.bitfield = {
			OverrideSpells: true,
			ModelOnly: false,
			ReplaceCharacterPackage: true,
		};
		UPDATE_MODEL.ID = 0;
		UPDATE_MODEL.SkinID = 0;
		UPDATE_MODEL.SkinName = character;
		this.parent.packetController.sendTo_vision(UPDATE_MODEL);
	}
	SET_ANIMATION(animPairs){
		var SET_ANIMATION = createPacket('SET_ANIMATION');
		SET_ANIMATION.netId = this.parent.netId;
		SET_ANIMATION.AnimationOverrides = [];
		for(let i in animPairs)
			SET_ANIMATION.AnimationOverrides.push({
				fromAnim: animPairs[i][0],
				toAnim: animPairs[i][1],
			});
		this.parent.packetController.sendTo_vision(SET_ANIMATION);
	}

}


module.exports = PacketConstructorsUnit;
