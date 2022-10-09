
const { HashString } = require("../../../../../Functions/HashString");
const _Basicattack = require("../../../../DataMethods/Spells/_Basicattack_");


/**
 * @abstract
 */
module.exports = class _Turret_NexusBasicAttack extends _Basicattack {

	//castRange = 1200;
	windupPercent = 22;
	isProjectile = true;
	missileSpeed = 1200;

	castInfo = {
		spellHash: this.spellHash,
		bitfield: {
			isAutoAttack: true,
			isClickCasted: true,
		},
		ammoUsed: 0,
		designerCastTime: 0.06,
		designerTotalTime: 0.06,
	};
	constructor(options){
		super(options);

		this.castInfo._netId = this.owner.netId;
	}
	//turretAttackProjectile(){
	//	var castInfo = {
	//		spellHash: 163135275,
	//		spellCastNetId: 1073743439,
	//		spellLevel: 0,
	//		attackSpeedModifier: 1,
	//		casterNetId: this.netId,
	//		spellChainOwnerNetId: this.netId,
	//		packageHash: 465603924,
	//		missileNetId: this.missile.netId,
	//		targetPosition: this.missile.target.position,
	//		targetPositionEnd: this.missile.target.position,
	//		designerCastTime: 0.25,
	//		designerTotalTime: 0.25,
	//		manaCost: 0,
	//		spellCastLaunchPosition: {
	//			x: this.owner.position.x,
	//			y: this.owner.position.y,
	//			z: 0,
	//		},
	//		ammoUsed: 0,
	//		target: [{
	//			unit: this.missile.target.netId,
	//			hitResult: 0,
	//		}],
	//		spellSlot: 64,
	//		bitfield: {
	//			isAutoAttack: true,
	//			isClickCasted: true,
	//		},
	//	};
	//	castInfo._netId = castInfo.casterNetId;
	//	this.spawnProjectileAns(castInfo, 465603924, {speed: 1200, timedSpeedDeltaTime: 2139095040});
	//	//console.log(1, [castInfo]);
	//	//console.log(1, castInfo.target);
	//}

};
