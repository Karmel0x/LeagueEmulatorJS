import BasePacket, { BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import type { ClientId, NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type AddRegionModel = BasePacketModel & {
	team: TeamId,
	regionType: number,
	clientId: ClientId,
	unitNetId: NetId,
	bubbleNetId: NetId,
	visionTargetNetId: NetId,
	position: SVector2Model,
	timeToLive: number,
	colisionRadius: number,
	grassRadius: number,
	sizeMultiplier: number,
	sizeAdditive: number,
	flags: {
		hasCollision: boolean,
		grantVision: boolean,
		revealStealth: boolean,
	},
	baseRadius: number,
};

export default class AddRegion extends BasePacket {
	static create(payload: Partial<AddRegionModel>) {
		return super.create(payload);
	}

	static bitfield1 = {
		hasCollision: 1 << 0,
		grantVision: 1 << 1,
		revealStealth: 1 << 2,
	};

	static reader(dvr: RelativeDataView, payload: AddRegionModel) {
		super.reader(dvr, payload);

		payload.team = dvr.readInt32();
		payload.regionType = dvr.readInt32();
		payload.clientId = dvr.readUint32();
		payload.unitNetId = dvr.readUint32();
		payload.bubbleNetId = dvr.readUint32();
		payload.visionTargetNetId = dvr.readUint32();
		payload.position = SVector2.read(dvr);
		payload.timeToLive = dvr.readFloat();
		payload.colisionRadius = dvr.readFloat();
		payload.grassRadius = dvr.readFloat();
		payload.sizeMultiplier = dvr.readFloat();
		payload.sizeAdditive = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.flags = {
			hasCollision: bitfield1.hasCollision,
			grantVision: bitfield1.grantVision,
			revealStealth: bitfield1.revealStealth,
		};

		payload.baseRadius = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: AddRegionModel) {
		super.writer(dvr, payload);

		dvr.writeInt32(payload.team);
		dvr.writeInt32(payload.regionType);
		dvr.writeUint32(payload.clientId);
		dvr.writeUint32(payload.unitNetId);
		dvr.writeUint32(payload.bubbleNetId);
		dvr.writeUint32(payload.visionTargetNetId);
		SVector2.writer(dvr, payload.position);
		dvr.writeFloat(payload.timeToLive);
		dvr.writeFloat(payload.colisionRadius);
		dvr.writeFloat(payload.grassRadius);
		dvr.writeFloat(payload.sizeMultiplier);
		dvr.writeFloat(payload.sizeAdditive);

		dvr.writeBitfield(this.bitfield1, payload.flags);

		dvr.writeFloat(payload.baseRadius);
	}
}
