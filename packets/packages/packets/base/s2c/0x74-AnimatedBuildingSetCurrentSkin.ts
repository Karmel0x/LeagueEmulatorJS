import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { TeamId } from '../../types/team';

export type AnimatedBuildingSetCurrentSkinModel = BasePacketModel & {
	team: TeamId,
	skinId: number,
};

export default class AnimatedBuildingSetCurrentSkin extends BasePacket {
	static create(payload: Partial<AnimatedBuildingSetCurrentSkinModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: AnimatedBuildingSetCurrentSkinModel) {
		super.reader(dvr, payload);

		payload.team = dvr.readUint8();
		payload.skinId = dvr.readUint32();
	}

	static writer(dvr: RelativeDataView, payload: AnimatedBuildingSetCurrentSkinModel) {
		super.writer(dvr, payload);

		dvr.writeUint8(payload.team);
		dvr.writeUint32(payload.skinId);
	}
}
