import type RelativeDataView from '@repo/network/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type { NetId } from '../../types/player';

export enum DrawPathState {
	disabled = 0,
	line = 1,
};

export type UnitSetDrawPathModeModel = ExtendedPacketModel & {
	targetNetId: NetId,
	drawPathMode: number,
	updateRate: number,
};

export default class UnitSetDrawPathMode extends ExtendedPacket {
	static create(payload: Partial<UnitSetDrawPathModeModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetDrawPathModeModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.drawPathMode = dvr.readUint8();
		payload.updateRate = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: UnitSetDrawPathModeModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint8(payload.drawPathMode);
		dvr.writeFloat(payload.updateRate);
	}
}
