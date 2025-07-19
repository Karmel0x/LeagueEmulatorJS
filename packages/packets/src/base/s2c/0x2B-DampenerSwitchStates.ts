import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';

export type DampenerSwitchStatesModel = BasePacketModel & {
	isAlive: boolean,
	duration: number,
};

export default class DampenerSwitchStates extends BasePacket {
	static create(payload: Partial<DampenerSwitchStatesModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		isAlive: 1,
	};

	static reader(dvr: RelativeDataView, payload: DampenerSwitchStatesModel) {
		super.reader(dvr, payload);

		let bitfield1 = dvr.readBitfield(this.bitfield1);// state readUint8
		payload.isAlive = bitfield1.isAlive;

		payload.duration = dvr.readUint16();
	}

	static writer(dvr: RelativeDataView, payload: DampenerSwitchStatesModel) {
		super.writer(dvr, payload);

		dvr.writeBitfield(this.bitfield1, {
			isAlive: payload.isAlive,
		});

		dvr.writeUint16(payload.duration);
	}
}
