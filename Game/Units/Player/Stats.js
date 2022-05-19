var StatsUnit = require('../Unit/Stats');
var ConstantsUnit = require('../../../Constants/Unit');
const {createPacket, sendPacket} = require("../../../Core/PacketUtilities");

const spellLevelMax = [5, 5, 5, 3];
const ExpCurve = [
	0,
	280.0, 660.0, 1140.0, 1720.0, 2400.0, 3180.0,
	4060.0, 5040.0, 6120.0, 7300.0, 8580.0, 9960.0,
	11440.0,
	13020.0,
	14700.0,
	16480.0,
	18360.0,
	19060.0,
	19760.0,
	20460.0,
	21160.0,
	21860.0,
	22560.0,
	23260.0,
	23960.0,
	24660.0,
	25360.0,
	26060.0,
	26760.0
];

class StatsPlayer extends StatsUnit {

	/**
	 * Send packet to client to update char stats
	 * @todo delay for few ms so it will not send multiple packets on same action
	 * for example SummonerHeal will not send two packets (for heal and for buff)
	 */
	charStats_send(){
		var CHAR_STATS = createPacket('CHAR_STATS', 'LOW_PRIORITY');
		CHAR_STATS.units = [this.parent];
		this.parent.packetController.sendTo_everyone(CHAR_STATS);
	}
	skillUpgrade_send(Slot){
		var SKILL_UP = createPacket('SKILL_UP', 'S2C');
		SKILL_UP.netId = this.parent.netId;
		SKILL_UP.Slot = Slot;
		SKILL_UP.SpellLevel = this.SpellLevel[Slot];
		SKILL_UP.SkillPoints = this.SkillPoints;
		this.parent.packetController.sendTo_self(SKILL_UP);
		console.debug(SKILL_UP);
	}
	Exp = 0;
	ExpTotal = 0;
	/**
	 * Increase exp and level up if needed
	 * @param {Number} amount 
	 */
	expUp(amount){
		this.Exp += amount;
		this.ExpTotal += amount;
		while(this.Exp >= ExpCurve[this.Level]){
			this.Exp -= ExpCurve[this.Level];
			this.levelUp(false);
		}

		this.charStats_send();
		console.log('expUp', amount);
	}
	Level = 1;
	/**
	 * Level up
	 * @param {Boolean} sendStats
	 */
	levelUp(sendStats = true){
		if(this.Level >= 18)
			return;

		++this.Level;
		++this.SkillPoints;

		var championWithEvolvePoints = false;
		if(championWithEvolvePoints && (this.Level == 6 || this.Level == 11 || this.Level == 16))
			++this.EvolvePoints;

		this.skillUpgrade_send(0);//for now
		if(sendStats)
			this.charStats_send();
		console.log('levelUp', this.Level);
	}
	EvolvePoints = 0;
	EvolveBools = [false, false, false, false];
	SkillPoints = 1;
	SpellLevel = [0, 0, 0, 0];
	SummonerSpellsEnabled = [true, true];

	/**
	 * Skill upgrade by 1
	 * @param {Number} Slot 
	 * @param {Boolean} IsEvolve 
	 * @returns 
	 */
	skillUpgrade(Slot, IsEvolve = false){
		
		if(IsEvolve){
			if(this.EvolvePoints < 1)
				return;

			if(this.EvolveBools[Slot] == true)
				return;

			this.EvolveBools[Slot] = true;
			--this.EvolvePoints;
			return;
		}

		if(this.SkillPoints < 1)
			return;

		if(this.SpellLevel[Slot] >= spellLevelMax[Slot])
			return;

		++this.SpellLevel[Slot];
		--this.SkillPoints;
		this.skillUpgrade_send(Slot);
		this.charStats_send();
	}
	Gold = 10000;

}


module.exports = StatsPlayer;
