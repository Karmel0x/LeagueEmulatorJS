import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type CreateFollowerObjectModel = BasePacketModel & {
	objectNetId: number,
	netNodeId: number,
	skinId: number,
	internalName: string,
	characterName: string,
};

export default class CreateFollowerObject extends BasePacket {
	static create(payload: Partial<CreateFollowerObjectModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: CreateFollowerObjectModel) {
		super.reader(dvr, payload);

		payload.objectNetId = dvr.readUint32();
		payload.netNodeId = dvr.readUint8();
		payload.skinId = dvr.readInt32();
		payload.internalName = dvr.readCharArray(64);
		payload.characterName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: CreateFollowerObjectModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.objectNetId);
		dvr.writeUint8(payload.netNodeId);
		dvr.writeInt32(payload.skinId);
		dvr.writeCharArray(payload.internalName, 64);
		dvr.writeStringNullTerminated(payload.characterName, 64);
	}
}
