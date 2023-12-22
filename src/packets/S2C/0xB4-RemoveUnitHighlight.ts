import BasePacket from '../BasePacket';

export default class RemoveUnitHighlight extends BasePacket {
	static struct = {
		netObjId: 'uint32',
	};
}
