var ExtendedPacket = require('../ExtendedPacket');
const SVector3 = require('../SharedStruct/SVector3');


module.exports = class SpawnMarker extends ExtendedPacket {
	static struct = {
		netObjId: 'uint32',
		netNodeId: 'uint8',
		position: SVector3,
		visibilitySize: 'float',
	}
};
