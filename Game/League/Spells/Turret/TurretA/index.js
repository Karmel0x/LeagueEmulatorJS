const _Spellchain = require("../../_Spellchain");
const _Turret = require("../_Turret");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const _Basicattack = require("../../_Basicattack");
const _Basicattackchain = require("../../_Basicattackchain");
const _Spell = require("../../_Spell");


class ChaosTurretWormBasicAttack extends _Basicattack {


	constructor(spellChain, missile){
		super(spellChain, missile);
		
	}
	customCastInfo(CastInfo){
		CastInfo.SpellHash = _Turret.hashes.spellHash[this.constructor.name];
		CastInfo.bitfield = {
			IsAutoAttack: true,
			IsClickCasted: true,
		};
		CastInfo._netId = CastInfo.CasterNetId;
		CastInfo.AmmoUsed = 0;
		CastInfo.DesignerCastTime = 0.06;
		CastInfo.DesignerTotalTime = 0.06;
	}
	//turretAttackProjectile(){
	//	var CastInfo = {
	//		SpellHash: 163135275,
	//		SpellNetId: 1073743439,
	//		SpellLevel: 0,
	//		AttackSpeedModifier: 1,
	//		CasterNetId: this.netId,
	//		SpellChainOwnerNetId: this.netId,
	//		PackageHash: 465603924,
	//		MissileNetId: this.missile.netId,
	//		TargetPosition: this.missile.target.position,
	//		TargetPositionEnd: this.missile.target.position,
	//		DesignerCastTime: 0.25,
	//		DesignerTotalTime: 0.25,
	//		ManaCost: 0,
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
	//	this.spellChain.spawnProjectileAns(CastInfo, 465603924, {speed: 1200, TimedSpeedDeltaTime: 2139095040});
	//	//console.log(1, [CastInfo]);
	//	//console.log(1, CastInfo.target);
	//}
	shot(){
		//this.turretAttackProjectile();
	}
}

module.exports = class TurretA extends _Basicattackchain {
	castRange = 1200;
	windupPercent = 22;


	async castSpellchain(packet){
		var missile = this.attackProcess(packet.target);

		this.spellsChained[0] = ChaosTurretWormBasicAttack.cast(this, missile, () => {
			this.spawnProjectileAns(this.spellsChained[0].CastInfo, this.parent.PackageHash);
			console.log(2, [this.spellsChained[0].CastInfo, missile]);
		});


	}
};
