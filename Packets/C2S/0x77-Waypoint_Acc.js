const BasePacket = require('../BasePacket');

const TeleportData = {
	teleportNetId: 'uint32',
	teleportId: 'uint8',
};

module.exports = class Waypoint_Acc extends BasePacket {
	static struct = {
		syncId: 'int32',
		teleportCount: 'uint8',
	}
	reader(buffer){
		super.reader(buffer);

		this.teleport = buffer.readobj([TeleportData, this.teleportCount]);
	}
	writer(buffer){
		//if(!this.teleport || !this.teleport.length || this.teleport.length > 0xFF)
		//	return;

		this.teleportCount = this.teleport.length;

		super.writer(buffer);
		
		buffer.writeobj([TeleportData, this.teleportCount], this.teleport);
	}
};
