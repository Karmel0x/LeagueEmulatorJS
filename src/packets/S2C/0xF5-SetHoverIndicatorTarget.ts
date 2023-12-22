import BasePacket from '../BasePacket';


export default class SetHoverIndicatorTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	};
}
