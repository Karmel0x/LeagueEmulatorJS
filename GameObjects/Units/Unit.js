
const teamIds = require('../../Constants/teamIds');

const { Vector2 } = require('three');
const { appendGlobal, removeGlobal } = require('./global.Units');

const slotId = require('../../Constants/slotId');
const loadingStages = require('../../Constants/loadingStages');

const BaseInterface = require('../../Core/BaseInterface');
const GameObject = require('../GameObject');
const IDieReward = require('../Interfaces/IDieReward');
const IExpOwner = require('../Interfaces/IExpOwner');
const IStatOwner = require('../Interfaces/IStatOwner');
const IHasTeam = require('../Interfaces/IHasTeam');
const IPUnit = require('./PacketInterfaces/IPUnit');
const IBuffable = require('../Interfaces/IBuffable');
const ISpellable = require('../Interfaces/ISpellable');
const ICharacter = require('../Interfaces/ICharacter');


class Unit extends BaseInterface(GameObject, IHasTeam, ISpellable, ICharacter, IDieReward, IExpOwner, IStatOwner, IPUnit, IBuffable) {
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
	 * @param {Number} options.netId optional
	 * @param {Vector2} options.spawnPosition or options.position
	 * // ICharacter
	 * @param {String|_Character} options.character
	 * // IHasTeam
	 * @param {Number|String} options.team
	 * @param {Number} options.num optional
	 * // IStatOwner
	 * @param {Object} options.stats
	 * // IMovable
	 * @param {Number} options.stats.moveSpeed
	 * // this.constructor
	 * @param {Object} options.info optional
	 */
	constructor(...args){
		super(...args);

		this.info = args[0].info || {};

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
	// some static position functions ==========================

	/**
	 * Filter units by team
	 * @param {Array.<Unit>} units
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns {Array.<Unit>}
	 */
	static filterUnitsInTeam(units, team = 'ALL'){
		if(team === 'ALL')
			return units;

		return units.filter(unit => unit.teamName === team);
	}
	/**
	 * Filter units by range
	 * @param {Array.<Unit>} units
	 * @param {Vector2} position
	 * @param {Number} range
	 * @returns {Array.<Unit>}
	 */
	static filterUnitsInRange(units, position, range){
		return units.filter(unit => unit.position.distanceTo(position) <= range);
	}
	/**
	 * Filter units by Unit type
	 * @param {Array.<Unit>} units
	 * @param {*} types (Minion/Player/Turret/Inhibitor/Nexus)
	 * @returns {Array.<Unit>}
	 */
	static filterUnitsByType(units, types){
		return units.filter(unit => types.includes(unit.type));
	}
	/**
	 * Sort units by type
	 * @param {Array.<Unit>} units
	 * @param {*} types (Minion/Player/Turret/Inhibitor/Nexus)
	 */
	static sortUnitsByType(units, types){
		units.sort((a, b) => {
			return types.indexOf(a.type) - types.indexOf(b.type);
		});
	}
	/**
	 * Sort units by distance to position from closest to farthest
	 * @param {Array.<Unit>} units
	 * @param {Vector2} position
	 */
	static sortUnitsByDistance(units, position){
		units.sort((a, b) => {
			return a.position.distanceTo(position) - b.position.distanceTo(position);
		});
	}
	/**
	 * Get nearest unit to position
	 * @param {Array.<Unit>} units 
	 * @param {Vector2} position 
	 * @returns {Unit}
	 */
	static filterNearestUnit(units, position){
		this.sortUnitsByDistance(units, position);
		return units[0] || null;
	}
	//static filterNearestUnitInRange(units, position, range){
	//	var nearestUnit = this.filterNearestUnit(units, position);
	//	if(!nearestUnit || nearestUnit.position.distanceTo(position) > range)
	//		return null;
	//	return nearestUnit;
	//}
	//static getUnitsInRange(position, range, team = 'ALL'){
	//	var units = global.getUnitsF(team);
	//	var unitsInRange = this.filterUnitsInRange(units, position, range);
	//	return unitsInRange;
	//}
	//static getUnitsInRangeSortedByDistance(position, range, team = 'ALL'){
	//	var unitsInRange = this.getUnitsInRange(position, range, team);
	//	sortUnitsByDistance(unitsInRange, position);
	//	return unitsInRange;
	//}
	//static getNearestUnit(position, maxRange = 25000, team = 'ALL'){
	//	var unitsInRange = this.getUnitsInRange(position, maxRange, team);
	//	return this.filterNearestUnit(unitsInRange, position);
	//}

	// ==========================================================


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
		return this.getUnits(this.getOppositeTeam());
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
		return this.getOtherUnits(this.getOppositeTeam());
	}

	/**
	 * Get units in range of this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getUnitsInRange(range = this.range.total, team = 'ALL'){
		var units = this.getOtherUnits(team);
		return this.constructor.filterUnitsInRange(units, this.position, range);
	}
	/**
	 * Get ally units in range of this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getAllyUnitsInRange(range = this.range.total){
		return this.getUnitsInRange(range, this.getAllyTeam());
	}
	/**
	 * Get enemy units in range of this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getEnemyUnitsInRange(range = this.range.total){
		return this.getUnitsInRange(range, this.getEnemyTeam());
	}

	/**
	 * Get nearest unit to this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getNearestUnit(maxRange = 25000, team = 'ALL'){
		var unitsInRange = this.getUnitsInRange(maxRange, team);
		return this.constructor.filterNearestUnit(unitsInRange, this.position);
	}
	/**
	 * Get nearest ally unit to this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getNearestAllyUnit(maxRange = 25000){
		return this.getNearestUnit(maxRange, this.getAllyTeam());
	}
	/**
	 * Get nearest enemy unit to this unit
	 * @param {Number} range 
	 * @param {String} team (RED/BLUE/NEUTRAL/ALL)
	 * @returns 
	 */
	getNearestEnemyUnit(maxRange = 25000){
		return this.getNearestUnit(maxRange, this.getEnemyTeam());
	}

	inRange(unit, range = this.range.total){
		return unit.position.distanceTo(this.position) <= range;
	}

	// ==================================================


	autoAttackToggle = true;
	acquisitionRange = 400;
	/**
	 * 
	 * @todo move it to attack controller ?
	 */
	autoAttack(){
		var target = this.getNearestEnemyUnit(this.position, this.acquisitionRange)
		if(this.constructor.name == 'Player')//
			console.log('autoAttack target', target);//
		if(!target)
			return;

		console.log('autoAttack s', this.netId, target.netId);
		this.spellSlots[slotId.A]?.cast({target});
	}
	async update(){
		for(;;){
			await global.Utilities.wait(1000);

			if(!global.Game.started)
				continue;

			//if(!this.died){
			//	if(this.attackable && this.autoAttackToggle)
			//		this.autoAttack();
			//}
		}
	}

	respawn(){
		this.died = false;

		this.currentHealth = this.health.total;
		this.currentMana = this.mana.total;
		
		if(this.Waypoints)
			this.Waypoints = [this.spawnPosition];
		
		this.SET_HEALTH();
		
		global.Teams[this.teamName].vision(this, true);
	}

}


module.exports = Unit;
