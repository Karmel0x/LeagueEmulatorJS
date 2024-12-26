import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

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
