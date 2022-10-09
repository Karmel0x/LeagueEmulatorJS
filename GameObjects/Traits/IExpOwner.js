
const spellLevelMax = [5, 5, 5, 3];
const ExpCurve = [
	0, 280, 660, 1140, 1720, 2400,
	3180, 4060, 5040, 6120, 7300, 8580,
	9960, 11440, 13020, 14700, 16480, 18360,

	19060, 19760, 20460, 21160,
	21860, 22560, 23260, 23960,
	24660, 25360, 26060, 26760,
];

/**
 * Trait for units that can be leveled up
 * @class
 * @param {GameObject} I
 */
module.exports = (I) => class IExpOwner extends I {

	exp = 0;
	expTotal = 0;
	level = 1;
	gold = 10000;

	evolvePoints = 0;
	evolvePointsF = [false, false, false, false];
	skillPoints = 1;
	spellLevel = [0, 0, 0, 0];
	summonerSpellsEnabled = [true, true];

	/**
	 * Increase gold
	 * @param {Number} amount 
	 */
	goldUp(amount){
		this.gold += amount;

		this.charStats_send();
		console.log('goldUp', amount);
	}
	
	/**
	 * Increase exp and level up if needed
	 * @param {Number} amount 
	 */
	expUp(amount){
		this.exp += amount;
		this.expTotal += amount;
		while(this.expTotal >= ExpCurve[this.level]){
			//this.exp -= ExpCurve[this.level];
			this.levelUp(false);
		}

		this.charStats_send();
		console.log('expUp', amount);
	}

	/**
	 * level up
	 * @param {Boolean} sendStats
	 */
	levelUp(sendStats = true){
		if(this.level >= 18)
			return;

		++this.level;
		++this.skillPoints;

		var championWithEvolvePoints = false;
		if(championWithEvolvePoints && (this.level == 6 || this.level == 11 || this.level == 16))
			++this.evolvePoints;

		this.skillUpgrade_send(0);//for now
		if(sendStats)
			this.charStats_send();
		console.log('levelUp', this.level);
	}

	/**
	 * Skill upgrade by 1
	 * @param {Number} slot 
	 * @param {Boolean} isEvolve 
	 * @returns 
	 */
	skillUpgrade(slot, isEvolve = false){
		
		if(isEvolve){
			if(this.evolvePoints < 1)
				return;

			if(this.evolvePointsF[slot] == true)
				return;

			this.evolvePointsF[slot] = true;
			--this.evolvePoints;
			return;
		}

		if(this.skillPoints < 1)
			return;

		if(this.spellLevel[slot] >= spellLevelMax[slot])
			return;

		++this.spellLevel[slot];
		--this.skillPoints;
		this.skillUpgrade_send(slot);
		this.charStats_send();
	}

};
