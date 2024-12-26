import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum DamageResultType {
    invulnerable = 0,
    invulnerableNoMessage = 1,
    dodge = 2,
    critical = 3,
    normal = 4,
    miss = 5,
    other = 6,
}

export enum DamageType {
    physical = 0,
    magical = 1,
    true = 2,
    mixed = 3,
}

export type UnitApplyDamageModel = BasePacketModel & {
    damageResultType: DamageResultType,
    unknown1: number,
    damageType: DamageType,
    damage: number,
    targetNetId: NetId,
    sourceNetId: NetId,
};

export default class UnitApplyDamage extends BasePacket {
    static create(payload: Partial<UnitApplyDamageModel>) {
        return super.create(payload);
    }

    static reader(dvr: RelativeDataView, payload: UnitApplyDamageModel) {
        super.reader(dvr, payload);

        payload.damageResultType = dvr.readUint8();
        payload.unknown1 = dvr.readUint8();
        payload.damageType = dvr.readUint8();
        payload.damage = dvr.readFloat();
        payload.targetNetId = dvr.readUint32();
        payload.sourceNetId = dvr.readUint32();
    }

    static writer(dvr: RelativeDataView, payload: UnitApplyDamageModel) {
        super.writer(dvr, payload);

        dvr.writeUint8(payload.damageResultType);
        dvr.writeUint8(payload.unknown1);
        dvr.writeUint8(payload.damageType);
        dvr.writeFloat(payload.damage);
        dvr.writeUint32(payload.targetNetId);
        dvr.writeUint32(payload.sourceNetId);
    }
}
