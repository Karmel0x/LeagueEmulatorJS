import ExtendedPacket from '../ExtendedPacket.js';


export default class NotifyContextualSituation extends ExtendedPacket {
	static struct = {
		situationNameHash: 'uint32',
	};
}
