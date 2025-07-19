import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../types/player';
import SVector3, { type SVector3Model } from './SVector3';

export type SBasicAttackDataModel = {
	targetNetId: NetId,
	extraTime: number,
	missileNextId: NetId,
	attackSlot: number,
	targetPosition: SVector3Model,
};

export default class SBasicAttackData extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SBasicAttackDataModel;
	}

	static reader(dvr: RelativeDataView, payload: SBasicAttackDataModel) {
		payload.targetNetId = dvr.readUint32();
		payload.extraTime = dvr.readInt8();//(dvr.readUint8() - 128) / 100.0f
		payload.missileNextId = dvr.readUint32();
		payload.attackSlot = dvr.readUint8();

		payload.targetPosition = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: SBasicAttackDataModel) {
		dvr.writeUint32(payload.targetNetId);
		dvr.writeInt8(payload.extraTime);
		dvr.writeUint32(payload.missileNextId);
		dvr.writeUint8(payload.attackSlot);

		SVector3.writer(dvr, payload.targetPosition);
	}
}
