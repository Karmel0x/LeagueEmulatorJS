
const { Vector2 } = require("three");
const { HashString } = require("../../../Functions/HashString");
const PositionHelper = require("../../../Functions/PositionHelper");
const SpellCast = require("./SpellCast");

module.exports = class _Spell {

	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?
	castInfo = {};
	childSpells = [];
	isProjectile = false;
	castRange = 25000;
	movingSpell = false;

	_lastCastTime = 0;
	_cooldownTime = 0;

	distanceCalc = 'CENTER_TO_EDGE';
	
	
	constructor(options){
		this.owner = options.owner || null;

		this.parentSpell = options.parentSpell || null;
		this.spellHash = HashString(this.constructor.name);
	}


	/**
	 * @abstract
	 * @param {Object} spellData
	 */
	preCast(spellData){
		var target = spellData.target || spellData.packet;

		var range = this.castRange;
		var filters = this.owner.Filters(this.distanceCalc);
		var rangeSum = filters.getRangeSum(target, range);
		var isInRange = filters.isInRangeFlat(target, rangeSum);
		
		if(!isInRange)
			this.owner.moveWithCallback(target, () => this.cast(spellData), rangeSum);

		return isInRange;
	}
	
	/**
	 * @abstract
	 * @param {Object} spellData
	 */
	onCast(spellData){
		this.owner.emit('spellCasting', spellData);

	}

	/**
	 * @abstract
	 * @param {Object} spellData
	 */
	afterCast(spellData){
		if(this.isProjectile)
			this.spawnProjectileAns(spellData.spellCast.castInfo, 0, this.projectileData);
		else
			this.castSpellAns(spellData.spellCast.castInfo);

		//console.log('afterCast', spellData);
		if(this.childSpells.length > 0){
			this.childSpells.forEach(childSpell => childSpell.cast(spellData));
			return;
		}
		this.owner.emit('spellCastingEnd', spellData);
	}


	/**
	 * 
	 * @param {Object} spellData
	 * @param {Object} spellData.packet
	 */
	cast(spellData){
		spellData.spell = this;
		spellData.target = spellData.target || null;
		spellData.target = typeof spellData.target == 'number' ? global.getUnitByNetId(spellData.target) : spellData.target;
		spellData.movingSpell = this.movingSpell;

		if(!this.preCast(spellData))
			return;

		if(this.waitingCooldown())
			return false;

		this._lastCastTime = performance.now();
		this._cooldownTime = this._lastCastTime + (this.cooldown * 1000);

		spellData.spellCast = new SpellCast({spellData});
		this.onCast(spellData);
		this.afterCast(spellData)
	}
	

	castSpellAns(castInfo, packageHash){
		var owner = this.owner;

		var CastSpellAns = global.Network.createPacket('CastSpellAns', 'S2C');
		CastSpellAns.netId = owner.netId;
		CastSpellAns.casterPositionSyncID = owner.positionSyncID;
		CastSpellAns.castInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
			spellLevel: 1,
			attackSpeedModifier: 1,
			casterNetId: owner.netId,
			spellChainOwnerNetId: owner.netId,
			packageHash: packageHash,
			missileNetId: 1073743440,
			targetPosition: {},
			targetPositionEnd: {},
			designerCastTime: 0.25,
			designerTotalTime: 0.25,
			manaCost: 28,
			spellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			ammoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(CastSpellAns.castInfo, castInfo);

		owner.sendTo_vision(CastSpellAns);
		//console.log(CastSpellAns);
	}
	spawnProjectileAns(castInfo, packageHash = 0, projectile = {speed: 1200}){//todo
		var owner = this.owner;

		var MissileReplication = global.Network.createPacket('MissileReplication', 'S2C');
		MissileReplication.castInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
			spellLevel: 1,
			attackSpeedModifier: 1,
			casterNetId: owner.netId,
			spellChainOwnerNetId: owner.netId,
			packageHash: packageHash,
			missileNetId: 1073743440,
			targetPosition: {},
			targetPositionEnd: {},
			designerCastTime: 0.25,
			designerTotalTime: 0.25,
			manaCost: 28,
			spellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			ammoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(MissileReplication.castInfo, castInfo);
		MissileReplication.netId = MissileReplication.castInfo._netId ?? MissileReplication.castInfo.missileNetId;// ??
		MissileReplication.position = MissileReplication.position || MissileReplication.castInfo.spellCastLaunchPosition;
		MissileReplication.casterPosition = MissileReplication.casterPosition || MissileReplication.castInfo.spellCastLaunchPosition;
		//MissileReplication.direction = {
		//    "x": 0.36772018671035767,
		//    "z": 0,
		//    "y": 0.9299365282058716
		//}
		//MissileReplication.velocity = {
		//    "x": 441.2642517089844,
		//    "z": -109.0909194946289,
		//    "y": 1115.9239501953125
		//};
		MissileReplication.startPoint = MissileReplication.startPoint || MissileReplication.castInfo.spellCastLaunchPosition;
		MissileReplication.endPoint = MissileReplication.endPoint || MissileReplication.castInfo.targetPosition;
		MissileReplication.unitPosition = MissileReplication.unitPosition || MissileReplication.castInfo.spellCastLaunchPosition;
		MissileReplication.speed = projectile.speed;

		owner.sendTo_vision(MissileReplication);
		//console.log(MissileReplication);
	}

	waitingCooldown(){
		if(this._cooldownTime > performance.now())
			return true;

		return false;
	}
};
