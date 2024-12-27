import ExtendedPacket, { ExtendedPacketModel } from '@repo/network/packets/extended-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';

export type MoveMarkerModel = ExtendedPacketModel & {
	position: SVector2Model,
	goal: SVector2Model,
	speed: number,
	faceGoalPosition: boolean,
};

export default class MoveMarker extends ExtendedPacket {
	static create(payload: Partial<MoveMarkerModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		faceGoalPosition: 1,
	};

	static reader(dvr: RelativeDataView, payload: MoveMarkerModel) {
		super.reader(dvr, payload);

		payload.position = SVector2.read(dvr);
		payload.goal = SVector2.read(dvr);
		payload.speed = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.faceGoalPosition = bitfield1.faceGoalPosition;
	}

	static writer(dvr: RelativeDataView, payload: MoveMarkerModel) {
		super.writer(dvr, payload);

		SVector2.writer(dvr, payload.position);
		SVector2.writer(dvr, payload.goal);
		dvr.writeFloat(payload.speed);

		dvr.writeBitfield(this.bitfield1, {
			faceGoalPosition: payload.faceGoalPosition,
		});
	}
}
