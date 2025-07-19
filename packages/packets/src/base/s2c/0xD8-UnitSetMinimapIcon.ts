import BasePacket, { type BasePacketModel } from '@repo/network/packets/base-packet';
import type RelativeDataView from '@repo/network/relative-data-view';
import type { NetId } from '../../types/player';

export type UnitSetMinimapIconModel = BasePacketModel & {
	unitNetId: NetId,
	replaceIcon: boolean,
	iconName: string,
	replaceBorder: boolean,
	borderName: string,
	borderScriptName: string,
};

export default class UnitSetMinimapIcon extends BasePacket {
	static create(payload: Partial<UnitSetMinimapIconModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: UnitSetMinimapIconModel) {
		super.reader(dvr, payload);

		payload.unitNetId = dvr.readUint32();

		payload.replaceIcon = dvr.readBool();
		payload.iconName = dvr.readCharArray(64);
		payload.replaceBorder = dvr.readBool();
		payload.borderName = dvr.readCharArray(64);

		payload.borderScriptName = dvr.readStringNullTerminated(64);
	}

	static writer(dvr: RelativeDataView, payload: UnitSetMinimapIconModel) {
		super.writer(dvr, payload);

		dvr.writeUint32(payload.unitNetId);

		dvr.writeBool(payload.replaceIcon);
		dvr.writeCharArray(payload.iconName, 64);
		dvr.writeBool(payload.replaceBorder);
		dvr.writeCharArray(payload.borderName, 64);

		dvr.writeStringNullTerminated(payload.borderScriptName, 64);
	}
}
