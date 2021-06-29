
var Vector3 = require('../SharedStruct/Vector3');


var target = {
    unit: 'uint32',
    hitResult: 'uint16',
};
module.exports = {
    size: 'uint16',
    SpellHash: 'uint32',
    SpellNetID: 'uint32',
    SpellLevel: 'uint8',
    AttackSpeedModifier: 'float',
    CasterNetID: 'uint32',
    SpellChainOwnerNetID: 'uint32',
    PackageHash: 'uint32',
    MissileNetID: 'uint32',
    TargetPosition: Vector3,
    TargetPositionEnd: Vector3,

    targetCount: 'uint8',
    target: [target, 'targetCount'],
    
    DesignerCastTime: 'float',
    ExtraCastTime: 'float',
    DesignerTotalTime: 'float',
    Cooldown: 'float',
    StartCastTime: 'float',

    bitfield: 'uint8',
    //data.IsAutoAttack = (bitfield & 1) != 0;
    //data.IsSecondAutoAttack = (bitfield & 2) != 0;
    //data.IsForceCastingOrChannel = (bitfield & 4) != 0;
    //data.IsOverrideCastPosition = (bitfield & 8) != 0;
    //data.IsClickCasted = (bitfield & 16) != 0;

	SpellSlot: 'uint8',
    ManaCost: 'float',
    SpellCastLaunchPosition: Vector3,
    AmmoUsed: 'int32',
    AmmoRechargeTime: 'float',
};
