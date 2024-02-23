import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SVector3bModel = {
	x: number,
	z: number,
	y: number,
};

export default class SVector3b extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SVector3bModel;
	}

	static reader(dvr: RelativeDataView, payload: SVector3bModel) {
		payload.x = dvr.readInt16();
		payload.z = dvr.readFloat();
		payload.y = dvr.readInt16();
	}

	static writer(dvr: RelativeDataView, payload: SVector3bModel) {
		dvr.writeInt16(payload.x);
		dvr.writeFloat(payload.z);
		dvr.writeInt16(payload.y);
	}
}
