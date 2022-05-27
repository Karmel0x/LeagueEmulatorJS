
const loadingStages = require("../../../Constants/loadingStages");
const {createPacket, sendPacket, sendPacketS} = require("../../../Core/PacketUtilities");

module.exports = (I) => class IPUnit extends I {

	SET_HEALTH(){
		var SET_HEALTH = createPacket('SET_HEALTH');
		SET_HEALTH.netId = this.netId;
		SET_HEALTH.count = 0;
		SET_HEALTH.health = this.health.total;
		SET_HEALTH.currentHealth = this.currentHealth;
		this.sendTo_everyone(SET_HEALTH, loadingStages.NOT_CONNECTED);
		//console.log(SET_HEALTH);
	}
	UPDATE_MODEL(character){
		var UPDATE_MODEL = createPacket('UPDATE_MODEL');
		UPDATE_MODEL.netId = this.netId;
		UPDATE_MODEL.bitfield = {
			OverrideSpells: true,
			ModelOnly: false,
			ReplaceCharacterPackage: true,
		};
		UPDATE_MODEL.ID = 0;
		UPDATE_MODEL.SkinID = 0;
		UPDATE_MODEL.SkinName = character;
		this.sendTo_vision(UPDATE_MODEL);
	}
	SET_ANIMATION(animPairs){
		var SET_ANIMATION = createPacket('SET_ANIMATION');
		SET_ANIMATION.netId = this.netId;
		SET_ANIMATION.AnimationOverrides = [];
		for(let i in animPairs)
			SET_ANIMATION.AnimationOverrides.push({
				fromAnim: animPairs[i][0],
				toAnim: animPairs[i][1],
			});
		this.sendTo_vision(SET_ANIMATION);
	}

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	 charStats_send(){
		var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
		CHAR_STATS.units = [this];
		this.sendTo_everyone(CHAR_STATS);
	}
	skillUpgrade_send(Slot){
		var SKILL_UP = createPacket('SKILL_UP', 'S2C');
		SKILL_UP.netId = this.netId;
		SKILL_UP.Slot = Slot;
		SKILL_UP.spellLevel = this.spellLevel[Slot];
		SKILL_UP.skillPoints = this.skillPoints;
		this.sendTo_self(SKILL_UP);
		//console.debug(SKILL_UP);
	}

};
