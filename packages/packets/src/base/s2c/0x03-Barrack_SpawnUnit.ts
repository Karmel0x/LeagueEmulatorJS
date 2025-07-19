import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export enum MinionType {
	melee = 0,
	caster = 1,
	cannon = 2,
	super = 3,
};

export type Barrack_SpawnUnitModel = BasePacketModel & {
	objectId: NetId,
	objectNodeId: number,
	barracksNetId: NetId,
	waveCount: number,
	minionType: number,
	damageBonus: number,
	healthBonus: number,
	minionLevel: number,
};

/**
 * necessary packet to spawn minion
 */
export default class Barrack_SpawnUnit extends BasePacket {
	static create(payload: Partial<Barrack_SpawnUnitModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Barrack_SpawnUnitModel) {
		super.reader(dvr, payload);

		payload.objectId = dvr.readUint32();
		payload.objectNodeId = dvr.readUint8();
		payload.barracksNetId = dvr.readUint32();
		payload.waveCount = dvr.readUint8();
		payload.minionType = dvr.readUint8();
		payload.damageBonus = dvr.readInt16();
		payload.healthBonus = dvr.readInt16();
		payload.minionLevel = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: Barrack_SpawnUnitModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectId);
		dvr.writeUint8(payload.objectNodeId);
		dvr.writeUint32(payload.barracksNetId);
		dvr.writeUint8(payload.waveCount);
		dvr.writeUint8(payload.minionType);
		dvr.writeInt16(payload.damageBonus);
		dvr.writeInt16(payload.healthBonus);
		dvr.writeUint8(payload.minionLevel);
	}
}
