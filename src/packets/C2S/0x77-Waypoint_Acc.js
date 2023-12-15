import BasePacket from '../BasePacket.js';

const TeleportData = {
	teleportNetId: 'uint32',
	teleportId: 'uint8',
};

export default class Waypoint_Acc extends BasePacket {
	static struct = {
		syncId: 'int32',
		teleportCount: 'uint8',
	};
	reader(buffer) {
		super.reader(buffer);

		this.teleport = buffer.read([TeleportData, this.teleportCount]);
	}
	writer(buffer) {
		this.teleport = this.teleport || [];
		this.teleportCount = this.teleport.length;

		super.writer(buffer);

		buffer.write([TeleportData, this.teleportCount], this.teleport);
	}
}
