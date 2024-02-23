import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type SVector2Model = {
	x: number,
	y: number,
};

export default class SVector2 extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SVector2Model;
	}

	static reader(dvr: RelativeDataView, payload: SVector2Model) {
		payload.x = dvr.readFloat();
		payload.y = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SVector2Model) {
		dvr.writeFloat(payload.x);
		dvr.writeFloat(payload.y);
	}
}
