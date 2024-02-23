
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';

export type CameraLockModel = ExtendedPacketModel & {
	unknown1: boolean,
	unknown2: number,
	unknown3: number,
	unknown4: number,
	unknown5: boolean,
};

export default class CameraLock extends ExtendedPacket {
	static create(payload: Partial<CameraLockModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		unknown1: 1,
	};

	static bitfield2 = {
		unknown5: 1,
	};

	static reader(dvr: RelativeDataView, payload: CameraLockModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.unknown1 = bitfield1.unknown1;

		payload.unknown2 = dvr.readFloat();
		payload.unknown3 = dvr.readFloat();
		payload.unknown4 = dvr.readFloat();

		let bitfield2 = dvr.readBitfield(this.bitfield2);
		payload.unknown5 = bitfield2.unknown5;
	}

	static writer(dvr: RelativeDataView, payload: CameraLockModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			unknown1: payload.unknown1,
		});

		dvr.writeFloat(payload.unknown2);
		dvr.writeFloat(payload.unknown3);
		dvr.writeFloat(payload.unknown4);

		dvr.writeBitfield(this.bitfield2, {
			unknown5: payload.unknown5,
		});
	}
}
