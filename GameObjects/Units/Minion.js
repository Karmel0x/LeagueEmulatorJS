
const { Vector2 } = require('three');
const { removeGlobal } = require('./global.Units');

var lanePaths = {
	BLUE: [
		[
			new Vector2(917, 1725),
			new Vector2(1170, 4041),
			new Vector2(861, 6459),
			new Vector2(880, 10180),
			new Vector2(1268, 11675),
			new Vector2(2806, 13075),
			new Vector2(3907, 13243),
			new Vector2(7550, 13407),
			new Vector2(10244, 13238),
			new Vector2(10947, 13135),
			new Vector2(12511, 12776)
		],
		[
			new Vector2(1418, 1686),
			new Vector2(2997, 2781),
			new Vector2(4472, 4727),
			new Vector2(8375, 8366),
			new Vector2(10948, 10821),
			new Vector2(12511, 12776)
		],
		[
			new Vector2(1487, 1302),
			new Vector2(3789, 1346),
			new Vector2(6430, 1005),
			new Vector2(10995, 1234),
			new Vector2(12841, 3051),
			new Vector2(13148, 4202),
			new Vector2(13249, 7884),
			new Vector2(12886, 10356),
			new Vector2(12511, 12776)
		],
	],
	RED: [
		[
			new Vector2(12451, 13217),
			new Vector2(10947, 13135),
			new Vector2(10244, 13238),
			new Vector2(7550, 13407),
			new Vector2(3907, 13243),
			new Vector2(2806, 13075),
			new Vector2(1268, 11675),
			new Vector2(880, 10180),
			new Vector2(861, 6459),
			new Vector2(1170, 4041),
			new Vector2(1418, 1686)
		],
		[
			new Vector2(12511, 12776),
			new Vector2(10948, 10821),
			new Vector2(8375, 8366),
			new Vector2(4472, 4727),
			new Vector2(2997, 2781),
			new Vector2(1418, 1686)
		],
		[
			new Vector2(13062, 12760),
			new Vector2(12886, 10356),
			new Vector2(13249, 7884),
			new Vector2(13148, 4202),
			new Vector2(12841, 3051),
			new Vector2(10995, 1234),
			new Vector2(6430, 1005),
			new Vector2(3789, 1346),
			new Vector2(1418, 1686)
		],
	],
};

const ExtendWTraits = require('../../Core/ExtendWTraits');
const Unit = require('./Unit');
const IDefendable = require('../Traits/IDefendable');
const IAttackable = require('../Traits/IAttackable');
const IMovable = require('../Traits/IMovable');


class Minion extends ExtendWTraits(Unit, IDefendable, IAttackable, IMovable) {
	/**
	 * 
	 * @param {Object} options
	 * @param {Barrack} options.barrack
	 */
	constructor(...args){
		args[0].spawnPosition = args[0].spawnPosition || args[0].barrack.position;
		args[0].team = args[0].team || args[0].barrack.team;
		super(...args);
		this.barrack = args[0].barrack;

		//console.log(this);
		this.initialized();
	}
	destructor(){
		removeGlobal(this);
	}
	spawn(){
		this.barrack.spawnUnitAns(this.netId, this.character.id);

		super.spawn();
		this.moveLane(this.barrack.teamName, this.barrack.num);
	}
	/**
	 * Get the nearest point to the end of the path
	 * @param {Vector2} position 
	 * @param {Array.<Vector2>} arrayVector2 
	 * @returns {Vector2}
	 */
	static getFromNearestToEnd(position, arrayVector2){
		var nearest = 0;
		arrayVector2.reduce((previousValue, currentValue, index) => {
			let dist = position.distanceTo(currentValue);
			if(dist < previousValue){
				nearest = index;
				return dist;
			}
			return previousValue;
		}, 25000);
		return arrayVector2.slice(nearest);
	}
	/**
	 * Set waypoints for the unit to pathing
	 * @param {String} team (BLUE/RED)
	 * @param {Number} lane (0/1/2 TOP/MID/BOT)
	 */
	moveLane(team, lane){
		var lanePath = lanePaths[team][lane].map(a => a.clone());
		lanePath = Minion.getFromNearestToEnd(this.position, lanePath);

		this.setWaypoints(lanePath);
	}



	// on die / death functions ===========================================================
	
	/**
	 * @todo shall return barrack level
	 */
	get level(){
		return 1;
	}
	get rewardExp(){
		var character = this.character.constructor;
		return character.reward.exp;
	}
	get rewardGold(){
		var character = this.character.constructor;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;
	onDieRewards(source){
		console.log('onDieRewards', source.team, this.team, source.type);
		// make sure once again if we should reward killer
		if(source.team == this.team || this.killRewarded)
			return;

		this.killRewarded = true;

		// Experience from minion deaths is split between all champions within 1400 range.
		var range = 1400;
		var enemyUnitsInRange = this.getEnemyUnitsInRange(range);
		var enemyPlayersInRange = this.Filters().filterByType(enemyUnitsInRange, 'Player');
		enemyPlayersInRange = enemyPlayersInRange.filter(v => v != source);

		var numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if(source.type == 'Player')
			numberOfPlayersToSplitExp += 1;

		var rewardExp = this.rewardExp;
		if(numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;
		else
			rewardExp *= 1.2;

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if(source.type == 'Player'){
			source.expUp(rewardExp);
			source.goldUp(this.rewardGold);
		}

		// give exp to nearby enemies
		enemyPlayersInRange.forEach(enemyUnit => {
			enemyUnit.expUp(rewardExp);
		});
	}

	onDie(source){
		this.onDieRewards(source);
	}
	
	// =================================================================================
}


module.exports = Minion;
