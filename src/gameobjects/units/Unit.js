
const slotId = require('../../constants/slotId');
const loadingStages = require('../../constants/loadingStages');

const ExtendWTraits = require('../../core/ExtendWTraits');
const GameObject = require('../GameObject');
const IDieReward = require('../traits/IDieReward');
const IExpOwner = require('../traits/IExpOwner');
const IStatOwner = require('../traits/IStatOwner');
const IHasTeam = require('../traits/IHasTeam');
const IPUnit = require('./packettraits/IPUnit');
const IBuffable = require('../traits/IBuffable');
const ISpellable = require('../traits/ISpellable');
const ICharacter = require('../traits/ICharacter');
const UnitList = require('../../app/UnitList');
const Server = require('../../app/Server');

// @todo remove mixins? ts doesn't support it
class Unit extends ExtendWTraits(GameObject, IHasTeam, ISpellable, ICharacter, IDieReward, IExpOwner, IStatOwner, IPUnit, IBuffable) {

	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	callbacks = {
		move: {},
		collision: {},
	};

	sendTo_self(packet, minStage = loadingStages.IN_GAME) {
		this.sendPacket?.(packet, minStage);
	}
	sendTo_everyone(packet, minStage = loadingStages.IN_GAME) {
		Server.teams.ALL.sendPacket(packet, minStage);
	}
	sendTo_vision(packet, minStage = loadingStages.IN_GAME) {
		Server.teams.ALL.sendPacket_withVision(packet, minStage);
	}
	sendTo_team(packet, minStage = loadingStages.IN_GAME) {
		Server.teams[this.teamName].sendPacket(packet, minStage);
	}
	sendTo_loading(packet) {
		//Server.teams.ALL.sendPacket(packet, loadingStages.LOADING);
		Server.teams.ALL.sendPacket(packet, loadingStages.NOT_CONNECTED);
	}

	/**
	 * @param {import('../GameObjects').UnitOptions} options 
	 */
	constructor(options) {
		super(options);

		this.info = options.info || {};

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
		//this.levelUp();
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
		if (!this.Movement)
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
		if (!this.spellSlots[slotId.A])
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
		this.died = false;

		this.health.current = this.health.total;
		this.mana.current = this.mana.total;

		if (this.position)
			this.position.copy(this.spawnPosition);

		this.OnEnterLocalVisibilityClient();

		Server.teams[this.teamName].vision(this, true);
	}

	// ==================================================

	/**
	 * Filter units by team
	 * @param {Unit[]} targets
	 * @param {string[] | string} teams (RED/BLUE/NEUTRAL/ALL)
	 * @returns {Unit[]}
	 */
	static filterByTeam(targets, teams = 'ALL') {
		teams = typeof teams == 'string' ? [teams] : teams;

		if (teams.includes('ALL'))
			return targets;

		return targets.filter(target => teams.includes(target.teamName));
	}


	/**
	 * Remove this unit from array
	 * @param {Unit[]} array
	 */
	removeThisFromArray(array) {
		var index = array.indexOf(this);
		if (index === -1)
			return;

		array.splice(index, 1);
	}

	/**
	 * Get all units
	 * @returns {Unit[]}
	 */
	getUnits(teamName = 'ALL') {
		return UnitList.getUnits(teamName);
	}
	/**
	 * Get ally units to this unit
	 * @returns {Unit[]}
	 */
	getAllyUnits() {
		var thisTeamId = this.teamId;
		return UnitList.units.filter(unit => unit.teamId == thisTeamId);
		//return this.getUnits(this.getAllyTeam());
	}
	/**
	 * Get enemy units to this unit
	 * @returns {Unit[]}
	 */
	getEnemyUnits() {
		var thisTeamId = this.teamId;
		return UnitList.units.filter(unit => unit.teamId != thisTeamId);
		//return this.getUnits(this.getEnemyTeam());
	}

	/**
	 * Get all units except this
	 * @returns {Unit[]}
	 */
	getOtherUnits(team = 'ALL') {
		var units = this.getUnits(team);
		this.removeThisFromArray(units);
		return units;
	}
	/**
	 * Get ally units except this
	 * @returns {Unit[]}
	 */
	getOtherAllyUnits() {
		return this.getOtherUnits(this.getAllyTeam());
	}

	/**
	 * Get ally units in range of this unit
	 * @param {number} range 
	 * @returns 
	 */
	getAllyUnitsInRange(range = this.range.total, distanceCalcPoint = 'CENTER_TO_CENTER') {
		return this.Filters(distanceCalcPoint).filterByRange(this.getAllyTeamUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 * @param {number} range 
	 * @returns 
	 */
	getEnemyUnitsInRange(range = this.range.total) {
		return this.Filters().filterByRange(this.getEnemyUnits(), range);
	}

}


module.exports = Unit;
