
const { createPacket } = require("../../../Core/PacketUtilities");
const { HashString } = require("../../../Functions/HashString");
const PositionHelper = require("../../../Functions/PositionHelper");
const SpellCast = require("./SpellCast");

module.exports = class _Spell {

	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?
	CastInfo = {};
	childSpells = [];
	isProjectile = false;
	castRange = 25000;
	movingSpell = false;

	
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
		return this.owner.inRangeOrMove(this.castRange, spellData.target || spellData.packet, () => this.cast(spellData));
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
			this.spawnProjectileAns(spellData.spellCast.CastInfo, 0, this.projectileData);
		else
			this.castSpellAns(spellData.spellCast.CastInfo);

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
		spellData.target = typeof spellData.target === 'number' ? global.getUnitByNetId(spellData.target) : spellData.target;
		spellData.movingSpell = this.movingSpell;

		if(!this.preCast(spellData))
			return;

		spellData.spellCast = new SpellCast({spellData});
		this.onCast(spellData);
		this.afterCast(spellData)
	}
	

	castSpellAns(CastInfo, PackageHash){
		var owner = this.owner;

		var CAST_SPELL_ANS = createPacket('CAST_SPELL_ANS', 'S2C');
		CAST_SPELL_ANS.netId = owner.netId;
		CAST_SPELL_ANS.CasterPositionSyncID = owner.PositionSyncID;
		CAST_SPELL_ANS.CastInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
			spellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetId: owner.netId,
			SpellChainOwnerNetId: owner.netId,
			PackageHash: PackageHash,
			MissileNetId: 1073743440,
			targetPosition: {},
			targetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			manaCost: 28,
			SpellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(CAST_SPELL_ANS.CastInfo, CastInfo);

		owner.sendTo_vision(CAST_SPELL_ANS);
		console.log(CAST_SPELL_ANS);
	}
	spawnProjectileAns(CastInfo, PackageHash = 0, projectile = {speed: 1200}){//todo
		var owner = this.owner;

		var SPAWN_PROJECTILE = createPacket('SPAWN_PROJECTILE', 'S2C');
		SPAWN_PROJECTILE.CastInfo = {
			spellHash: 0,
			spellCastNetId: 1073743439,
			spellLevel: 1,
			AttackSpeedModifier: 1,
			CasterNetId: owner.netId,
			SpellChainOwnerNetId: owner.netId,
			PackageHash: PackageHash,
			MissileNetId: 1073743440,
			targetPosition: {},
			targetPositionEnd: {},
			DesignerCastTime: 0.25,
			DesignerTotalTime: 0.25,
			manaCost: 28,
			SpellCastLaunchPosition: {
				x: owner.position.x,
				y: owner.position.y,
				z: 0,
			},
			AmmoUsed: 1,
			target: [{
				unit: 0,
				hitResult: 0,
			}],
		};
		Object.assign(SPAWN_PROJECTILE.CastInfo, CastInfo);
		SPAWN_PROJECTILE.netId = SPAWN_PROJECTILE.CastInfo._netId ?? SPAWN_PROJECTILE.CastInfo.MissileNetId;// ??
		SPAWN_PROJECTILE.position = SPAWN_PROJECTILE.position || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.CasterPosition = SPAWN_PROJECTILE.CasterPosition || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		//SPAWN_PROJECTILE.Direction = {
		//    "x": 0.36772018671035767,
		//    "z": 0,
		//    "y": 0.9299365282058716
		//}
		//SPAWN_PROJECTILE.Velocity = {
		//    "x": 441.2642517089844,
		//    "z": -109.0909194946289,
		//    "y": 1115.9239501953125
		//};
		SPAWN_PROJECTILE.StartPoint = SPAWN_PROJECTILE.StartPoint || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.EndPoint = SPAWN_PROJECTILE.EndPoint || SPAWN_PROJECTILE.CastInfo.targetPosition;
		SPAWN_PROJECTILE.UnitPosition = SPAWN_PROJECTILE.UnitPosition || SPAWN_PROJECTILE.CastInfo.SpellCastLaunchPosition;
		SPAWN_PROJECTILE.Speed = projectile.speed;

		owner.sendTo_vision(SPAWN_PROJECTILE);
		//console.log(SPAWN_PROJECTILE);
	}
};
