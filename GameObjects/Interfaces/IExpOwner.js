
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
	 * Increase exp and level up if needed
	 * @param {Number} amount 
	 */
	expUp(amount){
		this.exp += amount;
		this.expTotal += amount;
		while(this.exp >= ExpCurve[this.level]){
			this.exp -= ExpCurve[this.level];
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
