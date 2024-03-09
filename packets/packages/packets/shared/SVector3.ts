import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SVector3Model = {
	x: number,
	z?: number,
	y: number,
};

export default class SVector3 extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SVector3Model;
	}

	static reader(dvr: RelativeDataView, payload: SVector3Model) {
		payload.x = dvr.readFloat();
		payload.z = dvr.readFloat();
		payload.y = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SVector3Model) {
		payload = payload || {};
		dvr.writeFloat(payload.x);
		dvr.writeFloat(payload.z);
		dvr.writeFloat(payload.y);
	}
}
