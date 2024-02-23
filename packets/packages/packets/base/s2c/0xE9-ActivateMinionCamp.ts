import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';

export type ActivateMinionCampModel = BasePacketModel & {
	position: SVector3Model,
	spawnDuration: number,
	campIndex: number,
	timerType: number,
};

export default class ActivateMinionCamp extends BasePacket {
	static create(payload: Partial<ActivateMinionCampModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ActivateMinionCampModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
		payload.spawnDuration = dvr.readFloat();
		payload.campIndex = dvr.readUint8();
		payload.timerType = dvr.readInt32();
	}

	static writer(dvr: RelativeDataView, payload: ActivateMinionCampModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
		dvr.writeFloat(payload.spawnDuration);
		dvr.writeUint8(payload.campIndex);
		dvr.writeInt32(payload.timerType);
	}
}
