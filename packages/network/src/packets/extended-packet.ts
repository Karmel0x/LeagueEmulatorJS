
import Registry from '../registry';
import type RelativeDataView from '../relative-data-view';
import BasePacket, { type BasePacketModel } from './base-packet';


export type ExtendedPacketModel = BasePacketModel & {
	cmd2?: number;
};

export default class ExtendedPacket extends BasePacket {
	static create(payload: Partial<ExtendedPacketModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ExtendedPacketModel) {
		super.reader(dvr, payload);
		payload.cmd2 = dvr.readUint16();

		const Packet = Registry.base.packets[payload.cmd2];
		if (!Packet)
			return;

		Packet.reader(dvr, payload);
	}

	static writer(dvr: RelativeDataView, payload: ExtendedPacketModel) {
		payload.cmd2 = payload.cmd2 || this.id;
		payload.cmd = payload.cmd || 0xFE;
		super.writer(dvr, payload);
		dvr.writeUint16(payload.cmd2);
	}
}
