import BasePacket from '../BasePacket.js';


export default class SetHoverIndicatorTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
