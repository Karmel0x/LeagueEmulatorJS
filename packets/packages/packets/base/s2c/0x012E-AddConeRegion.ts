import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import ExtendedPacket, { ExtendedPacketModel } from '@workspace/network/packages/packets/extended-packet';
import SVector2, { SVector2Model } from '../../shared/SVector2';
import type { ClientId, NetId } from '../../types/player';
import type { TeamId } from '../../types/team';

export type AddConeRegionModel = ExtendedPacketModel & {
	team: TeamId,
	regionType: number,
	clientId: ClientId,
	unitNetId: NetId,
	bubbleNetId: NetId,
	visionTargetNetId: NetId,
	position: SVector2Model,
	timeToLive: number,
	collisionRadius: number,
	grassRadius: number,
	sizeMultiplier: number,
	sizeAdditive: number,
	flags: {
		hasCollision: boolean,
		grantVision: boolean,
		revealStealth: boolean,
	},
	baseRadius: number,
	coneAngle: number,
	unknown1: number,
	unknown2: number,
};

export default class AddConeRegion extends ExtendedPacket {
	static create(payload: Partial<AddConeRegionModel>) {
		return super.create(payload);
	}

	static flagsBitfield = {
		hasCollision: 1,
		grantVision: 2,
		revealStealth: 4,
	};

	static reader(dvr: RelativeDataView, payload: AddConeRegionModel) {
		super.reader(dvr, payload);

		payload.team = dvr.readUint32();
		payload.regionType = dvr.readInt32();
		payload.clientId = dvr.readInt32();
		payload.unitNetId = dvr.readUint32();
		payload.bubbleNetId = dvr.readUint32();
		payload.visionTargetNetId = dvr.readUint32();
		payload.position = SVector2.read(dvr);
		payload.timeToLive = dvr.readFloat();
		payload.collisionRadius = dvr.readFloat();
		payload.grassRadius = dvr.readFloat();
		payload.sizeMultiplier = dvr.readFloat();
		payload.sizeAdditive = dvr.readFloat();

		let flagsBitfield = dvr.readBitfield(this.flagsBitfield);
		payload.flags = {
			hasCollision: flagsBitfield.hasCollision,
			grantVision: flagsBitfield.grantVision,
			revealStealth: flagsBitfield.revealStealth,
		};

		payload.baseRadius = dvr.readFloat();
		payload.coneAngle = dvr.readFloat();
		payload.unknown1 = dvr.readFloat();
		payload.unknown2 = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: AddConeRegionModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.team);
		dvr.writeInt32(payload.regionType);
		dvr.writeInt32(payload.clientId);
		dvr.writeUint32(payload.unitNetId);
		dvr.writeUint32(payload.bubbleNetId);
		dvr.writeUint32(payload.visionTargetNetId);
		SVector2.writer(dvr, payload.position);
		dvr.writeFloat(payload.timeToLive);
		dvr.writeFloat(payload.collisionRadius);
		dvr.writeFloat(payload.grassRadius);
		dvr.writeFloat(payload.sizeMultiplier);
		dvr.writeFloat(payload.sizeAdditive);

		dvr.writeBitfield(this.flagsBitfield, payload.flags);

		dvr.writeFloat(payload.baseRadius);
		dvr.writeFloat(payload.coneAngle);
		dvr.writeFloat(payload.unknown1);
		dvr.writeFloat(payload.unknown2);
	}
}
