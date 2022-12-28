const BasePacket = require('../BasePacket');


module.exports = class UnitApplyDamage extends BasePacket {

    static DamageResultType = {
        invulnerable: 0,
        invulnerable_no_message: 1,
        dodge: 2,
        critical: 3,
        normal: 4,
        miss: 5,
        other: 6,
    };
    static DamageType = {
        physical: 0,
        magical: 1,
        true: 2,
        mixed: 3,
    };

    static struct = {
        damageResultType: 'uint8',
        unk1: 'uint8',
        damageType: 'uint8',
        damage: 'float',
        targetNetId: 'uint32',
        sourceNetId: 'uint32',
    };
};
