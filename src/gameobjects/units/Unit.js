
import slotId from '../../constants/slotId.js';
import loadingStages from '../../constants/loadingStages.js';
import Server from '../../app/Server.js';
import UnitList from '../../app/UnitList.js';

import GameObject from '../GameObject.js';
import PUnit from '../extensions/packets/Unit.js';
import Buffs from '../extensions/traits/Buffs.js';
import Progress from '../extensions/traits/Progress.js';
import Rewards from '../extensions/traits/Rewards.js';
import Stats from '../extensions/traits/Stats.js';
import Team from '../extensions/traits/Team.js';

class Unit extends GameObject {

	packets;
	buffs;
	progress;
	rewards;
	stats;
	team;

	id = 0;
	died = 0;

	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	callbacks = {
		move: {},
		collision: {},
	};

	/** @type {Object.<string, *>} */
	slots = {};

	/** @type {import('../../game/datamethods/characters/_Character.js').default | undefined} */
	character;

	/**
	 * @param {string} characterName
	 */
	async switchCharacter(characterName) {
		/** @type {typeof import('../../game/datamethods/characters/_Character.js').default} */
		let Character = (await import('../../game/leaguedata/characters/' + characterName + '/index.js')).default;
		if (!Character)
			return;

		let character = new Character(this);
		this.character = character;
	}

	/** @type {import('../GameObjects.js').UnitSpawner | undefined} */
	spawner;

	/**
	 * @param {import('../GameObjects.js').UnitOptions} options 
	 */
	async loader(options) {
		await this.switchCharacter(options.character);
		this.info = options.info || {};

		this.packets = new PUnit(this);
		this.buffs = new Buffs(this);
		this.progress = new Progress(this);
		this.stats = new Stats(this);
		this.rewards = new Rewards(this);
		this.team = new Team(this, options.team, options.num);

		UnitList.append(this);
		console.debug(Date.now(), 'Created Unit', this.constructor.name, this.netId);
		console.log('UnitList.unitCount', UnitList.unitCount);
		//console.log(UnitList.units);

		this.update();
	}

	/**
	 * @param {import('../GameObjects.js').UnitOptions} options 
	 */
	constructor(options) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.options = options;
		this.spawner = options.spawner;

		this.loader(options);
	}

	destructor() {
		// todo
		//UnitList.remove(this);
	}

	initialized() {
		console.log('initialized', this.constructor.name, this.netId);
		this.emit('initialized');
		//this.progress.levelUp();
		this.spawn();
		this.loop();
	}

	spawn() {
		this.respawn();
	}

	async loop() {

	}

	ACTION = 0;

	/**
	 * Returns if unit is dead
	 * @returns 
	 */
	isDead() {
		return this.died;
	}

	canBeAttacked() {
		return false;
	}

	/**
	 * Returns if unit is able to move
	 * @returns 
	 */
	isAbleForMoving() {
		if (!this.moving)
			return false;

		if (this.isDead())
			return false;

		return true;
	}

	/**
	 * Returns if unit is able to attack
	 * @returns 
	 */
	isAbleForAttacking() {
		if (!this.slots[slotId.A])
			return false;

		if (this.isDead())
			return false;

		return true;
	}

	async update() {
		for (; ;) {
			await Promise.wait(1000);

			if (!Server.game.started)
				continue;

		}
	}

	respawn() {
		this.emit('respawn');
		this.died = 0;

		this.stats.health.current = this.stats.health.total;
		this.stats.mana.current = this.stats.mana.total;

		if (this.position)
			this.position.copy(this.spawnPosition);

		this.packets.OnEnterLocalVisibilityClient();

		Server.teams[this.team.id].vision(this, true);
	}

	// ==================================================

	/**
	 * Filter units by team
	 * @param {Unit[]} targets
	 * @param {number[] | number} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns {Unit[]}
	 */
	static filterByTeam(targets, team = Team.TEAM_MAX) {
		let teams = typeof team === 'number' ? [team] : team;

		if (teams.includes(Team.TEAM_MAX))
			return targets;

		return targets.filter(target => teams.includes(target.team.id));
	}


	/**
	 * Remove this unit from array
	 * @param {Unit[]} array
	 */
	removeThisFromArray(array) {
		let index = array.indexOf(this);
		if (index === -1)
			return;

		array.splice(index, 1);
	}

	/**
	 * Get all units
	 * @returns {Unit[]}
	 */
	getUnits(team = Team.TEAM_MAX) {
		return UnitList.getUnits(team);
	}
	/**
	 * Get ally units to this unit
	 * @returns {Unit[]}
	 */
	getAllyUnits() {
		let thisTeamId = this.team.id;
		return UnitList.units.filter(unit => unit.team.id == thisTeamId);
		//return this.getUnits(this.getAllyTeam());
	}
	/**
	 * Get enemy units to this unit
	 * @returns {Unit[]}
	 */
	getEnemyUnits() {
		let thisTeamId = this.team.id;
		return UnitList.units.filter(unit => unit.team.id != thisTeamId);
		//return this.getUnits(this.team.getEnemyTeam());
	}

	/**
	 * Get all units except this
	 * @returns {Unit[]}
	 */
	getOtherUnits(team = Team.TEAM_MAX) {
		let units = this.getUnits(team);
		this.removeThisFromArray(units);
		return units;
	}
	/**
	 * Get ally units except this
	 * @returns {Unit[]}
	 */
	getOtherAllyUnits() {
		return this.getOtherUnits(this.team.getAllyTeam());
	}

	/**
	 * Get ally units in range of this unit
	 * @param {number} range 
	 * @returns 
	 */
	getAllyUnitsInRange(range, distanceCalcPoint = 'CENTER_TO_CENTER') {
		let measure = this.measure[distanceCalcPoint];
		return measure.filterByRange(this.getAllyUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 * @param {number} range 
	 * @returns 
	 */
	getEnemyUnitsInRange(range, distanceCalcPoint = 'CENTER_TO_CENTER') {
		let measure = this.measure[distanceCalcPoint];
		return measure.filterByRange(this.getEnemyUnits(), range);
	}

}


export default Unit;
