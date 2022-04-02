var ConstantsUnit = require('../../../Constants/Unit');
//const unitTypes = require('../../../Constants/unitTypes');
const teamIds = require('../../../Constants/teamIds');

//var Types = require('../../Constants/Types');
//const Packets = require('../../Core/Packets');
const {createPacket, sendPacket} = require('../../../Core/PacketUtilities');
const { Vector2 } = require('three');
const { appendGlobal, removeGlobal } = require('../global.Units');

var Stats = {
	Unit: require('./Stats'),
	Player: require('../Player/Stats'),
	Turret: require('../Turret/Stats'),
};
var Death = {
	Unit: require('./Death'),
	Player: require('../Player/Death'),
	Minion: require('../Minion/Death'),
};
var Battle = {
	Unit: require('./Battle'),
	Player: require('../Player/Battle'),
	Turret: require('../Turret/Battle'),
	Inhibitor: require('../Inhibitor/Battle'),
	Nexus: require('../Nexus/Battle'),
};
var PacketConstructors = {
	Unit: require('./PacketConstructors'),
	Player: require('../Player/PacketConstructors'),
};

const Inventory = require('./Controllers/Inventory');
const BuffController = require('./Controllers/BuffController');
const PacketController = require('./Controllers/PacketController');


class Unit {
	visibleForEnemy = false;
	visibleForEnemy2 = false;
	visibleForTeam = false;
	visibleForTeam2 = true;

	collisionRadius = 48;
	callbacks = {
		move: {},
		collision: {},
	};
	Movement = {};
	spawnPosition = new Vector2(0, 0);
	get Position(){
		return this.Movement?.Waypoints?.[0] || this.spawnPosition;
	}
	
	constructor(team, num = 0, character = '', config = {}){
		Object.assign(this, config);
		this.netId = this.netId || ++global.lastNetId;

		this.info = this.info || {};
		this.info.type = this.info.type || this.constructor.name;
		this.info.team = this.info.team || team;
		this.info.num = this.info.num || num;
		this.info.spawnNum = this.info.spawnNum || this.info.num || num;
		
		this.stats = new (Stats[this.info.type] || Stats.Unit)(this, ConstantsUnit[this.info.type]?.stats || {});
		this.death = new (Death[this.info.type] || Death.Unit)(this);
		this.battle = new (Battle[this.info.type] || Battle.Unit)(this);
		this.PacketConstructors = new (PacketConstructors[this.info.type] || PacketConstructors.Unit)(this);
		this.inventory = new Inventory(this);
		this.buffController = new BuffController(this);
		this.packetController = new PacketController(this);

		appendGlobal(this);
		console.debug(Date.now(), 'Created Unit', this.constructor.name, this.netId);
		console.log('global.unitCount', global.unitCount);
		//console.log(global.units);

		this.update();
	}
	destructor(){
	//	removeGlobal(this);
	}
	initialized(){
		this.spawn();
		this.loop();
	}
	spawn(){
		this.respawn();
	}
	async loop(){

	}

	//Waypoints = [new Vector2(0, 0)];
	get position(){
		return this.Position;
	}
	distanceTo(target){
		return this.position.distanceTo(target.position);
	}
	moveTime = 0;
	ACTION = 0;
	attack_TargetNetID(TargetNetID, MovementData = []){
		if(!global.unitsNetId[TargetNetID])
			return console.log('global.Units[netId] does not contain', TargetNetID);

		this.attackController?.attack(global.unitsNetId[TargetNetID], MovementData);
	}
	isDead(){
		return this.battle.died;
	}
	isAbleForMoving(){
		if(!this.Movement)
			return false;

		if(this.isDead())
			return false;

		return true;
	}
	isAbleForAttacking(){
		if(!this.attackController)
			return false;

		if(this.isDead())
			return false;

		return true;
	}
	// some static position functions ==========================

	static filterUnitsInTeam(units, team = 'ALL'){
		if(team === 'ALL')
			return units;

		return units.filter(unit => unit.info.team === team);
	}
	static filterUnitsInRange(units, position, range){
		return units.filter(unit => unit.Position.distanceTo(position) <= range);
	}
	static filterUnitsByType(units, types){
		return units.filter(unit => types.includes(unit.info.type));
	}
	static sortUnitsByType(units, types){
		units.sort((a, b) => {
			return types.indexOf(a.info.type) - types.indexOf(b.info.type);
		});
	}
	static sortUnitsByDistance(units, position){
		units.sort((a, b) => {
			return a.Position.distanceTo(position) - b.Position.distanceTo(position);
		});
	}
	static filterNearestUnit(units, position){
		Unit.sortUnitsByDistance(units, position);
		return units[0] || null;
	}
	//static filterNearestUnitInRange(units, position, range){
	//	var nearestUnit = Unit.filterNearestUnit(units, position);
	//	if(!nearestUnit || nearestUnit.Position.distanceTo(position) > range)
	//		return null;
	//	return nearestUnit;
	//}
	//static getUnitsInRange(position, range, team = 'ALL'){
	//	var units = global.getUnitsF(team);
	//	var unitsInRange = Unit.filterUnitsInRange(units, position, range);
	//	return unitsInRange;
	//}
	//static getUnitsInRangeSortedByDistance(position, range, team = 'ALL'){
	//	var unitsInRange = Unit.getUnitsInRange(position, range, team);
	//	sortUnitsByDistance(unitsInRange, position);
	//	return unitsInRange;
	//}
	//static getNearestUnit(position, maxRange = 25000, team = 'ALL'){
	//	var unitsInRange = Unit.getUnitsInRange(position, maxRange, team);
	//	return Unit.filterNearestUnit(unitsInRange, position);
	//}

	// ==========================================================

	// some friendly functions =========================

	getTeam(){
		return 'ALL';
	}
	getAllyTeam(){
		return this.info.team;
	}
	static getEnemyTeam(team){
		const oppositeTeam = {'BLUE': 'RED', 'RED': 'BLUE'};
		return oppositeTeam[team] || 'NEUTRAL';
	}
	getEnemyTeam(){
		return Unit.getEnemyTeam(this.info.team);
	}

	removeThisFromArray(array){
		var index = array.indexOf(this);
		if(index === -1)
			return;

		array.splice(index, 1);
	}

	getUnits(team = 'ALL'){
		return global.getUnits(team);
	}
	getAllyUnits(){
		return this.getUnits(this.getAllyTeam());
	}
	getEnemyUnits(){
		return this.getUnits(this.getOppositeTeam());
	}

	getOtherUnits(team = 'ALL'){
		var units = this.getUnits(team);
		this.removeThisFromArray(units);
		return units;
	}
	getOtherAllyUnits(){
		return this.getOtherUnits(this.getAllyTeam());
	}
	getOtherEnemyUnits(){
		return this.getOtherUnits(this.getOppositeTeam());
	}

	// get units in range of this unit
	getUnitsInRange(range = this.stats.Range.Total, team = 'ALL'){
		var units = this.getOtherUnits(team);
		return Unit.filterUnitsInRange(units, this.position, range);
	}
	getAllyUnitsInRange(range = this.stats.Range.Total){
		return this.getUnitsInRange(range, this.getAllyTeam());
	}
	getEnemyUnitsInRange(range = this.stats.Range.Total){
		return this.getUnitsInRange(range, this.getEnemyTeam());
	}

	// get nearest unit to this unit
	getNearestUnit(maxRange = 25000, team = 'ALL'){
		var unitsInRange = this.getUnitsInRange(maxRange, team);
		return Unit.filterNearestUnit(unitsInRange, this.position);
	}
	getNearestAllyUnit(maxRange = 25000){
		return this.getNearestUnit(maxRange, this.getAllyTeam());
	}
	getNearestEnemyUnit(maxRange = 25000){
		return this.getNearestUnit(maxRange, this.getEnemyTeam());
	}

	inRange(unit, range = this.stats.Range.Total){
		return unit.Position.distanceTo(this.position) <= range;
	}

	// ==================================================


	autoAttackToggle = true;
	acquisitionRange = 400;
	autoAttack(){
		var oppositeTeamArray = global.getUnitsF(this.getOppositeTeam(), 'ALL');
		var target = Unit.getNearestUnit(this.position, oppositeTeamArray, this.acquisitionRange);
		if(this.constructor.name == 'Player')
			console.log('autoAttack target', target);
		if(!target)
			return;

		console.log('autoAttack s', this.netId, target.netId);
		this.attackController?.attack(target);
	}
	async update(){
		for(;;){
			await global.Utilities.wait(1000);

			if(!global.Game.started)
				continue;

			//if(!this.battle.died){
			//	if(this.attackable && this.autoAttackToggle)
			//		this.autoAttack();
			//}
		}
	}

	respawn(){
		this.battle.died = false;

		this.stats.CurrentHealth = this.stats.HealthPoints.Total;
		this.stats.CurrentMana = this.stats.ManaPoints.Total;
		
		//var pos = ConstantsUnit[this.info.type]?.team?.[this.info.team]?.spawn?.[this.info.spawnNum]
		//	|| ConstantsUnit[this.info.type]?.team?.[this.info.team]?.respawn || {x: 0, y: 0};
		//this.spawnPosition = new Vector2(pos.x, pos.y);

		if(this.Movement?.Waypoints)
			this.Movement.Waypoints = [this.spawnPosition];
		
		this.SET_HEALTH();
		
		global.Teams[this.info.team].vision(this, true);
	}
	SET_HEALTH(){
		this.PacketConstructors.SET_HEALTH();
	}
	UPDATE_MODEL(character){
		this.PacketConstructors.UPDATE_MODEL(character);
	}
	SET_ANIMATION(animPairs){
		this.PacketConstructors.SET_ANIMATION(animPairs);
	}
}


module.exports = Unit;
