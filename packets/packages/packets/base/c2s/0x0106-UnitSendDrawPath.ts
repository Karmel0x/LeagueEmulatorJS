import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export enum DrawPathNodeType {
	start = 0,
	update = 1,
	end = 2,
}

export type UnitSendDrawPathModel = BasePacketModel & {
	targetNetId: NetId,
	drawPathNodeType: DrawPathNodeType,
	point: SVector3Model,
};

export default class UnitSendDrawPath extends BasePacket {
	static create(payload: Partial<UnitSendDrawPathModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSendDrawPathModel) {
		super.reader(dvr, payload);

		payload.targetNetId = dvr.readUint32();
		payload.drawPathNodeType = dvr.readUint8();
		payload.point = SVector3.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: UnitSendDrawPathModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.targetNetId);
		dvr.writeUint8(payload.drawPathNodeType);
		SVector3.writer(dvr, payload.point);
	}
}
