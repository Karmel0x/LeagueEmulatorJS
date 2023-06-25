const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');


module.exports = class FX_OnEnterTeamVisibility extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		visibilityTeam: 'uint8',
	}
};
