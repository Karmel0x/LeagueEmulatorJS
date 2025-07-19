import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type DisplayFloatingTextModel = BasePacketModel & {
	targetNetId: NetId,
	floatTextType: number,
	param: number,
	message: string,
};

export default class DisplayFloatingText extends BasePacket {
	static create(payload: Partial<DisplayFloatingTextModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: DisplayFloatingTextModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.floatTextType = dvr.readUint8();//readUint32
		payload.param = dvr.readInt32();
		payload.message = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: DisplayFloatingTextModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint8(payload.floatTextType);//writeUint32
		dvr.writeInt32(payload.param);
		dvr.writeStringNullTerminated(payload.message, 128);
	}
}