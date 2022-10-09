
const teamIds = require('../../Constants/teamIds');

const { Vector2 } = require('three');
const { appendGlobal, removeGlobal } = require('./global.Units');

const slotId = require('../../Constants/slotId');
const loadingStages = require('../../Constants/loadingStages');

const ExtendWTraits = require('../../Core/ExtendWTraits');
const GameObject = require('../GameObject');
const IDieReward = require('../Traits/IDieReward');
const IExpOwner = require('../Traits/IExpOwner');
const IStatOwner = require('../Traits/IStatOwner');
const IHasTeam = require('../Traits/IHasTeam');
const IPUnit = require('./PacketTraits/IPUnit');
const IBuffable = require('../Traits/IBuffable');
const ISpellable = require('../Traits/ISpellable');
const ICharacter = require('../Traits/ICharacter');


class Unit extends ExtendWTraits(GameObject, IHasTeam, ISpellable, ICharacter, IDieReward, IExpOwner, IStatOwner, IPUnit, IBuffable) {
	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	callbacks = {
		move: {},
		collision: {},
	};
	
	sendTo_self(packet, minStage = loadingStages.IN_GAME){
		this.sendPacket?.(packet, minStage);
	}
	sendTo_everyone(packet, minStage = loadingStages.IN_GAME){
		global.Teams.ALL.sendPacket(packet, minStage);
	}
	sendTo_vision(packet, minStage = loadingStages.IN_GAME){
		global.Teams.ALL.sendPacket_withVision(packet, minStage);
	}
	sendTo_team(packet, minStage = loadingStages.IN_GAME){
		global.Teams[this.teamName].sendPacket(packet, minStage);
	}
	sendTo_loading(packet){
		//global.Teams.ALL.sendPacket(packet, loadingStages.LOADING);
		global.Teams.ALL.sendPacket(packet, loadingStages.NOT_CONNECTED);
	}

	/**
	 * @param {Object} options
	 * // GameObject
	 * @param {Number} [options.netId]
	 * @param {Vector2} options.spawnPosition|options.position
	 * // ICharacter
	 * @param {String|_Character} options.character
	 * // IHasTeam
	 * @param {Number|String} options.team
	 * @param {Number} [options.num]
	 * // IStatOwner
	 * @param {Object} options.stats
	 * // IMovable
	 * @param {Number} options.stats.moveSpeed
	 * // this.constructor
	 * @param {Object} [options.info]
	 */
	constructor(options){
		super(options);

		this.info = options.info || {};

		appendGlobal(this);
		console.debug(Date.now(), 'Created Unit', this.constructor.name, this.netId);
		console.log('global.unitCount', global.unitCount);
		//console.log(global.units);

		this.update();
	}


	destructor(){
		// todo
		//removeGlobal(this);
	}
	initialized(){
		console.log('initialized', this.constructor.name, this.netId);
		//this.levelUp();
		this.spawn();
		this.loop();
	}
	spawn(){
		this.respawn();
	}
	async loop(){

	}

	moveTime = 0;
	ACTION = 0;
	/**
	 * Returns if unit is dead
	 * @returns {Boolean}
	 */
	isDead(){
		return this.died;
	}

	canBeAttacked(){
		return false;
	}

	/**
	 * Returns if unit is able to move
	 * @returns {Boolean}
	 */
	isAbleForMoving(){
		if(!this.Movement)
			return false;

		if(this.isDead())
			return false;

		return true;
	}
	/**
	 * Returns if unit is able to attack
	 * @returns {Boolean}
	 */
	isAbleForAttacking(){
		if(!this.spellSlots[slotId.A])
			return false;

		if(this.isDead())
			return false;

		return true;
	}


	async update(){
		for(;;){
			await Promise.wait(1000);

			if(!global.Game.started)
				continue;

		}
	}

	respawn(){
		this.emit('respawn');
		this.died = false;

		this.health.current = this.health.total;
		this.mana.current = this.mana.total;
		
		if(this.waypoints)
			this.waypoints = [this.spawnPosition];
		
		this.OnEnterLocalVisibilityClient();
		
		global.Teams[this.teamName].vision(this, true);
	}

	// ==================================================

	/**
	 * Filter units by team
	 * @param {Array.<Unit>} targets
	 * @param {Array.<String>|String} teams (RED/BLUE/NEUTRAL/ALL)
	 * @returns {Array.<Unit>}
	 */
	static filterByTeam(targets, teams = 'ALL'){
		teams = typeof teams == 'string' ? [teams] : teams;

		if(teams.includes('ALL'))
			return targets;

		return targets.filter(target => teams.includes(target.teamName));
	}


	/**
	 * Remove this unit from array
	 * @param {Array.<Unit>} array
	 */
	removeThisFromArray(array){
		var index = array.indexOf(this);
		if(index === -1)
			return;

		array.splice(index, 1);
	}

	/**
	 * Get all units
	 * @returns {Array.<Unit>}
	 */
	getUnits(team = 'ALL'){
		return global.getUnits(team);
	}
	/**
	 * Get ally units to this unit
	 * @returns {Array.<Unit>}
	 */
	getAllyUnits(){
		return this.getUnits(this.getAllyTeam());
	}
	/**
	 * Get enemy units to this unit
	 * @returns {Array.<Unit>}
	 */
	getEnemyUnits(){
		return this.getUnits(this.getEnemyTeam());
	}

	/**
	 * Get all units except this
	 * @returns {Array.<Unit>}
	 */
	getOtherUnits(team = 'ALL'){
		var units = this.getUnits(team);
		this.removeThisFromArray(units);
		return units;
	}
	/**
	 * Get ally units except this
	 * @returns {Array.<Unit>}
	 */
	getOtherAllyUnits(){
		return this.getOtherUnits(this.getAllyTeam());
	}
	/**
	 * Get enemy units except this
	 * @returns {Array.<Unit>}
	 */
	getOtherEnemyUnits(){
		return this.getOtherUnits(this.getEnemyTeam());
	}

	/**
	 * Get ally units in range of this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getAllyUnitsInRange(range = this.range.total, distanceCalcPoint = 'CENTER_TO_CENTER'){
		return this.Filters(distanceCalcPoint).filterByRange(this.getAllyTeamUnits(), range);
	}

	/**
	 * Get enemy units in range of this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getEnemyUnitsInRange(range = this.range.total){
		return this.Filters().filterByRange(this.getOtherEnemyUnits(), range);
	}

}


module.exports = Unit;
