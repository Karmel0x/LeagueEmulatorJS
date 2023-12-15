import BasePacket from '../BasePacket.js';


export default class ForceCreateMissile extends BasePacket {
	static struct = {
		missileNetId: 'uint32',
	};
}
