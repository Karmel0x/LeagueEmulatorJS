
const UnitList = require('../../app/UnitList');
const Server = require('../../app/Server');

const Unit = require('./Unit');
const Moving = require('../extensions/traits/Moving');
const Attackable = require('../extensions/combat/Attackable');
const { minionsLanePaths } = require('../positions');
const Filters = require('../extensions/Filters');
const MovingUnit = require('../extensions/traits/MovingUnit');


class Minion extends Unit {

	combat;
	moving;

	/**
	 * @param {import('../GameObjects').MinionOptions} options 
	 */
	constructor(options) {
		super(options);
		this.options = options;

		this.combat = new Attackable(this);
		this.moving = new MovingUnit(this);

		//console.log(this);
		this.initialized();

		this.on('noTargetsInRange', () => {
			const InstantStop_Attack = Server.network.createPacket('InstantStop_Attack', 'S2C');
			InstantStop_Attack.netId = this.netId;
			InstantStop_Attack.flags = {};
			this.packets.toEveryone(InstantStop_Attack);

			this.moveLane();
		});

		//this.emit('noTargetsInRange');//todo
	}

	destructor() {
		UnitList.remove(this);
	}

	spawn() {
		this.spawner?.spawnUnitAns(this.netId, this.character.id);

		super.spawn();
	}

	/**
	 * Set waypoints for the unit to pathing
	 * @param {number} [teamId] (BLUE/RED)
	 * @param {number} [laneId] (0/1/2 TOP/MID/BOT)
	 */
	moveLane(teamId = undefined, laneId = undefined) {
		console.log('moveLane', this.constructor.name, this.netId);
		teamId = teamId ?? this.spawner?.team.id;
		laneId = laneId ?? this.spawner?.team.num;

		if (teamId == undefined || laneId == undefined)
			return;

		let minionLanePath = minionsLanePaths[teamId]?.[laneId];
		if (!minionLanePath)
			return;

		let lanePath = minionLanePath.map(a => a.clone());
		lanePath = this.measure.getFromNearestToEnd(lanePath);

		//@todo make path more precise
		if (lanePath.length > 1)
			lanePath.shift();

		this.moving.setWaypoints(lanePath);
	}



	// on die / death functions ===========================================================

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get rewardExp() {
		let character = this.character.constructor;
		return character.reward.exp;
	}

	get rewardGold() {
		let character = this.character.constructor;
		return character.reward.gold + (character.rewardPerLevel.gold * this.level);
	}

	killRewarded = false;

	/**
	 * 
	 * @param {Unit} source killer
	 */
	onDieRewards(source) {
		console.log('onDieRewards', source.team.id, this.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id == this.team.id || this.killRewarded)
			return;

		this.killRewarded = true;

		// Experience from minion deaths is split between all champions within 1400 range.
		let range = 1400;
		let enemyUnitsInRange = this.getEnemyUnitsInRange(range);
		let enemyPlayersInRange = /** @type {import('./Player')[]} */ (Filters.filterByType(enemyUnitsInRange, 'Player'));
		enemyPlayersInRange = enemyPlayersInRange.filter(v => v != source);

		let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if (source.type == 'Player')
			numberOfPlayersToSplitExp += 1;

		let rewardExp = this.rewardExp;
		if (numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;
		else
			rewardExp *= 1.2;

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if (source.type == 'Player') {
			source.progress.expUp(rewardExp);
			source.progress.goldUp(this.rewardGold, this);
		}

		// give exp to nearby enemies
		enemyPlayersInRange.forEach(enemyUnit => {
			enemyUnit.progress.expUp(rewardExp);
		});
	}

	/**
	 * 
	 * @param {import('../GameObjects').AttackableUnit} source 
	 */
	onDie(source) {
		this.onDieRewards(source);
	}

	// =================================================================================
}


module.exports = Minion;
