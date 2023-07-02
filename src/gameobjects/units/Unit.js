
const slotId = require('../../constants/slotId');
const loadingStages = require('../../constants/loadingStages');
const Server = require('../../app/Server');
const UnitList = require('../../app/UnitList');

const GameObject = require('../GameObject');
const PUnit = require('../extensions/packets/Unit');
const Buffs = require('../extensions/traits/Buffs');
const Progress = require('../extensions/traits/Progress');
const Rewards = require('../extensions/traits/Rewards');
const Stats = require('../extensions/traits/Stats');
const Team = require('../extensions/traits/Team');


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

	/** @type {import('../../game/datamethods/characters/_Character') | undefined} */
	_character;

	/**
	 * @returns {import('../../game/datamethods/characters/_Character')}
	 */
	get character() {
		return /** @type {import('../../game/datamethods/characters/_Character')} */ (this._character);
	}

	/**
	 * @todo make this more clear
	 * @param {import('../../game/datamethods/characters/_Character') | string} char
	 */
	set character(char) {
		if (typeof char == 'string')
			char = require('../../game/leaguedata/characters/' + char);

		if (typeof char == 'function')
			char = new char(this);

		this._character = /** @type {import('../../game/datamethods/characters/_Character')} */ (char);
	}

	/** @type {import('../GameObjects').UnitSpawner | undefined} */
	spawner;

	/**
	 * @param {import('../GameObjects').UnitOptions} options 
	 */
	constructor(options) {
		options.spawnPosition = options.spawnPosition || options.spawner?.position;
		super(options);
		this.options = options;
		this.spawner = options.spawner;

		this.character = options.character;
		this.info = options.info || {};

		this.packets = new PUnit(this);
		this.buffs = new Buffs(this);
		this.progress = new Progress(this);
		this.rewards = new Rewards(this);
		this.stats = new Stats(this, options.stats || this.character.stats);
		this.team = new Team(this, options.team, options.num);

		UnitList.append(this);
		console.debug(Date.now(), 'Created Unit', this.constructor.name, this.netId);
		console.log('UnitList.unitCount', UnitList.unitCount);
		//console.log(UnitList.units);

		this.update();
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
	 * @param {number[] | number} teams (RED/BLUE/NEUTRAL/ALL)
	 * @returns {Unit[]}
	 */
	static filterByTeam(targets, teams = Team.TEAM_MAX) {
		teams = typeof teams == 'number' ? [teams] : teams;

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
		return this.measure[distanceCalcPoint].filterByRange(this.getAllyUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 * @param {number} range 
	 * @returns 
	 */
	getEnemyUnitsInRange(range, distanceCalcPoint = 'CENTER_TO_CENTER') {
		return this.measure[distanceCalcPoint].filterByRange(this.getEnemyUnits(), range);
	}

}


module.exports = Unit;
