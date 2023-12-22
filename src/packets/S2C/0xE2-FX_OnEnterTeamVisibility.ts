import BasePacket from '../BasePacket';
import SVector3 from '../sharedstruct/SVector3';


export default class FX_OnEnterTeamVisibility extends BasePacket {
	static struct = {
		netObjId: 'uint32',
		visibilityTeam: 'uint8',
	};
}
