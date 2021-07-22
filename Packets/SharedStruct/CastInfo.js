
var Vector3 = require('../SharedStruct/Vector3');


var target = {
    unit: 'uint32',
    hitResult: 'uint8',
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
    target: [target, 1],//'targetCount'
    
    DesignerCastTime: 'float',
    ExtraCastTime: 'float',
    DesignerTotalTime: 'float',
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
    ManaCost: 'float',
    SpellCastLaunchPosition: Vector3,
    AmmoUsed: 'int32',
    AmmoRechargeTime: 'float',
};
