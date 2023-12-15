import BasePacket from '../BasePacket.js';
import SVector3 from '../sharedstruct/SVector3.js';


export default class FX_OnEnterTeamVisibility extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		visibilityTeam: 'uint8',
	};
}
