import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export type AddDebugObjectModel = BasePacketModel & {
	debugId: number,
	lifetime: number,
	type: number,
	netId1: NetId,
	netId2: NetId,
	radius: number,
	point1: SVector3Model,
	point2: SVector3Model,
	color: number,
	maxSize: number,
	unknown1: boolean,
	string: string,
};

export default class AddDebugObject extends BasePacket {
	static create(payload: Partial<AddDebugObjectModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static reader(dvr: RelativeDataView, payload: AddDebugObjectModel) {
		super.reader(dvr, payload);

		payload.debugId = dvr.readInt32();
		payload.lifetime = dvr.readFloat();
		payload.type = dvr.readUint8();
		payload.netId1 = dvr.readUint32();
		payload.netId2 = dvr.readUint32();
		payload.radius = dvr.readFloat();
		payload.point1 = SVector3.read(dvr);
		payload.point2 = SVector3.read(dvr);
		payload.color = dvr.readUint32();
		payload.maxSize = dvr.readUint32();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;

		payload.string = dvr.readStringNullTerminated(128);
	}

	static writer(dvr: RelativeDataView, payload: AddDebugObjectModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.debugId);
		dvr.writeFloat(payload.lifetime);
		dvr.writeUint8(payload.type);
		dvr.writeUint32(payload.netId1);
		dvr.writeUint32(payload.netId2);
		dvr.writeFloat(payload.radius);
		SVector3.writer(dvr, payload.point1);
		SVector3.writer(dvr, payload.point2);
		dvr.writeUint32(payload.color);
		dvr.writeUint32(payload.maxSize);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});

		dvr.writeStringNullTerminated(payload.string, 128);
	}
}
