import BasePacket from '../BasePacket';


export default class FX_Kill extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	};
}
