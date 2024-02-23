import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type AttachFlexParticleModel = BasePacketModel & {
	objectNetId: number,
	flexId: number,
	capturePointId: number,
	attachType: number,
};

export default class AttachFlexParticle extends BasePacket {
	static create(payload: Partial<AttachFlexParticleModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AttachFlexParticleModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.flexId = dvr.readUint8();
		payload.capturePointId = dvr.readUint8();
		payload.attachType = dvr.readUint8();//readUint32
	}

	static writer(dvr: RelativeDataView, payload: AttachFlexParticleModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.flexId);
		dvr.writeUint8(payload.capturePointId);
		dvr.writeUint8(payload.attachType);//writeUint32
	}
}
