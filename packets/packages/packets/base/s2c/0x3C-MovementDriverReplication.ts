import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import type { NetId } from '../../types/player';

export enum MovementParamType {
	unknown = 0x0,
	targetHoming = 0x1,
	//count = 0x2,
}

export type MovementDriverHomingDataModel = {
	targetNetId: NetId,
	targetHeightModifier: number,
	targetPosition: SVector3Model,
	speed: number,
	gravity: number,
	rateOfTurn: number,
	duration: number,
	movementPropertyFlags: number,
};

export type MovementDriverReplicationModel = BasePacketModel & {
	movementTypeId: number,
	position: SVector3Model,
	velocity: SVector3Model,
	targetHomingMovementParam?: MovementDriverHomingDataModel,
};

export default class MovementDriverReplication extends BasePacket {
	static create(payload: MovementDriverReplicationModel) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: MovementDriverReplicationModel) {
		super.reader(dvr, payload);

		payload.movementTypeId = dvr.readUint8();
		payload.position = SVector3.read(dvr);
		payload.velocity = SVector3.read(dvr);

		let movementParamType = dvr.readInt32() as MovementParamType;
		if (movementParamType === MovementParamType.targetHoming) {
			payload.targetHomingMovementParam = {
				targetNetId: dvr.readUint32(),
				targetHeightModifier: dvr.readFloat(),
				targetPosition: SVector3.read(dvr),
				speed: dvr.readFloat(),
				gravity: dvr.readFloat(),
				rateOfTurn: dvr.readFloat(),
				duration: dvr.readFloat(),
				movementPropertyFlags: dvr.readUint32(),
			};
		}
	}

	static writer(dvr: RelativeDataView, payload: MovementDriverReplicationModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.movementTypeId);
		SVector3.writer(dvr, payload.position);
		SVector3.writer(dvr, payload.velocity);

		dvr.writeInt32(payload.targetHomingMovementParam ? MovementParamType.targetHoming : MovementParamType.unknown);
		const homingData = payload.targetHomingMovementParam;
		if (homingData) {
			dvr.writeUint32(homingData.targetNetId);
			dvr.writeFloat(homingData.targetHeightModifier);
			SVector3.writer(dvr, homingData.targetPosition);
			dvr.writeFloat(homingData.speed);
			dvr.writeFloat(homingData.gravity);
			dvr.writeFloat(homingData.rateOfTurn);
			dvr.writeFloat(homingData.duration);
			dvr.writeUint32(homingData.movementPropertyFlags);
		}
	}
}
