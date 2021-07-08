var Vector3 = require('../SharedStruct/Vector3');

module.exports = {//BasicAttackData
    TargetNetID: 'uint32',
    ExtraTime: 'int8',//(ExtraTime - 128) / 100.0f
    MissileNextID: 'uint32',
    AttackSlot: 'int8',
    TargetPosition: Vector3,
};
