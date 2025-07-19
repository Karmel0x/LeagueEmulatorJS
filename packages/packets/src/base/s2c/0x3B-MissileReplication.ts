import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SCastInfo, { type SCastInfoModel } from '../../shared/SCastInfo';
import SVector3, { type SVector3Model } from '../../shared/SVector3';

export type MissileReplicationModel = BasePacketModel & {
	position: SVector3Model,
	casterPosition: SVector3Model,
	direction: SVector3Model,
	velocity: SVector3Model,
	startPoint: SVector3Model,
	endPoint: SVector3Model,
	unitPosition: SVector3Model,
	timeFromCreation: number,
	speed: number,
	lifePercentage: number,
	timedSpeedDelta: number,
	timedSpeedDeltaTime: number,
	bounced: boolean,
	castInfo: SCastInfoModel,
};

export default class MissileReplication extends BasePacket {
	static create(payload: Partial<MissileReplicationModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		bounced: 1,
	};

	static reader(dvr: RelativeDataView, payload: MissileReplicationModel) {
		super.reader(dvr, payload);

		payload.position = SVector3.read(dvr);
		payload.casterPosition = SVector3.read(dvr);
		payload.direction = SVector3.read(dvr);
		payload.velocity = SVector3.read(dvr);
		payload.startPoint = SVector3.read(dvr);
		payload.endPoint = SVector3.read(dvr);
		payload.unitPosition = SVector3.read(dvr);
		payload.timeFromCreation = dvr.readFloat();
		payload.speed = dvr.readFloat();
		payload.lifePercentage = dvr.readFloat();
		payload.timedSpeedDelta = dvr.readFloat();
		payload.timedSpeedDeltaTime = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.bounced = bitfield1.bounced;

		payload.castInfo = SCastInfo.read(dvr);
	}

	static writer(dvr: RelativeDataView, payload: MissileReplicationModel) {
		super.writer(dvr, payload);

		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.casterPosition);
		SVector3.writer(dvr, payload.direction);
		SVector3.writer(dvr, payload.velocity);
		SVector3.writer(dvr, payload.startPoint);
		SVector3.writer(dvr, payload.endPoint);
		SVector3.writer(dvr, payload.unitPosition);
		dvr.writeFloat(payload.timeFromCreation);
		dvr.writeFloat(payload.speed);
		dvr.writeFloat(payload.lifePercentage);
		dvr.writeFloat(payload.timedSpeedDelta);
		dvr.writeFloat(payload.timedSpeedDeltaTime);

		dvr.writeBitfield(this.bitfield1, {
			bounced: payload.bounced,
		});

		SCastInfo.writer(dvr, payload.castInfo);
	}
}