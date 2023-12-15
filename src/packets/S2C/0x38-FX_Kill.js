import BasePacket from '../BasePacket.js';


export default class FX_Kill extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	};
}
