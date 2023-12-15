import BasePacket from '../BasePacket.js';

export default class RemoveUnitHighlight extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	};
}
