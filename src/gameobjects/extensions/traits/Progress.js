import UnitAddGold from '../../../packets/S2C/0x22-UnitAddGold.js';

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
 */
export default class Progress {

	/**
	 * 
	 * @param {import('../../units/Unit.js').default} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	exp = 0;
	expTotal = 0;
	level = 1;
	gold = 10000;
	goldTotal = 10000;

	evolvePoints = 0;
	evolvePointsF = [false, false, false, false];
	skillPoints = 1;
	spellLevel = [0, 0, 0, 0];
	summonerSpellsEnabled = [true, true];

	/**
	 * Increase gold
	 * @param {number} amount 
	 * @param {Unit | number} source 
	 */
	goldUp(amount, source = 0) {
		this.gold += amount;

		let packet1 = new UnitAddGold();
		packet1.sourceNetId = source.netId || source;
		packet1.targetNetId = this.owner.netId;
		packet1.goldAmount = amount;
		this.owner.network?.sendPacket(packet1);
		//this.owner.packets.charStats_send();

		console.log('goldUp', amount);
	}

	/**
	 * Increase exp and level up if needed
	 * @param {number} amount 
	 */
	expUp(amount) {
		this.exp += amount;
		this.expTotal += amount;
		while (this.expTotal >= ExpCurve[this.level]) {
			//this.exp -= ExpCurve[this.level];
			this.levelUp(false);
		}

		//let packet1 = new UnitAddGold();
		//packet1.targetNetId = this.owner.netId;
		//packet1.expAmount = amount;
		//this.sendPacket(packet1);
		this.owner.packets.charStats_send();

		console.log('expUp', amount);
	}

	/**
	 * level up
	 * @param {boolean} sendStats
	 */
	levelUp(sendStats = true) {
		if (this.level >= 18)
			return;

		++this.level;
		++this.skillPoints;

		let championWithEvolvePoints = false;
		if (championWithEvolvePoints && (this.level == 6 || this.level == 11 || this.level == 16))
			++this.evolvePoints;

		this.owner.packets.skillUpgrade_send(0);//for now
		if (sendStats)
			this.owner.packets.charStats_send();
		console.log('levelUp', this.level);
	}

	/**
	 * Skill upgrade by 1
	 * @param {number} slot 
	 * @param {boolean} isEvolve 
	 * @returns 
	 */
	skillUpgrade(slot, isEvolve = false) {

		if (isEvolve) {
			if (this.evolvePoints < 1)
				return;

			if (this.evolvePointsF[slot] == true)
				return;

			this.evolvePointsF[slot] = true;
			--this.evolvePoints;
			return;
		}

		if (this.skillPoints < 1)
			return;

		if (this.spellLevel[slot] >= spellLevelMax[slot])
			return;

		++this.spellLevel[slot];
		--this.skillPoints;
		this.owner.packets.skillUpgrade_send(slot);
		this.owner.packets.charStats_send();
	}

}
