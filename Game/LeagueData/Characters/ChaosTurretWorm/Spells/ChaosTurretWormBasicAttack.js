
const { HashString } = require("../../../../../Functions/HashString");
const _Basicattack = require("../../../../DataMethods/Spells/_Basicattack");


module.exports = class ChaosTurretWormBasicAttack extends _Basicattack {

	//castRange = 1200;
	windupPercent = 22;
	isProjectile = true;
	missileSpeed = 1200;

	CastInfo = {
		spellHash: this.spellHash,
		bitfield: {
			IsAutoAttack: true,
			IsClickCasted: true,
		},
		AmmoUsed: 0,
		DesignerCastTime: 0.06,
		DesignerTotalTime: 0.06,
	};
	constructor(options){
		super(options);

		this.CastInfo._netId = this.owner.netId;
	}
	//turretAttackProjectile(){
	//	var CastInfo = {
	//		spellHash: 163135275,
	//		spellCastNetId: 1073743439,
	//		spellLevel: 0,
	//		AttackSpeedModifier: 1,
	//		CasterNetId: this.netId,
	//		SpellChainOwnerNetId: this.netId,
	//		PackageHash: 465603924,
	//		MissileNetId: this.missile.netId,
	//		targetPosition: this.missile.target.position,
	//		targetPositionEnd: this.missile.target.position,
	//		DesignerCastTime: 0.25,
	//		DesignerTotalTime: 0.25,
	//		manaCost: 0,
	//		SpellCastLaunchPosition: {
	//			x: this.owner.position.x,
	//			y: this.owner.position.y,
	//			z: 0,
	//		},
	//		AmmoUsed: 0,
	//		target: [{
	//			unit: this.missile.target.netId,
	//			hitResult: 0,
	//		}],
	//		SpellSlot: 64,
	//		bitfield: {
	//			IsAutoAttack: true,
	//			IsClickCasted: true,
	//		},
	//	};
	//	CastInfo._netId = CastInfo.CasterNetId;
	//	this.spawnProjectileAns(CastInfo, 465603924, {speed: 1200, TimedSpeedDeltaTime: 2139095040});
	//	//console.log(1, [CastInfo]);
	//	//console.log(1, CastInfo.target);
	//}

};
