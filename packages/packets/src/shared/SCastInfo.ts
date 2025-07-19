import PartialPacket from '@repo/network/packets/partial-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../types/player';
import SVector3, { type SVector3Model } from './SVector3';

export enum HitResult {
	normal = 0,
	critical = 1,
	dodge = 2,
	miss = 3,
}

export type TargetModel = {
	unitNetId: NetId,
	hitResult: HitResult,
};

export type SCastInfoModel = {
	spellHash: number,
	castNetId: NetId,
	spellLevel: number,
	attackSpeedModifier: number,
	casterNetId: NetId,
	spellChainOwnerNetId: number,
	packageHash: number,
	missileNetId: NetId,
	targetPosition: SVector3Model,
	targetPositionEnd: SVector3Model,
	targets: TargetModel[],
	designerCastTime: number,
	extraCastTime: number,
	designerTotalTime: number,
	cooldown: number,
	startCastTime: number,
	isAutoAttack: boolean,
	isSecondAutoAttack: boolean,
	isForceCastingOrChannel: boolean,
	isOverrideCastPosition: boolean,
	isClickCasted: boolean,
	spellSlot: number,
	manaCost: number,
	spellCastLaunchPosition: SVector3Model,
	ammoUsed: number,
	ammoRechargeTime: number,
};

export default class SCastInfo extends PartialPacket {
	static read(dvr: RelativeDataView) {
		return super.read(dvr) as SCastInfoModel;
	}

	static bitfield1 = {
		isAutoAttack: 1 << 0,
		isSecondAutoAttack: 1 << 1,
		isForceCastingOrChannel: 1 << 2,
		isOverrideCastPosition: 1 << 3,
		isClickCasted: 1 << 4,
	};

	static reader(dvr: RelativeDataView, payload: SCastInfoModel) {
		let size = dvr.readUint16();

		payload.spellHash = dvr.readUint32();
		payload.castNetId = dvr.readUint32();
		payload.spellLevel = dvr.readUint8();
		payload.attackSpeedModifier = dvr.readFloat();
		payload.casterNetId = dvr.readUint32();
		payload.spellChainOwnerNetId = dvr.readUint32();
		payload.packageHash = dvr.readUint32();
		payload.missileNetId = dvr.readUint32();
		payload.targetPosition = SVector3.read(dvr);
		payload.targetPositionEnd = SVector3.read(dvr);

		let targetCount = dvr.readUint8();
		payload.targets = dvr.readArray(() => ({
			unitNetId: dvr.readUint32(),
			hitResult: dvr.readUint8(),
		}), targetCount);

		payload.designerCastTime = dvr.readFloat();
		payload.extraCastTime = dvr.readFloat();
		payload.designerTotalTime = dvr.readFloat();
		payload.cooldown = dvr.readFloat();
		payload.startCastTime = dvr.readFloat();

		let bitfield1 = dvr.readBitfield(this.bitfield1);
		payload.isAutoAttack = bitfield1.isAutoAttack;
		payload.isSecondAutoAttack = bitfield1.isSecondAutoAttack;
		payload.isForceCastingOrChannel = bitfield1.isForceCastingOrChannel;
		payload.isOverrideCastPosition = bitfield1.isOverrideCastPosition;
		payload.isClickCasted = bitfield1.isClickCasted;

		payload.spellSlot = dvr.readUint8();
		payload.manaCost = dvr.readFloat();
		payload.spellCastLaunchPosition = SVector3.read(dvr);
		payload.ammoUsed = dvr.readInt32();
		payload.ammoRechargeTime = dvr.readFloat();
	}

	static writer(dvr: RelativeDataView, payload: SCastInfoModel) {
		payload.targets = payload.targets || [];
		dvr.writeUint16(102 + (payload.targets.length * 5));

		dvr.writeUint32(payload.spellHash);
		dvr.writeUint32(payload.castNetId);
		dvr.writeUint8(payload.spellLevel);
		dvr.writeFloat(payload.attackSpeedModifier);
		dvr.writeUint32(payload.casterNetId);
		dvr.writeUint32(payload.spellChainOwnerNetId);
		dvr.writeUint32(payload.packageHash);
		dvr.writeUint32(payload.missileNetId);
		SVector3.writer(dvr, payload.targetPosition);
		SVector3.writer(dvr, payload.targetPositionEnd);

		dvr.writeUint8(payload.targets.length);
		payload.targets.forEach(target => {
			dvr.writeUint32(target.unitNetId);
			dvr.writeUint8(target.hitResult);
		});

		dvr.writeFloat(payload.designerCastTime);
		dvr.writeFloat(payload.extraCastTime);
		dvr.writeFloat(payload.designerTotalTime);
		dvr.writeFloat(payload.cooldown);
		dvr.writeFloat(payload.startCastTime);

		dvr.writeBitfield(this.bitfield1, {
			isAutoAttack: payload.isAutoAttack,
			isSecondAutoAttack: payload.isSecondAutoAttack,
			isForceCastingOrChannel: payload.isForceCastingOrChannel,
			isOverrideCastPosition: payload.isOverrideCastPosition,
			isClickCasted: payload.isClickCasted,
		});

		dvr.writeUint8(payload.spellSlot);
		dvr.writeFloat(payload.manaCost);
		SVector3.writer(dvr, payload.spellCastLaunchPosition);
		dvr.writeInt32(payload.ammoUsed);
		dvr.writeFloat(payload.ammoRechargeTime);
	}
}
