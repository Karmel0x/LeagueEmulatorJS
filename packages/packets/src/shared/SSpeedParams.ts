import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../types/player';
import SVector2, { SVector2Model } from './SVector2';

export type SSpeedParamsModel = {
	pathSpeedOverride: number,
	parabolicGravity: number,
	parabolicStartPoint: SVector2Model,
	facing: boolean,
	followNetId: NetId,
	followDistance: number,
	followBackDistance: number,
	followTravelTime: number,
};

export default class SSpeedParams extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SSpeedParamsModel;
	}

	static reader(dvr: RelativeDataView, payload: SSpeedParamsModel) {
		payload.pathSpeedOverride = dvr.readFloat();
		payload.parabolicGravity = dvr.readFloat();
		payload.parabolicStartPoint = SVector2.read(dvr);
		payload.facing = dvr.readBool();
		payload.followNetId = dvr.readUint32();
		payload.followDistance = dvr.readFloat();
		payload.followBackDistance = dvr.readFloat();
		payload.followTravelTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SSpeedParamsModel) {
		dvr.writeFloat(payload.pathSpeedOverride);
		dvr.writeFloat(payload.parabolicGravity);
		SVector2.writer(dvr, payload.parabolicStartPoint);
		dvr.writeBool(payload.facing);
		dvr.writeUint32(payload.followNetId);
		dvr.writeFloat(payload.followDistance);
		dvr.writeFloat(payload.followBackDistance);
		dvr.writeFloat(payload.followTravelTime);
	}
}
