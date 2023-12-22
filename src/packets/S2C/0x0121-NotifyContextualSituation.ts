import ExtendedPacket from '../ExtendedPacket';


export default class NotifyContextualSituation extends ExtendedPacket {
	static struct = {
		situationNameHash: 'uint32',
	};
}
