import BasePacket, { BasePacketModel } from '@workspace/network/packages/packets/base-packet';
import type RelativeDataView from '@workspace/network/packages/relative-data-view';
import type { NetId } from '../../types/player';

export type TeleportDataModel = {
	netId: NetId,
	teleportId: number,
};

export type Waypoint_AccModel = BasePacketModel & {
	syncId: number,
	//teleports: TeleportDataModel[],
};

export default class Waypoint_Acc extends BasePacket {
	static create(payload: Partial<Waypoint_AccModel>) {
		return super.create(payload);
	}

	static reader(dvr: RelativeDataView, payload: Waypoint_AccModel) {
		super.reader(dvr, payload);

		payload.syncId = dvr.readInt32();

		//const count = dvr.readUint8();
		//payload.teleports = dvr.readArray(() => ({
		//	netId: dvr.readUint32(),
		//	teleportId: dvr.readUint8(),
		//}), count);
	}

	static writer(dvr: RelativeDataView, payload: Waypoint_AccModel) {
		//if (!payload.teleports || payload.teleports.length < 1)
		//	return;

		super.writer(dvr, payload);

		dvr.writeInt32(payload.syncId);

		//dvr.writeUint8(payload.teleports.length);
		//payload.teleports.forEach(teleport => {
		//	dvr.writeUint32(teleport.netId);
		//	dvr.writeUint8(teleport.teleportId);
		//});
	}
}
