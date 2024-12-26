import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { TeamId } from '../../types/team';

export type ColorRemapFXModel = BasePacketModel & {
	isFadingIn: boolean,
	fadeTime: number,
	team: TeamId,
	color: number,
	maxWeight: number,
};

export default class ColorRemapFX extends BasePacket {
	static create(payload: Partial<ColorRemapFXModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: ColorRemapFXModel) {
		super.reader(dvr, payload);

		payload.isFadingIn = dvr.readBool();
		payload.fadeTime = dvr.readFloat();
		payload.team = dvr.readUint32();
		payload.color = dvr.readUint32();
		payload.maxWeight = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: ColorRemapFXModel) {
		super.writer(dvr, payload);

		dvr.writeBool(payload.isFadingIn);
		dvr.writeFloat(payload.fadeTime);
		dvr.writeUint32(payload.team);
		dvr.writeUint32(payload.color);
		dvr.writeFloat(payload.maxWeight);
	}
}
