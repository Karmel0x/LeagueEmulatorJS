import BasePacket from '../BasePacket';


export default class ForceCreateMissile extends BasePacket {
	static struct = {
		missileNetId: 'uint32',
	};
}
