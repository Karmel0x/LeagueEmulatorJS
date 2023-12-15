import BasePacket from '../BasePacket.js';


export default class RemoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
	};
}
