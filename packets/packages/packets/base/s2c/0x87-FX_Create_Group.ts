import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import SVector3, { SVector3Model } from '../../shared/SVector3';
import SVector3b, { SVector3bModel } from '../../shared/SVector3b';
import type { NetId } from '../../types/player';

export type FXCreateDataModel = {
	targetNetId: NetId,
	netAssignedNetId: NetId,
	casterNetId: NetId,
	bindNetId: NetId,
	keywordNetId: NetId,
	position: SVector3bModel,
	targetPosition: SVector3bModel,
	ownerPosition: SVector3bModel,
	orientationVector: SVector3Model,
	timeSpent: number,
	scriptScale: number,
};

export type FXCreateGroupDataModel = {
	packageHash: number,
	effectNameHash: number,
	flags: number,
	targetBoneNameHash: number,
	boneNameHash: number,
	createData: FXCreateDataModel[],
};

export type FXCreateGroupModel = BasePacketModel & {
	groupData: FXCreateGroupDataModel[],
};

export default class FX_Create_Group extends BasePacket {
	static create(payload: Partial<FXCreateGroupModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: FXCreateGroupModel) {
		super.reader(dvr, payload);

		payload.groupData = dvr.readArray(() => ({
			packageHash: dvr.readUint32(),
			effectNameHash: dvr.readUint32(),
			flags: dvr.readUint16(),
			targetBoneNameHash: dvr.readUint32(),
			boneNameHash: dvr.readUint32(),
			createData: dvr.readArray(() => ({
				targetNetId: dvr.readUint32(),
				netAssignedNetId: dvr.readUint32(),
				casterNetId: dvr.readUint32(),
				bindNetId: dvr.readUint32(),
				keywordNetId: dvr.readUint32(),
				position: SVector3b.read(dvr),
				targetPosition: SVector3b.read(dvr),
				ownerPosition: SVector3b.read(dvr),
				orientationVector: SVector3.read(dvr),
				timeSpent: dvr.readFloat(),
				scriptScale: dvr.readFloat(),
			}), dvr.readUint8()),
		}), dvr.readUint8());
	}

	static writer(dvr: RelativeDataView, payload: FXCreateGroupModel) {
		if (!payload.groupData || payload.groupData.length < 1)
			return;

		super.writer(dvr, payload);

		dvr.writeUint8(payload.groupData.length);
		payload.groupData.forEach(groupData => {
			dvr.writeUint32(groupData.packageHash);
			dvr.writeUint32(groupData.effectNameHash);
			dvr.writeUint16(groupData.flags);
			dvr.writeUint32(groupData.targetBoneNameHash);
			dvr.writeUint32(groupData.boneNameHash);

			groupData.createData = groupData.createData || [];
			dvr.writeUint8(groupData.createData.length);
			groupData.createData.forEach(createData => {
				dvr.writeUint32(createData.targetNetId);
				dvr.writeUint32(createData.netAssignedNetId);
				dvr.writeUint32(createData.casterNetId);
				dvr.writeUint32(createData.bindNetId);
				dvr.writeUint32(createData.keywordNetId);
				SVector3b.writer(dvr, createData.position);
				SVector3b.writer(dvr, createData.targetPosition);
				SVector3b.writer(dvr, createData.ownerPosition);
				SVector3.writer(dvr, createData.orientationVector);
				dvr.writeFloat(createData.timeSpent);
				dvr.writeFloat(createData.scriptScale);
			});
		});
	}
}
