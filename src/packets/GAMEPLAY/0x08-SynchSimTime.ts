import BasePacket from '../BasePacket';

export default class SynchSimTime extends BasePacket {
	static struct = {
		timeLastServer: 'float',
		timeLastClient: 'float',
	};
}
