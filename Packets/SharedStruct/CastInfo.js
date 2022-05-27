
var Vector3 = require('../SharedStruct/Vector3');


var target = {
	unit: 'uint32',
	hitResult: 'uint8',
};
module.exports = {
	size: 'uint16',
	spellHash: 'uint32',
	spellCastNetId: 'uint32',
	spellLevel: 'uint8',
	AttackSpeedModifier: 'float',
	CasterNetId: 'uint32',
	SpellChainOwnerNetId: 'uint32',
	PackageHash: 'uint32',
	MissileNetId: 'uint32',
	targetPosition: Vector3,
	targetPositionEnd: Vector3,

	targetCount: 'uint8',
	target: [target, 'targetCount'],
	
	DesignerCastTime: 'float',
	ExtraCastTime: 'float',
	DesignerTotalTime: 'float',
	// if DesignerCastTime == -1 then Cooldown is different
	Cooldown: 'float',
	StartCastTime: 'float',

	bitfield: ['bitfield', {
		IsAutoAttack: 1,
		IsSecondAutoAttack: 2,
		IsForceCastingOrChannel: 4,
		IsOverrideCastPosition: 8,
		IsClickCasted: 16,
	}],

	SpellSlot: 'uint8',
	manaCost: 'float',
	SpellCastLaunchPosition: Vector3,
	AmmoUsed: 'int32',
	AmmoRechargeTime: 'float',
};
