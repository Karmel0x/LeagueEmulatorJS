import PartialPacket from '@workspace/network/packages/packets/partial-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';

export type STipConfigModel = {
	tipId: number,
	colorId: number,
	durationId: number,
	flags: number,
};

export default class STipConfig extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as STipConfigModel;
	}

	static reader(dvr: RelativeDataView, payload: STipConfigModel) {
		payload.tipId = dvr.readInt8();
		payload.colorId = dvr.readInt8();
		payload.durationId = dvr.readInt8();
		payload.flags = dvr.readUint8();
	}

	static writer(dvr: RelativeDataView, payload: STipConfigModel) {
		payload = payload || {} as STipConfigModel;
		dvr.writeInt8(payload.tipId);
		dvr.writeInt8(payload.colorId);
		dvr.writeInt8(payload.durationId);
		dvr.writeUint8(payload.flags);
	}
}
