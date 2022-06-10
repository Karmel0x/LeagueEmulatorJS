const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');


module.exports = class FX_OnEnterTeamVisibility extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		visibilityTeam: 'uint8',
	}
};
