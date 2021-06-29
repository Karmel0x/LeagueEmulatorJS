var Vector3 = require('../SharedStruct/Vector3');

module.exports = {
    TargetNetID: 'uint32',
    ExtraTime: 'uint8',//(ExtraTime - 128) / 100.0f
    MissileNextID: 'uint32',
    AttackSlot: 'uint8',
    TargetPosition: Vector3,
};
