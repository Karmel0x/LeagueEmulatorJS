import BasePacket from '../BasePacket';


export default class RemoveRegion extends BasePacket {
	static struct = {
		regionNetId: 'uint32',
	};
}
